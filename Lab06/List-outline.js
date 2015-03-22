"use strict";

function List(){
    this.head = undefined;
	this.tail = undefined;
	this.cursor = this.head;
	
}

function Node(v){
	this.next = undefined;
	this.previous = undefined;
	this.data = v;
}

/** Move cursor to start of list */
List.prototype.cursorToStart = function(){
	this.cursor = this.head;
}

/** Move cursor to end of list*/
List.prototype.cursorToEnd = function(){
	this.cursor = this.tail;
}

/** Advance cursor to next position. If cursor is already at end, do nothing.*/
List.prototype.advanceCursor = function(){
	if(this.cursorAtEnd) return;
	else this.cursor = this.cursor.next;
}

/** Move cursor back one place. If cursor is already at the head, do nothing*/
List.prototype.unadvanceCursor = function(){
	if(this.cursorAtStart) return
	else return this.cursor.previous;
}

/** Return true if cursor is at start, false if not*/
List.prototype.cursorAtStart = function(){
	if(this.cursor.previous) return false;
	else return true;
}


/** Return true if cursor at end, false if not*/
List.prototype.cursorAtEnd = function(){
	if(this.cursor.next) return false;
	else return true;
}

/** Get item after cursor. If cursor is at end, return undefined*/
List.prototype.getAfterCursor = function(){
	if(this.cursorAtEnd) return this.cursor;
	else return undefined;
}

/** Get item before cursor. If cursor is at head, return undefined*/
List.prototype.getBeforeCursor = function(){
	if(this.cursorAtStart) return this.cursor.previous;
	else return undefined;	
}

        
/** Insert v after the cursor. Cursor position is unchanged. */
List.prototype.insert = function(v){
	if(this.head === undefined && this.tail === udefined){
		var n = new Node(v);
		this.head = n;
		this.tail = n;
		this.cursor = n;
	}
	if(this.head === this.cursor){
		var n = new Node(v);
		this.head = n;
		n.next = this.cursor;
		this.cursor.next.previous = n;
	}
	if(this.head === this.cursor){
		var n = new Node(v);
		this.tail = n;
		n.previous = this.cursor;
		this.cursor.next = n;
		this.cursor = n;
	}
	else{
		var n = new Node(v);
		n.next = this.cursor.next;
		n.prev = this.cursor;
		this.cursor.next.previous = n;
		this.curosr.next = n;
		this.cursor = n;
	}
		
}

/** Remove item after cursor; cursor is advanced to the one after
 * the removed element. If cursor is at the end: No action occurs. 
 */
List.prototype.remove = function(){
	if(this.cursotAtEnd)
		return;
	else if (this.cursor === undefined)
		return;
	else if (this.cursorAtStart && this.cursorAtEnd)
		return;
	else if (this.cursorAtStart){
		this.head = this.head.next;
		this.head.next.prev = undefined;
		return;
	}
	else if (this.tail.prev === this.cursor){
		this.cursor.next = undefined;
		this.tail = this.cursor;
		return;
	}
	else{
		this.cursor.next = this.cursor.next.next;
		this.cursor.next.previous = this.cursor;
		return;
	}
		

}

/** Execute the function ff for each element of the list.
 * The cursor is unaffected.*/
List.prototype.forEach = function(ff){
	for(var v in this){
		ff(v);
	}
	
}

function ListIterator(L){
	this.N = L.head;
}

ListIterator.prototype.next = function(){
	if( ! this.N)
		throw StopIteration;
	var v = this.N.Value;
	this.N = this.N.next;
	return v;
}

list.prototype.__iterator__ = function(){
	return new ListIterator(this);
}

