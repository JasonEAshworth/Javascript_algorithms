//ETEC 2101 Lab 02
//Jason Ashworth

"use strict";

function myfunc(){
	var mouseX, mouseY, pressed, jimsY, jimsX, selected_card, SelectedX,SelectedY, cardNowX, cardNowY;
	var sizeX = 96;
	var sizeY = 128;
	var offsetX = 0;
	var offsetY = 0;
	var CardX = 1;
	var CardY = 1;
	var card = new Image();	
	var which_card = Math.floor((Math.random()*60)+1);
	card.src = "allcards.png";
	card.addEventListener("load", random_card());
	var cvs = document.getElementById("foo");
	var ctx = cvs.getContext("2d");
	//ctx.fillStyle="rgb(255,0,255)";	
	random_card();
	//window.setInterval(display_card,10);
	cvs.addEventListener("mousedown", mouse_down );
	cvs.addEventListener("mouseup", mouse_up );
	display_card();
	cvs.addEventListener("mousemove",
        function(ev){            
                mouseX = ev.clientX-cvs.offsetLeft;
                mouseY = ev.clientY-cvs.offsetTop;
				
				if (pressed === true){	
					
					CardX = mouseX - offsetX;
					CardY = mouseY - offsetY;		
							}
				display_card();
					}
						);	
	function mouse_down(ev){	
	if( ev.button === 0 ){ 
		if( mouseX > CardX && mouseX < (CardX + 97) && mouseY > CardY && mouseY < (CardY + 129)){
			pressed = true;
			cardNowX = CardX;
			cardNowY = CardY;
			jimsX = mouseX;
			jimsY = mouseY; 
			offsetX = jimsX - cardNowX;
			offsetY = jimsY - cardNowY;			
			sizeX = 110;
			sizeY = 140; display_card(); }}
							}
	function mouse_up(ev){
		if( ev.button === 0 ) { pressed = false; sizeX = 96;	sizeY = 128; display_card(); }
						}	
	function random_card(){
		//chooses one of the cards at random after the image is loaded.
		//97 wide 129 tall
		//57 different total cards.		
		if(which_card > 57){
			which_card -= 3;}
			//keeps it from picking more than the total cards allowed.
		if (which_card < 14){
			SelectedX = (which_card * 97) - 97;
			SelectedY = 0;
			}//row 1
		else if(which_card < 27 && which_card > 13){
			SelectedX = (which_card * 97) - 1358;
			SelectedY = 129 ;
			}//row 2
		else if(which_card < 40 && which_card > 26){
			SelectedX = (which_card * 97)  - 2619;
			SelectedY = 129 * 2;
			}//row 3
		else if(which_card < 53 && which_card > 39){
			SelectedX = (which_card * 97) - 3880;
			SelectedY = 129 * 3;
			}//row 4
		else if(which_card < 58 && which_card > 52){
			SelectedX = (which_card * 97) - 5141;
			SelectedY = 129 * 4;
			}//row 5	
						}	
	function display_card(){
		//displays the random card on the screen at the selected x,y coordinate.							
		ctx.fillStyle="red";
		ctx.fillRect(0,0,cvs.width, cvs.height);
		ctx.drawImage(card,SelectedX, SelectedY, 96,128, CardX, CardY,  sizeX, sizeY );		
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
	}