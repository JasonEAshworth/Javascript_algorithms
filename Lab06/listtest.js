"use strict";


function main(){
    document.getElementById("tbox").value="";
    
    var L1 = new List();
    var A=[2,4,6,8,10,12,14,16];
    for(var i=0;i<A.length;++i){
        L1.insert(A[i]);
    }	
    check(L1,A,"initial insert");
    
    L1.cursorToStart();
    L1.insert(20);
    A.unshift(20);
    check(L1,A,"insert from beginning");
    
    L1.cursorToStart();
    L1.advanceCursor();
    L1.advanceCursor();
    L1.insert(40);
    A.splice(2,0,40);
    check(L1,A,"insert two places in");

    L1.cursorToStart();
    L1.advanceCursor();
    L1.advanceCursor();
    L1.insert(60);
    L1.insert(80);
    A.splice(2,0,60,80);
    check(L1,A,"insert several items");
    
    L1.cursorToEnd();
    L1.insert(90);
    A.push(90);
    check(L1,A,"insert at end");
    
    L1.cursorToStart();
    L1.insert(55);
    A.unshift(55);
    check(L1,A,"insert at start");
    
    L1.cursorToStart();
    L1.insert(56);
    L1.insert(57);
    A=[56,57].concat(A);
    check(L1,A,"insert several at start");
    
    L1.cursorToStart();
    for(var i=0;i<A.length;++i)
        L1.advanceCursor();
    assert(L1.cursorAtEnd());
    L1.insert(77);
    A.push(77);
    check(L1,A,"insert at end");
    
    L1.cursorToStart();
    L1.advanceCursor();
    L1.advanceCursor();
    L1.remove();
    A.splice(2,1);
    check(L1,A,"remove");
    
    L1.cursorToStart();
    L1.advanceCursor();
    L1.advanceCursor();
    L1.remove();
    L1.remove();
    A.splice(2,2);
    check(L1,A,"remove two");
    
    L1.cursorToStart();
    L1.remove();
    A.shift();
    check(L1,A,"remove from start");
    
    L1.cursorToEnd();
    assert( false === L1.advanceCursor() );
    
    L1.cursorToEnd();
    assert( false === L1.remove() );
    check(L1,A,"remove from end");
    
    L1.cursorToStart();
    L1.advanceCursor();
    L1.remove();
    A.splice(1,1);
    check(L1,A,"remove one place in");
    
    L1.cursorToStart();
    for(var i=0;i<A.length;++i)
        L1.advanceCursor();
    L1.unadvanceCursor();
    L1.remove();
    A.pop();
    check(L1,A,"remove from end");
    
    var Q=[];
    L1.forEach(function(q){
        Q.push(q);
    });
    assert(Q.length == A.length);
    for(var i=0;i<Q.length;++i){
        assert( Q[i] == A[i]);
    }
    print("ForEach is OK");
    
    print("We is done. Go have a cookie.");
    
    
}
    
function assert(x,A,B){
    if(!x){
        print("Uh oh!");
        print("Found:   ",B.toString());
        print("Expected:",A.toString());
        throw("Broken. Fix me.");
    }
}

function check(L,A,msg){
    print("Checking",msg,"; expecting:",A.join(","));
    var B=[];
    L.cursorToStart();
    assert( L.cursorAtStart() );
    for(var i=0;i<=A.length;++i){
        if( i == 0 )		
            assert(L.getBeforeCursor() == undefined  );
        else
            assert(L.getBeforeCursor() == A[i-1], A, B);
            
        if( i == A.length )
            assert ( L.cursorAtEnd() );
        else{
            assert( !L.cursorAtEnd() );
            B.push( L.getAfterCursor() );
			}	
        
        //shouldn't crash, even if we're already at the end
        L.advanceCursor();
        
    }
	console.log(L);
	
    while(!L.cursorAtEnd() ){
        B.push(L.getAfterCursor());
        L.advanceCursor();
    }
	console.log(A, B);
    assert(A.length === B.length,A,B);
    for(var i=0;i<A.length;++i)
        assert(A[i]==B[i],A,B);
    print("OK!");
}


function print(){
    var tb = document.getElementById("tbox");
    var A=[];
    for(var i=0;i<arguments.length;++i){
        A.push(arguments[i]);
    }
    tb.value += A.join(" ");
    tb.value += "\n";
}
