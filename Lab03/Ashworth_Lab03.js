//ETEC 2101 Lab 02
//Jason Ashworth

"use strict";

function myfunc(){
	var mouseX, mouseY, pressed, jimsY, jimsX, selected_card, SelectedX,SelectedY, cardNowX, cardNowY;	
	var Card_Array = [];
	var cvs = document.getElementById("foo");
	var ctx = cvs.getContext("2d");	
	var AllCards = new Image();
	AllCards.src = "allcards.png";
	AllCards.addEventListener("load", Populate_Cards);
	
	var createdCards = [];
	/*var card1 = new Card(Card_Array, cvs);
	var card2 = new Card(Card_Array, cvs);
	var card3 = new Card(Card_Array, cvs);
	var card4 = new Card(Card_Array, cvs);
	var card5 = new Card(Card_Array, cvs);
	var card6 = new Card(Card_Array, cvs);
	var card7 = new Card(Card_Array, cvs);
	var card8 = new Card(Card_Array, cvs);
	var card9 = new Card(Card_Array, cvs);
	var card10 = new Card(Card_Array, cvs);
	var createdCards = [card1, card2, card3,card4,card5,card6,card7,card8,card9,card10];
	
	
	*/
	cvs.addEventListener("mousedown", mouse_down);
	cvs.addEventListener("mouseup", mouse_up);	
	cvs.addEventListener("mousemove", mouse_move);
	window.setInterval(update,10)
	//card1.display_card();
	//card2.display_card();
	//card3.display_card();
	function mouse_move(ev){            
                mouseX = ev.clientX-cvs.offsetLeft;
                mouseY = ev.clientY-cvs.offsetTop;
				
				for(var k = 0; k<createdCards.length; k = k + 1){	
					if(createdCards[k].pressed === true){
						createdCards[k].scrX = mouseX - createdCards[k].offsetX;
						createdCards[k].scrY = mouseY - createdCards[k].offsetY;
						//createdCards[k].display_card(ctx, AllCards, cvs);	
					}
				}				
		}
			
		
	function mouse_down(ev){	
		if(ev.button === 0){
			for(var i =0; i<createdCards.length; i = i + 1){
				if(mouseX > createdCards[i].scrX && mouseX < (createdCards[i].scrX + 97) && mouseY > createdCards[i].scrY && mouseY < (createdCards[i].scrY + 129)){
					createdCards[i].pressed = true;
					cardNowX = createdCards[i].scrX;
					cardNowY = createdCards[i].scrY;
					jimsX = mouseX;
					jimsY = mouseY; 
					createdCards[i].offsetX = jimsX - cardNowX;
					createdCards[i].offsetY = jimsY - cardNowY;			
					createdCards[i].sizeX = 110;
					createdCards[i].sizeY = 140; 
				}
				//createdCards[i].display_card(ctx, AllCards, cvs);
			}
		}
	}
							
	function mouse_up(ev){
		if( ev.button === 0 ) { 
			for(var j =0; j<createdCards.length; ++j){ 
				createdCards[j].pressed = false; createdCards[j].sizeX = 97;	createdCards[j].sizeY = 129; createdCards[j].display_card(ctx, AllCards, cvs); 
			}
		}							
	}
	function Populate_Cards(){
		for(var y = 0; y<=(3*129); y = y + 129){
			var Suit = 10;
				if(y === 129){Suit = 2;}
				if(y === 258){Suit = 5;}
				if(y === 387){Suit = 1;}
				var Rank = 1;
				for(var x = 0; x <=(12*97); x = x + 97){					
					var Cardz = [x , y, Suit, Rank];
					Card_Array.push(Cardz);
					Rank += 1;
				}
		}
		for(var s = 0; s < 52; s = s + 1){
		var cards  = new Card(Card_Array, cvs);
		createdCards.push(cards);
		}
	}
		
	function update(){	
		ctx.fillStyle="blue";
		ctx.fillRect(0,0,cvs.width, cvs.height);
		for(var n =0; n<createdCards.length; ++n){			
			createdCards[n].display_card(ctx, AllCards, cvs);
		}
	}
		
}
	
	
