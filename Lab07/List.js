"use strict";

function List(){
    this.head=undefined;
    this.tail=undefined;
    
    //always points to the node *after* the one
    //where the logical cursor is located.
    //Ex:
    //  A---->B---->C---->D
    //         /|\ /|\
    //          |   |
    //     logical  |
    //      cursor  |
    //              this.cursor
    this.cursor=undefined;
    
}

function Node(v){
    this.data=v;
    this.prev=undefined;
    this.next=undefined;
}

/** Move cursor to start of list */
List.prototype.cursorToStart = function(){
    this.cursor = this.head;
}

/** Move cursor to end of list*/
List.prototype.cursorToEnd = function(){
    this.cursor = undefined;
}

/** Advance cursor to next position. If cursor is already at end, do nothing.*/
List.prototype.advanceCursor = function(){
    if( !this.cursor )
        return false;
    else
        this.cursor = this.cursor.next;
}

/** Move cursor back one place. If cursor is already at the head, do nothing*/
List.prototype.unadvanceCursor = function(){
    if( !this.cursor )
        this.cursor = this.tail;
    else{
        if( !this.cursor.prev )
            return;
        this.cursor = this.cursor.prev;
    }
}

/** Return true if cursor is at start, false if not*/
List.prototype.cursorAtStart = function(){
    return this.cursor == this.head;
}


/** Return true if cursor at end, false if not*/
List.prototype.cursorAtEnd = function(){
    return this.cursor == undefined;
}

/** Get item after cursor. If cursor is at end, return undefined*/
List.prototype.getAfterCursor = function(){
    if(!this.cursor)
        return undefined;
    return this.cursor.data;
}

/** Get item before cursor. If cursor is at head, return undefined*/
List.prototype.getBeforeCursor = function(){
    if(this.cursor){
        if(this.cursor.prev)
            return this.cursor.prev.data;
        else
            return undefined;
    }
    else{
        if(this.tail)
            return this.tail.data;
        else
            return undefined;
    }
}

        
/** Insert v after the cursor. Cursor position is unchanged. */
List.prototype.insert = function(v){
    var Q = new Node(v);
    var c = this.cursor;
    if( c ){
        var p = c.prev;
        if( p )
            p.next = Q;
        else
            this.head=Q;
        Q.next=c;
        Q.prev=p;
        c.prev=Q;
    }
    else{
        var T = this.tail;
        if(!T){
            //empty list
            this.head = Q;
            this.tail=Q;
        }
        else{
            T.next = Q;
            Q.prev=T;
            this.tail=Q;
        }
    }
}

/** Remove item after cursor; cursor is advanced to the one after
 * the removed element. If cursor is at the end: No action occurs. 
 */
List.prototype.remove = function(){
    var c = this.cursor;
    if(!c){
        return false;
    }
    var p = c.prev;
    var n = c.next;
    if( p )
        p.next = n;
    else
        this.head = n;
    if( n )
        n.prev = p;
    else
        this.tail = p;
    this.cursor = n;
}

/** Execute the function ff for each element of the list.
 * The cursor is unaffected.*/
List.prototype.forEach = function(ff){
    var x = this.head;
    while( x ){
        ff(x.data);
        x=x.next;
    }
}
