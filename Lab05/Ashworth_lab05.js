"use strict";

var cards = [];
var dragging = undefined;
var cvs;
var ctx;
var mx,my;
var piles = [];
var gap = 10;
var nope = true;
var prevX = undefined;
var prevY = undefined;
var prevPile = undefined;
var g = [];


function main(){
    cvs = document.getElementById("cvs");
    ctx = cvs.getContext("2d");
    cvs.addEventListener("mousedown",mousedown);
    cvs.addEventListener("mouseup",mouseup);
    cvs.addEventListener("mousemove",mousemove);
    for(var r=1;r<14;++r){
        for(var s=0;s<4;++s){
            cards.push(new Card(r,s, true));
            cards[cards.length-1].setPosition(
                (Math.random()*cvs.width),
                (Math.random()*cvs.height));
        }
    }
	
    shuffle(cards);
	
	makepiles();
	
	draw();
}

function makepiles(){
	
	for(var k = 0; k < 7; ++k){
		var tempPile = [];
		for(var j = 0; j <= k+1; ++j){				
			tempPile.push(cards.pop());
			tempPile[j].setPosition((k*97) + (gap *k)+gap, (j*gap) + gap); 
			if(j == k+1){
				tempPile[j].facing(false)}
			else{tempPile[j].facing(true)}
		}
	piles.push(tempPile);
	}
}

function draw(){
    ctx.fillStyle="rgb(128,224,255)";
    ctx.fillRect(0,0,cvs.width,cvs.height);
    for(var i=0;i<piles.length;++i){
        for(var d = 1; d< piles[i].length; ++d){
			piles[i][d].draw(ctx);
		}
	}
	if(dragging != undefined){
		dragging.draw(ctx);
	}
}

function mousedown(e){
	if(dragging == undefined){
		var x = e.clientX-cvs.offsetLeft+window.pageXOffset;
		var y = e.clientY-cvs.offsetTop+window.pageYOffset;
		for(var i=0;i<piles.length;++i){
			for(var u = piles[i].length-1;u>=0; --u){
				if( piles[i][piles[i].length -1].isInside(x,y) ){					
					dragging = piles[i][piles[i].length -1];
					prevX = piles[i][piles[i].length -1].x;
					prevY = piles[i][piles[i].length -1].y;
					prevPile = piles[i];
					piles[i].pop();				
					mx=x;
					my=y;
					break;
				}
			}
		}
	}
	
}

function onPile(Piles, x, y){
	for(var t = 0; t<Piles.length; ++t){
		//console.log(Piles[t][Piles[t].length -1]);
		if(Piles[t][Piles[t].length -1].isInside(x, y) == true){
			return [true, t];	
		}
	}
	return [false, undefined];
}


function mouseup(e){	
    if(dragging != undefined){	
		g = onPile(piles, dragging.x, dragging.y);		
		if(g[0] != false){
			dragging.setPosition(piles[g[1]][0].x, piles[g[1]][piles[g[1]].length -1].y + gap);
			piles[g[1]].push(dragging);
			draw();
		}
		else{
			dragging.setPosition(prevX, prevY);
			prevPile.push(dragging);
			draw();
		}
	}
	dragging = undefined;
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
	//return cardDeck;
}
