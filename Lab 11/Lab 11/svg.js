"use strict";

function drawLine(svg,x1,y1,x2,y2,width,color){
    if( width === undefined )
        width=1;
    if( color === undefined)
        color="black";
    var doc = svg.ownerDocument;
    var ns = "http://www.w3.org/2000/svg";
    var line = doc.createElementNS(ns,"line");
    line.setAttribute("x1",x1);
    line.setAttribute("x2",x2);
    line.setAttribute("y1",y1);
    line.setAttribute("y2",y2);
    line.setAttribute("stroke",color);
    line.setAttribute("stroke-width",width);
    svg.appendChild(line);
    return line;
}

function newSvg(framename){
    var doc = document.getElementById(framename).contentDocument;
    var body = doc.getElementsByTagName("body")[0];
    while(body.firstChild)
        body.removeChild(body.firstChild);
    var ns = "http://www.w3.org/2000/svg";
    var svg = doc.createElementNS(ns,"svg");
    body.appendChild(svg);
    return svg;
}

function drawText(svg,txt,x,y,rotation){
    if( !rotation )
        rotation=0;
    var doc = svg.ownerDocument;
    var ns = "http://www.w3.org/2000/svg";
    var t = doc.createElementNS(ns,"text");
    t.setAttribute("x",x);
    t.setAttribute("y",y);
    t.setAttribute("font-family","sans-serif");
    t.setAttribute("font-size","10");
    t.setAttribute("text-anchor","middle");
    t.setAttribute("transform","rotate("+rotation+","+x+","+y+")");
    var tc = doc.createTextNode(txt);
    t.appendChild(tc);
    svg.appendChild(t);
    return t;
}

function drawRectangle(svg,x1,y1,w,h,fill,stroke){
    if( x1 !== x1 )
        throw(new Error("NaN"));
    var ns = "http://www.w3.org/2000/svg";
    var doc = svg.ownerDocument;
    var rect = doc.createElementNS(ns,"rect");
    rect.setAttribute("x",x1);
    rect.setAttribute("y",y1);
    rect.setAttribute("width",w);
    rect.setAttribute("height",h);
    var style=[];
    if( fill !== undefined )
        style.push( "fill:"+fill );
    if( stroke !== undefined )
        style.push( "stroke:"+stroke );
    style.push( "stroke-width: 1" );
    rect.setAttribute("style",style.join(";"));
    svg.appendChild(rect);
    return rect;
}

