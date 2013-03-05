/* 
My JsSet implementation
-----------------------
Vineet Nair

The main purpose of this implementation is to create a set of JS objects and to delete and check set membership
within reasonably good complexities considering limitations of JS to do so.

I needed a good set implementation for mainly comparing two sets
which may contain any types of elements(other objects , or arrays , or booleans , or plain numbers)
*/

var Set = function(){
}
Set.prototype.add = function(obj){
	// The object is first stringified so that the element to be added into the set will be a property first
	// We can then use the set element and reference it as a property of the set object
	//var val = {};
	var temp = JSON.stringify(obj);
	this[temp] = true;
}

Set.prototype.remove = function(obj){
	// The object is first stringified so that the element to be deleted from the set will be a property first
	// We can then use the set element and reference it as a property of the set object
	var temp = JSON.stringify(obj);
	delete this[temp];
}

Set.prototype.minus = function(obj){
	//console.log("in Minus");
	var mythis = this;
	Object.keys(obj).forEach(function(key) {
		//console.log(Object.prototype.toString.apply(key));
		delete mythis[key];
	});
}

Set.prototype.count = function(){
	var count = 0;
	var mythis = this;
	console.log("In Count");
	Object.keys(mythis).forEach(function(key) {
		if('function' !== typeof mythis[key]){
	    	count = count+1;
	    }
	});
	return count;
}

Set.prototype.printAll = function(){
	Object.keys(this).forEach(function(key) {
	    console.log(key);
	});
}

Set.prototype.removeAll = function(){
	var i;
	for (i in this){
		delete this[i];
	}
}

Set.prototype.compare = function(obj){
	return $.compare(this , obj);
}

Set.prototype.contains = function(obj){
	// The object is first stringified so that the element to be referenced from the set will be a property first
	// We can then use the set element and reference it as a property of the set object and check whether a property exists
/*	var str_str = '[object String]', i;
	console.log(obj);
	if(Object.prototype.toString.apply(obj) !== str_str){
		i = JSON.stringify(obj);
	}
	else if(Object.prototype.toString.apply(obj) === str_str){
		i = obj;
	}
	console.log("in contains " + i);
	console.log(this['boo']);	
	console.log(this[i] === true);*/
	return (this[JSON.stringify(obj)] === true);
}

jQuery.extend({
    compare : function (a,b) {
        var obj_str = '[object Object]',
            arr_str = '[object Array]',
            a_type  = Object.prototype.toString.apply(a),
            b_type  = Object.prototype.toString.apply(b);

            if ( a_type !== b_type) { return false; }
            else if (a_type === obj_str) {
                return $.compareObject(a,b);
            }
            else if (a_type === arr_str) {
                return $.compareArray(a,b);
            }
            return (a === b);
        }
});

jQuery.extend({
    compareArray: function (arrayA, arrayB) {
        var a,b,i,a_type,b_type;
        // References to each other?
        if (arrayA === arrayB) { return true;}

        if (arrayA.length != arrayB.length) { return false; }
        // sort modifies original array
        // (which are passed by reference to our method!)
        // so clone the arrays before sorting
        // The first parameter will enable deep copying for deep arrays
        a = jQuery.extend(true, [], arrayA);
        b = jQuery.extend(true, [], arrayB);
        a.sort(); 
        b.sort();
        for (i = 0, l = a.length; i < l; i+=1) {
            a_type = Object.prototype.toString.apply(a[i]);
            b_type = Object.prototype.toString.apply(b[i]);

            if (a_type !== b_type) {
                return false;
            }

            if ($.compare(a[i],b[i]) === false) {
                return false;
            }
        }
        return true;
    }
});

jQuery.extend({
    compareObject : function(objA,objB) {

        var i,a_type,b_type;

        // Compare if they are references to each other 
        if (objA === objB) { return true;}

        if (Object.keys(objA).length !== Object.keys(objB).length) { return false;}
        for (i in objA) {
            if (objA.hasOwnProperty(i)) {
                if (typeof objB[i] === 'undefined') {
                    return false;
                }
                else {
                    a_type = Object.prototype.toString.apply(objA[i]);
                    b_type = Object.prototype.toString.apply(objB[i]);

                    if (a_type !== b_type) {
                        return false; 
                    }
                }
            }
            if ($.compare(objA[i],objB[i]) === false){
                return false;
            }
        }
        return true;
    }
});