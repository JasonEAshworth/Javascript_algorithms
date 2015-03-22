
function findpath(G,si,di){
	var Q = [si];
	while(Q){
		var v = Q.shift();
		if(v == di){
			break;
		}
		for(var i=0;i<G[v].N.length;i++){
			if(!G[G[v].N[i]].visited){
				G[G[v].N[i]].parent = v;
				G[G[v].N[i]].visited = true;
				Q.push(G[v].N[i]);
			}
		}
	}	
	var L=[];
	var ni = di;
	while(ni != si){
		L.unshift(ni);
		ni=G[ni].parent;
	}
	L.unshift(si);
	for(var g=0;g<G.length;g++){
                G[g].parent = 0;
                G[g].visited = false;
        }
	return L;
}
