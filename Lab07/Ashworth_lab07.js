"use strict";
var drawPileX = 10;
var drawPileY = 10;
var discardX = 117;
var discardY = 10;

var cards = [];
var dragging = undefined;
var cvs;
var ctx;
var mx,my;
var piles = [];
var gap = 20;
var vmargin = 8 * gap;
var nope = true;
var prevX = undefined;
var prevY = undefined;
var prevPile = undefined;
var g = [];
var L = new List();
var discardPile = [];
var drawPile = [];

function main(){
    cvs = document.getElementById("cvs");
    ctx = cvs.getContext("2d");
    cvs.addEventListener("mousedown",mousedown);
    cvs.addEventListener("mouseup",mouseup);
    cvs.addEventListener("mousemove",mousemove);
    for(var r=1;r<14;++r){
        for(var s=0;s<4;++s){
            cards.push(new Card(r,s, true));            
        }
    }	
    shuffle(cards);	
	makepiles();
	whatsLeftOver();
	L.forEach(function(c){
		c.setPosition(drawPileX, drawPileY);
		});
	discardPile = L.getBeforeCursor;
	drawPile = L.getAfterCursor;
	draw();
}

function makepiles(){
	
	for(var k = 0; k < 7; ++k){
		var tempPile = [];
		for(var j = 0; j <= k; ++j){				
			tempPile.push(cards.pop());
			tempPile[j].setPosition((k*97) + (gap *k)+gap, (8*gap) + (j *gap)); 
			if(j == k){
				tempPile[j].facing(false)}
			else{tempPile[j].facing(true)}
		}
	piles.push(tempPile);
	}
}

function whatsLeftOver(){
	while(cards.length > 0){
		L.insert(cards.pop());
	}
	L.cursorToStart();
}

function draw(){
    ctx.fillStyle="rgb(128,224,255)";
    ctx.fillRect(0,0,cvs.width,cvs.height);
    for(var i=0;i<piles.length;++i){
        for(var d = 0; d< piles[i].length; ++d){
			piles[i][d].draw(ctx);
		}
	}
	var b = L.getAfterCursor();
	var a = L.getBeforeCursor();
	if(b){			
		b.facing(true);		
		b.setPosition(drawPileX, drawPileY);		
		b.draw(ctx);
	}	
	if(a){			
		a.facing(false);		
		a.setPosition(discardX, discardY);		
		a.draw(ctx);
	}
	if(dragging != undefined){
		dragging.draw(ctx);
	}
}

function mousedown(e){
	if(dragging == undefined){
		var x = e.clientX-cvs.offsetLeft+window.pageXOffset;
		var y = e.clientY-cvs.offsetTop+window.pageYOffset;		
		
		var b = L.getAfterCursor();
		var a = L.getBeforeCursor();		
		if(b && b.isInside(x,y)){		
			L.advanceCursor();
			draw();
			return;
		}				
		if(a && a.isInside(x, y)){					
			L.unadvanceCursor();		
			dragging = a;
			mx = x;
			my = y;		
			L.remove();		
			prevPile = -1;			
			return;
		}
		
		
		else if(L.cursorAtEnd() && x >= drawPileX && x <= drawPileX+Card.w && y >= drawPileY && y <= drawPileY+Card.h){
			L.cursorToStart();
			draw();
			return;
		}
		else{
			for(var i=0;i<piles.length;++i){
				var P = piles[i];
				if(P.length > 0) {
					var c = P[P.length-1];
					if( c.isInside(x,y) ){					
						dragging = P.pop();
						prevX = c.x;
						prevY = c.y;
						prevPile = i;						
						mx=x;
						my=y;
						return;
					}
				}	
				
			}
	
		}
	}
	
}

function mouseup(e){	
    if(!dragging )
		return;
	var x = e.clientX-cvs.offsetLeft+window.pageXOffset;
	var y = e.clientY-cvs.offsetTop+window.pageYOffset;	
	var pi = prevPile;
	
	for(var i = 0; i<piles.length; ++i){
		var len = piles[i].length
		if(len == 0)
			len = 1;
		var x1 = gap*(i+1) + Card.w * (i);
		var x2 = x1 + Card.w;
		var y1 = vmargin;		
		if(x >= x1 && x <= x2 && y >= y1){
			pi = i;						
			break;
		}
	}
	if(pi === -1){
		L.insert(dragging);
		dragging = undefined;
		draw();
	}
	else{
		dragging.setPosition(gap+pi*(gap+Card.w), vmargin+gap*piles[pi].length);
		piles[pi].push(dragging);
		}
	dragging = undefined;			
	draw();
	
	
	
}

function mousemove(e){
    if(!dragging)
        return;
    var x = e.clientX-cvs.offsetLeft+window.pageXOffset;
    var y = e.clientY-cvs.offsetTop+window.pageYOffset;
    var dx=x-mx;
    var dy=y-my;
    mx=x;
    my=y;
    dragging.setPosition(dragging.x+dx,dragging.y+dy);
    draw();
}

function randomRange(i, j){
	var d = j - i;
	var q = Math.random() * d;	
	return q + i;
	
	}
	
function shuffle(cardDeck){
	for(var a = 0; a<cardDeck.length; a++){
		var i = randomRange(a, cardDeck.length);
		i = Math.floor(i);
		var tmp = cardDeck[a];
		cardDeck[a] = cardDeck[i];
		cardDeck[i] = tmp;
		
	}	
}
