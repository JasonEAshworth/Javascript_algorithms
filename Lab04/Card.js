"use strict";
function Card(r,s, looking){
    this.rank=r;
    this.suit=s;
    this.x=0;
    this.y=0;
	this.posx = (this.rank -1) * Card.w;
	this.posy = this.suit * Card.h;
	this.face = looking;
}

Card.prototype.setPosition = function(x,y){
    this.x=x;
    this.y=y;
}

Card.prototype.draw = function(ctx){
    ctx.drawImage(Card.tilesheet,
        this.posx,this.posy,
        Card.w, Card.h,
        this.x,this.y,
        Card.w, Card.h);
}

Card.prototype.isInside = function(x,y,ctx){
    if( x >= this.x && x <= this.x+Card.w && y >= this.y && y <= this.y+Card.h ){		
        return true;}
    else
        return false;
}

Card.prototype.facing = function(upDown){
	this.face = upDown;
	if(this.face){
		this.posx = 2 * Card.w;
		this.posy = 4 * Card.h;}
	else{
		this.posx = (this.rank -1) * Card.w;
		this.posy = (this.suit * Card.h);}
}

Card.prototype.getRank = function(){
	return this.rank;
}

Card.prototype.getSuit = function(){
	return this.suit;
}


Card.tilesheet = new Image();
Card.tilesheet.src = "allcards.png";
Card.w = 97;
Card.h = 129;
Card.DIAMONDS=0;
Card.HEARTS=1;
Card.SPADES=2;
Card.CLUBS=3;
