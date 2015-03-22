"use strict";

function Card(Array, cvs){
	this.pixelWidth = 97;
	this.pixelHeight = 129;
	this.offSetX = 0;
	this.offSetY = 0;
	this.sizeX = 97;
	this.sizeY = 129;
	var CardNo =  Math.floor(Math.random() * Array.length);
	this.suit = Array[CardNo][2];
	this.rank = Array[CardNo][3];
	this.sprX = Array[CardNo][0];
	this.sprY = Array[CardNo][1];	
	this.scrX = Math.floor(Math.random() * cvs.width);
		if(this.scrX > cvs.width - 97){
			this.scrX -= 97; }
		
		
	this.scrY = Math.floor(Math.random() * cvs.height) ;
		if(this.scrY > cvs.height - 129){
			this.scrY -= 129; }
	this.faceUpDown = true;
	this.pressed = false;
	Array.splice(CardNo, 1);
	
}
	Card.prototype.display_card = function(ctx, AllCards, cvs){
		//ctx.fillStyle="red";
		//ctx.fillRect(0,0,cvs.width, cvs.height);
		ctx.drawImage(AllCards,this.sprX, this.sprY, 97,129, this.scrX, this.scrY, this.sizeX, this.sizeY );		
		/*ctx.fillStyle="black";
		ctx.font="12pt Serif";							
		ctx.fillText("offsetX: " + offsetX,200,20);
		ctx.fillText("offsetY: " + offsetY,200,40);
		ctx.fillText("mouseX: " + mouseX,200,60);
		ctx.fillText("mouseY: " + mouseY,200,80);		//Used for troubleshooting.
		//ctx.fillText(cvs.offsetTop,200,60);
		ctx.fillText("CardX: " + CardX,200,100);
		ctx.fillText("CardY: " + CardY,200,120);
		ctx.fillText("jimsX: " + jimsX,200,140);
		ctx.fillText("jimsY: " + jimsY,200,160); */
	}
		
		
