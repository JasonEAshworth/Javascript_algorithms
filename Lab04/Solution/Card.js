"use strict";
function Card(r,s,visible){
    this.rank=r;
    this.suit=s;
    this.x=0;
    this.y=0;
    this.visible=visible;
    if( !Card.tilesheet )
        Card.tilesheet = document.getElementById("allcards");
}

Card.prototype.setPosition = function(x,y){
    this.x=x;
    this.y=y;
}

Card.prototype.draw = function(ctx){
    if( this.visible )
        ctx.drawImage(Card.tilesheet,
            (this.rank-1)*Card.w,this.suit*Card.h,
            Card.w, Card.h,
            this.x,this.y,
            Card.w, Card.h);
    else
        ctx.drawImage(Card.tilesheet,
            2*Card.w,4*Card.h,
            Card.w,Card.h,
            this.x,this.y,Card.w,Card.h);
            
}

Card.prototype.isInside = function(x,y){
    if( x >= this.x && x <= this.x+Card.w && y >= this.y && y <= this.y+Card.h )
        return true;
    else
        return false;
}

Card.tilesheet = undefined ;
Card.w = 97;
Card.h = 129;

//the scheme we described in class doesn't work so well for this... Meh.
Card.DIAMONDS=0;
Card.HEARTS=1;
Card.SPADES=2;
Card.CLUBS=3;
