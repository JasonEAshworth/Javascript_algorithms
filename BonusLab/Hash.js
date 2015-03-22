"use strict";

function HashSet(hashfunc, equalityfunc, size){
	if(size === undefined)
		size = 97;
	if(equalityfunc === undefined)
		equalityfunc = function(a,b){
			return a === b;
		}
	this.t = new Array(size);
	for(var i =0; i<size; ++i)
		this.t[i] = [];
	this.h = hashfunc;
	this.e = equalityfunc;	
}

HashSet.prototype.insert = function(k,x){
	var idx = this.h(k);
	idx = idx % this.t.length;
	for(var i =0; i<this.t[idx].length; ++i){		
		if(this.e(this.t[idx][i][0], k))			
			return false;
	}
	this.t[idx].push([k,x]);
	return true;
}

HashSet.prototype.search = function(k,x){
	var idx = this.h(k);
	idx = idx % this.t.length;
	var anagrams = [];
	for(var i = 0; i<this.t[idx].length; ++i){		
		if(this.t[idx][i][0].length === k.length){			
			if(this.e(this.t[idx][i][1], x))			
				anagrams.push(this.t[idx][i][0]);
		}
	}	
	return anagrams;
}

HashSet.prototype.erase = function(k){
	var idx = this.h(k);
	idx = idx % this.t.length;
	for (var i = 0; i<this.t[idx].length; ++i){
		if(this.e(this.t[idx][i][0], k)){
			this.t[idx].splice(i,1);
			return true;
		}
	}
	return false;
}



