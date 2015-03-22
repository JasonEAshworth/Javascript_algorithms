"use strict";

var HS = new HashSet(SH, EQ, 500);

function main(){
	var words = document.getElementById("words");
	var content = words.contentDocument.body.textContent;
	var list = content.split("\n");	
	for (var i = 0; i < list.length; ++i){
		HS.insert(list[i], wordSorter(list[i]));
	}
}

function make_it_sew(){
	var el = document.getElementById("something");
	var txt = el.value;
	txt = txt.toUpperCase();	
	//Make magic happen
	//magic.do();	
	var Q = document.getElementById("text");
	Q.value = "Words for " + txt + ": " + HS.search(txt, wordSorter(txt));	
}	

function SH(s){	  				//hash function
	var v = 0;
	for(var i = 0; i<s.length; ++i){
		v += s.charCodeAt(i);		
	}
	return v;
}

function EQ(a, b){				//equality function
	return a === b;
}

function wordSorter(w){			//alphabetical sorter.
	var letters = [];
	for(var i = 0; i < w.length; ++i){
		letters.push(w[i]);
	}
	letters.sort();
	var word = new String();
	for(var l = 0; l < letters.length; ++l){
		word += letters[l];
	}	
	return word;
}

