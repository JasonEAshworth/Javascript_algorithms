
function findpath(G,si,di){
    //dumb random path algorithm...
    var cvi = si;
    var P=[si];
    var ctr=0;    
    while(cvi != di ){
        ctr++;
        if( ctr > 100 ){
            alert("Sorry, can't find the destination.");
            return P;
        }        
        //consider the current vertex...
        var v = G[cvi];        
        //select a random neighbor...
        if( v.N.length === 0 ){
            alert("Wat?");
            return [];
        }
        var idx = Math.floor(Math.random() * v.N.length);        
        //go there
        cvi = v.N[idx];
        P.push(cvi);
    }    
    //return the path
    return P;
}
        

