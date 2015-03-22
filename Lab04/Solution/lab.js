"use strict";

var piles=[];   //the cards that are - er - piled up
var dragging;   //which card are we dragging?
var draggingoffset=[];  //how far to offset moving card from mouse cursor
var cvs;    //canvas    
var ctx;    //context

function main(){
    //initialization. w00t.
    cvs = document.getElementById("cvs");
    ctx = cvs.getContext("2d");
    cvs.addEventListener("mousedown",mousedown);
    cvs.addEventListener("mouseup",mouseup);
    cvs.addEventListener("mousemove",mousemove);
    
    //buy me a deck o' cards
    var deck=[];
    for(var r=1;r<=13;++r){
        for(var s=0;s<4;++s){
            deck.push(new Card(r,s));
        }
    }
    
    //shuffle 'em real good...
    for(var i=0;i<deck.length;++i){
        var j = i+Math.floor(Math.random()*(deck.length-i));
        //Mozilla Developer Network says
        //there's a 0.00000000000000002168% chance
        //that we'd get j == deck.length here...
        //So be extra careful
        if( j == deck.length )
            j--;
        var tmp = deck[i];
        deck[i]=deck[j];
        deck[j]=tmp;
    }
         
    //deal 'em out
    for(var i=0;i<7;++i){
        piles.push([]);
        for(var j=0;j<=i;++j){
            var c = deck.pop();
            c.setPosition( i*(Card.w+5), Card.h+20*j );
            if( j === i )
                c.visible=true;
            piles[i].push(c);
        }
    }
    
    //it's no fun if the user can't see it...
    draw();
}

function draw(){
    
    //green felt
    ctx.fillStyle="rgb(64,128,64)";
    ctx.fillRect(0,0,cvs.width,cvs.height);
    
    //oh, this is cool. And I'm oh-so-lazy...
    piles.every( function(q){ 
        q.every( function(c){ 
            c.draw(ctx);
            return true;
        });
        return true;
    });
}

function mousedown(e){
    var x = e.clientX-cvs.offsetLeft+window.pageXOffset;
    var y = e.clientY-cvs.offsetTop+window.pageYOffset;
    
    //heh heh...
    piles.every( function(q){
        return q.every(function(c){
            if( c.isInside(x,y) ){
                dragging = c;
                draggingoffset = [ dragging.x - x, dragging.y - y ];
            }
            return true;
        });
    });
}

function mouseup(e){
    dragging=undefined;
}

function mousemove(e){
    if(!dragging)
        return;
    var x = e.clientX-cvs.offsetLeft+window.pageXOffset;
    var y = e.clientY-cvs.offsetTop+window.pageYOffset;
    dragging.setPosition(x+draggingoffset[0],y+draggingoffset[1]);  //whee....
    draw();
}
