"use strict";

function Node(id,pos){
    this.pos=pos;   //[x,y] coordinates: List of two ints
    this.id=id;     //from the OSG map file: String
    this.N=[];      //neighbor node indices: List of ints
    this.NN=[];     //NN[i] = name of the edge from here to N[i]: List of strings
    this.rect=undefined;    //the clickable on-screen rectangle: SVG rect object
    this.visited = false;
    this.parent = 0;
}

//the graph. An array of Node's
var G=[];

//the svg object
var svg;

function load(files){
    var r = new FileReader();
    r.onload=function(){ load2(r);}
    r.onerror=function(){alert("Cannot read file");}
    r.readAsText(files[0]);
}

function min(){
    var v=arguments[0];
    for(var i=1;i<arguments.length;++i){
        if(arguments[i]<v)
            v=arguments[i];
    }
    return v;
}

function max(){
    var v = arguments[0];
    for(var i=1;i<arguments.length;++i){
        if(arguments[i]>v)
            v=arguments[i];
    }
    return v;
}

function load2(r){
    clines=[];
    cverts=[];
    var txt = r.result;
    var dp = new DOMParser();
    var doc = dp.parseFromString(txt,"application/xml");
    
    var mapwidth=0,mapheight=0;
    
    var nmap={};
    
    //if we have a node: it will have attributes:
    //  id: Unique identifier
    //  lat,lon: Location
    //if we have a way, it will have children of type nd
    //  with attribute ref. This ref will be a node id
    //  It will also have children of type tag.
    //  Tags have attributes k (key) and v (value)
    //  If the key is "name" then the value is the 
    //  humanly readable name of the way.
    
    G=[];
    
    var nl = doc.getElementsByTagName("node");
    for(var i=0;i<nl.length;++i){
        var n = nl[i];
        var id = n.getAttribute('id');
        var lat = n.getAttribute('lat');
        var lon = n.getAttribute('lon');
        lat=parseFloat(lat);
        lon=parseFloat(lon);
        var N = new Node(id,[lon,-lat]);
        G.push(N);
        nmap[id]=G.length-1;
    }
    
    var mins=[G[0].pos[0],G[0].pos[1]];
    var maxs=[G[0].pos[0],G[0].pos[1]];
    for(var i=0;i<G.length;++i){
        for(var j=0;j<2;++j){
            if( G[i].pos[j] < mins[j] )
                mins[j] = G[i].pos[j];
            if( G[i].pos[j] > maxs[j] )
                maxs[j] = G[i].pos[j];
        }
    }
    var dx = maxs[0]-mins[0];
    var dy = maxs[1]-mins[1];
    var tx = -mins[0];
    var ty = -mins[1];
    var s=65536;
    mapwidth=dx*s;
    mapheight=dy*s;
    
    for(var i=0;i<G.length;++i){
        G[i].pos[0] += tx;
        G[i].pos[0] *= s;
        G[i].pos[1] += ty;
        G[i].pos[1] *= s;
    }
    
    var wl = doc.getElementsByTagName("way");
    for(var i=0;i<wl.length;++i){
        var n = wl[i];
        var ch = n.childNodes;
        var edgelist=[];
        var streetname="?";
        for(var j=0;j<ch.length;++j){
            var c = ch[j];
            if( c.nodeName === "nd" ){
                var ref = c.getAttribute('ref');
                edgelist.push(ref);
            }
            else if( c.nodeName === "tag"){
                var key = c.getAttribute("k");
                var val = c.getAttribute("v");
                if( key === "name" ){
                    streetname=val;
                }
            }
        }
        for(var j=1;j<edgelist.length;++j){
            var vid1 = edgelist[j-1];
            var vid2 = edgelist[j];
            var vidx1 = nmap[vid1];
            var vidx2 = nmap[vid2];
            G[vidx1].N.push(vidx2);
            G[vidx2].N.push(vidx1);
            G[vidx1].NN.push(streetname);
            G[vidx2].NN.push(streetname);
        }
    }
                        
    svg = newSvg("myframe");
    var labels={}
    
    for(var i=0;i<G.length;++i){
        var v1 = G[i];
        for(var j=0;j<v1.N.length;++j){
            var v2i = v1.N[j]
            //only draw it one way
            if( v2i < i )
                continue;
            var v2 = G[v2i];
            var lbl = v1.NN[j];
            drawLine(svg,v1.pos[0],v1.pos[1],v2.pos[0],v2.pos[1]);
            if( labels[lbl] === undefined )
                labels[lbl]=[0,0,0,[],Infinity,Infinity,-Infinity,-Infinity];
            labels[lbl][0] += v1.pos[0]+v2.pos[0];
            labels[lbl][1] += v1.pos[1]+v2.pos[1];
            labels[lbl][2] += 2;
            labels[lbl][3].push(v1);
            labels[lbl][3].push(v2);
        }
    }
    
    for(var lbl in labels){
        var x = labels[lbl][0];
        var y = labels[lbl][1];
        var n = labels[lbl][2];
        x/=n;
        y/=n;
        var V=labels[lbl][3];
        var mindist=Infinity;
        var minv=0;
        for(var j=0;j<V.length;++j){
            var v = V[j];
            var dx = x-v.pos[0];
            var dy = y-v.pos[1];
            var dist=dx*dx+dy*dy;
            if( dist < mindist ){
                mindist=dist;
                minv=v;
            }
        }
        
        var ox=0;
        var oy=0;
        
        var p1=minv.pos;
        if( minv.N.length === 0)
            rot=0;
        else{
            var p2i=minv.N[0];
            var p2 = G[p2i].pos;
            var vec = [p1[0]-p2[0],p1[1]-p2[1]];
            var le = vec[0]*vec[0]+vec[1]*vec[1];
            le=Math.sqrt(le);
            if( le === 0 ){
                rot=0;
            }
            else{
                vec[0]/=le;
                vec[1]/=le;
                var dp = vec[0]*1.0 + vec[1]*0.0;
                var rot = Math.acos(dp);
                rot = -rot / Math.PI * 180.0;
                if( rot < 0 )
                    rot = 360+rot;
                if( (rot > 90 && rot < 270) )
                    rot = 180-rot;
                ox = 5*Math.sin(rot/180.0*Math.PI);
                oy = -5*Math.cos(rot/180.0*Math.PI);
                
            }
        }
            
            
        drawText(svg,lbl,minv.pos[0]+ox,minv.pos[1]+oy,rot);
    }
    
    function mkcallback(x){
        return function(){clicked(x)};
    }
        
    for(var i=0;i<G.length;++i){
        //do last so they appear on top
        var v=G[i];
        var rect = drawRectangle(svg,v.pos[0]-3,v.pos[1]-3,6,6,"magenta","black");
        rect.addEventListener("click",mkcallback(i));
        G[i].rect=rect;
    }
    
    svg.setAttribute("width",mapwidth+10);
    svg.setAttribute("height",mapheight+10);
}

var cverts=[];
var clines=[];
function clicked(x){
    if( cverts.length === 2 ){
        G[cverts[0]].rect.setAttribute("style","fill:magenta; stroke:black");
        G[cverts[1]].rect.setAttribute("style","fill:magenta; stroke:black");
        cverts=[];
        for(var i=0;i<clines.length;++i){
            svg.removeChild(clines[i]);
        }
        clines=[];
    }
    cverts.push(x);
    G[x].rect.setAttribute("style","fill:yellow; stroke: black");
    if( cverts.length === 2 ){
        var P=findpath(G,cverts[0],cverts[1]);
        for(var i=1;i<P.length;++i){
            var v = G[P[i-1]];
            var w = G[P[i]];
            clines.push(drawLine(svg,v.pos[0],v.pos[1],w.pos[0],w.pos[1],5,"yellow"));
        }
    }
}
