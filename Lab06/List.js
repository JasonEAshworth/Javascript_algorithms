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
	this.cursor = undefined;
}

/** Move cursor to end of list*/
List.prototype.cursorToEnd = function(){
	this.cursor = this.tail;
}

/** Advance cursor to next position. If cursor is already at end, do nothing.*/
List.prototype.advanceCursor = function(){
	if(this.cursor === this.tail) return false;
	else if(this.cursor === undefined) this.cursor = this.head;
	else this.cursor = this.cursor.next;
}

/** Move cursor back one place. If cursor is already at the head, do nothing*/
List.prototype.unadvanceCursor = function(){
	if(this.cursor=== undefined) return false;
	else this.cursor = this.cursor.previous;
}

/** Return true if cursor is at start, false if not*/
List.prototype.cursorAtStart = function(){
	if(this.cursor === undefined) return true;	
	else return false;
}

/** Return true if cursor at end, false if not*/
List.prototype.cursorAtEnd = function(){
	if(this.cursor === this.tail) return true;
	else return false;
}

/** Get item after cursor. If cursor is at end, return undefined*/
List.prototype.getAfterCursor = function(){
	if (this.cursor === undefined) return this.head.data;
	else if(this.cursor === this.tail) return undefined ;
	else return this.cursor.next.data;
}

/** Get item before cursor. If cursor is at head, return undefined*/
List.prototype.getBeforeCursor = function(){	
	if(this.cursor===undefined) return undefined;	
	else return this.cursor.data;
}

        
/** Insert v after the cursor. Cursor position is unchanged. */
List.prototype.insert = function(v){
	if(this.head === undefined && this.tail === undefined){
		var n = new Node(v);
		this.head = n;
		this.tail = n;					//no element list
		this.cursor = n;
		return;
	}
	else if(this.head === this.tail){
		var n = new Node(v);
		n.next = this.cursor.next;		
		this.tail = n;
		this.cursor.next = n;			//single element list
		n.previous = this.cursor;
		this.cursor = n;
		return;
	}
	else if(this.cursor === undefined){
		var n = new Node(v);		
		n.previous = this.head.previous;
		n.next = this.head;						//Cursor is at the end of the list
		this.head.previous = n;
		this.head = n;
		this.cursor = n;	
		return;
	}
	else if(this.cursor === this.tail){
		var n = new Node(v);
		n.previous = this.cursor;
		n.next = this.cursor.next;
		this.tail = n;
		this.cursor.next = n;
		this.cursor = n;
		return;
	}
	else{
		var n = new Node(v);
		n.next = this.cursor.next;
		this.cursor.next.previous = n;		//cursor is in the middle of the list.
		n.previous = this.cursor;
		this.cursor.next = n;
		this.cursor = n;		
		return;
	}
		
}

/** Remove item after cursor; cursor is advanced to the one after
 * the removed element. If cursor is at the end: No action occurs. 
 */
List.prototype.remove = function(){
	if(this.cursorAtEnd()) return false;
		
	else if (this.cursorAtStart() && this.cursorAtEnd()){
		this.head = undefined;
		this.tail = undefined;
		this.cursor = undefined;
		return; // single element list, set everything to undefined!
	}
	
	else if (this.cursorAtStart()){
		this.head.next.previous = this.head.previous;		
		this.head = this.head.next;	
		return;
	}
	else if(this.cursor.next === this.tail){
		this.cursor.next = this.tail.next;
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
	var x = this.head;
	while (x != this.tail.next){
		ff(x.data);
		x = x.next;
	}
}





