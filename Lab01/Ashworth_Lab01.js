//ETEC2101 Lab 01
//Jason Ashworth

"use strict";

var ball
var x = 100
var y = 100
// x and y values for the ball to start on-screen

var VectorX = .8
var VectorY = .6
// Direction (Vector2) to be applied to the ball.
var DirectionX = "Right"
var DirectionY = "Down"
//To track which way the x and y values should be going.

function myfunc(){
	ball = new Image();
	
	ball.src = "ball1.png";
	
	window.setInterval(move,10);
	//I sped up the interval to make the ball move across the screen faster...(it SHOULD be 100, but I'm impatient)
	
	}
	
function showball(ctx, x){
							ctx.drawImage(ball, x, y);
						}
	
function move(){
	var cvs;
	var ctx;	
	cvs = document.getElementById("foo");
	ctx = cvs.getContext("2d");
	ctx.fillStyle="rgb(255,0,255)";			
	create(ctx,cvs);		
	
	function create(){
		
		ctx.fillRect(0,0,cvs.width, cvs.height);	
		//Fills the bacground color in
		ball.addEventListener("load", showball(ctx,x));
		//makes sure the ball is loaded, and displays it to the screen.
		if(DirectionX == "Right"){
			x = x + VectorX
			}
			//incrementing the x value in the direction of VectorX to move the ball.
		if(DirectionX == "Left"){	
				x = x + -VectorX
				}
			//incrementing the x value in the -VectorX direction.
		if(DirectionY == "Down"){
			y = y + VectorY
			}
			//incrementing the y value in the direction of VectorY to move the ball.
		if(DirectionY == "Up"){	
			y = y + -VectorY
			}
			//incrementing the y value in the -VectorY direction.
			
		if(x > 336){
			DirectionX = "Left"
			VectorX =1 + Math.random()
			}
		if(x < -1){
			DirectionX = "Right"
			VectorX =1 + Math.random()
			}							//Tracking which way the ball should be traveling by X and Y Values respectively. and resetting the speed. 
		if(y > 336){
			DirectionY = "Up"
			VectorY = Math.random()  * 10
			}
		if(y < 0){
			DirectionY = "Down"
			VectorY = Math.random()  * 10
			}
		
		ctx.fillStyle="black";
		ctx.font="8pt Serif";					//Used for tracking the X and Y Directions
		ctx.fillText(VectorX,0,10);
		ctx.fillText(VectorY,0,20);
		ctx.fillText(DirectionX,0,30);
		ctx.fillText(DirectionY,0,40);
			
	}
}