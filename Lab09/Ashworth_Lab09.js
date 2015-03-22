"use strict";
var R = [], W = [], K = [];	
var nr = 5;
var nc = 5;
//Main part starts here.
function main(){	
	for(var i = 0; i<nr; i++){
		var tmp=[];
		for(var j = 0; j< nc; j++){
			var data1 = [i,j,'e'];  // East vertical wall
			var data2 = [i,j,'s'];	// South horizontal wall
			var data3 = [i,j,'w'];	// West vertical wall
			var data4 = [i,j,'n'];	// North horizontal wall
			tmp.push(new sortedSet(comparator, [i,j])); //creates the sorted sets.			
			if(i < nr -1){
				W.push(data2);
			}
			if (j < nc -1){
				W.push(data1);
			}
			if(i === 0){
				K.push(data4);
			}
			if(i === nr -1){
				K.push(data2);
			}			
			if(j === nc-1){
				K.push(data1);
			}
			if(j === 0){
				K.push(data3);
			}
		}
		R.push(tmp);
	}	
	shuffle(W);	
	while(R[0][0].size() < (nr*nc)){
		var w = W.pop();
		
		var i1 = w[0],  j1 = w[1]; //Set on the Left or Above the line.
		
		if(w[2] === "e"){		
			var i2 = w[0], j2 = w[1]+1;} //Set on the Right of the line
			
		else if(w[2] === "s"){ var i2 = w[0] +1, j2 = w[1];} //Set Below the line.
		
		if(!R[i1][j1].contains([i2,j2])){
			var Q = R[i1][j1].union(R[i2][j2]);			
			for(var q =0; q < Q.A.length; q++){				
				var r = Q.A[q][0];
				var c = Q.A[q][1];				
				R[r][c] = Q;
			}
		}
		else K.push(w);
	}
	randomEnterance(K);	
	draw(K, "black");	
	draw(W, "black");	
}

function draw(K, color){	
	color = color;
	var cvs = document.getElementById("cvs");
	var ctx = cvs.getContext("2d");
	ctx.fillStyle="rgb(250,0,250)";		
	ctx.beginPath();
	var ww = cvs.width/nc;
	var wh = cvs.height/nr;
	ctx.strokeStyle=color;
	for(var k in K){
		var r = K[k][0];
		var c = K[k][1];
		var x = (ww * c);
		var y = (wh * r);		
		if(K[k][2] === 's'){  			//horizontal bottom wall		
			y = y + wh;
			var x2 = x +ww ;
			var y2 = y;
		}
		else if(K[k][2] === "e"){		//vertical right wall			
			x = x + ww;
			var x2 = x;
			var y2 = y + wh;
		}
		else if(K[k][2] === "w"){  		//veritcal left wall
			var x2 = x;
			var y2 = y + wh;		
		}
		else if(K[k][2] === "n"){		//horizontal top wall
			var x2 = x + ww;
			var y2 = y;		
		}
		else throw "God hates you";		//you broke it..but...how?		
		ctx.moveTo(x,y);
		ctx.lineTo(x2,y2);		
	}
	ctx.stroke();
	ctx.stroke();
}

function randomEnterance(wall){	
	var keepers1 = [];
	var keepers2 = [];
	for(var h in wall){		
		if(wall[h][0] === 0 && wall[h][2] === 'n'){
			keepers1.push([h]);
		}
	}
	shuffle(keepers1);
	var left = keepers1.pop();	
	wall.splice(left, 1);		
	for(var k in wall){
		if(wall[k][0] === nr -1 && wall[k][2] === 's'){
			keepers2.push([k]);
		}
	}
	shuffle(keepers2);	
	var right = keepers2.pop();		
	wall.splice(right,1);	
}

function shuffle(List){
	for(var a = 0; a<List.length; a++){
		var i = randomRange(a, List.length);
		i = Math.floor(i);
		var tmp = List[a];
		List[a] = List[i];
		List[i] = tmp;		
	}	
}

function randomRange(i, j){
	var d = j - i;
	var q = Math.random() * d;	
	return q + i;	
	}
	
function comparator(x1, x2){	
	if(x1[0]>x2[0] ){ return 1; }	
	else if(x1[0] === x2[0] && x1[1] > x2[1]){  return 1; }	
	else if(x1[0] === x2[0] && x1[1] === x2[1]) { return 0;}	
	else{ return -1;}	
}