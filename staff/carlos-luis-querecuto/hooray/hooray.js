'use strict';

/**
 * 
 */
function Hooray() {
    var first = arguments[0];

    if (arguments.length === 1 && typeof first === 'number')
        if (parseInt(first) !== first) throw RangeError('Invalid hooray');
        else return this.length = first;

    for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
    this.length = arguments.length;
}

/**
* Adds a value at the end of an hooray, incrementing its length by 1.
* 
* @param {*} value The value to push in the hooray.
* 
* @returns {number} The length of the hooray after adding the new value.
*/
Hooray.prototype.push = function () {
    if (arguments.length > 0)
        for (var i = 0; i < arguments.length; i++)
            this[this.length++] = arguments[i];

    return this.length;
}

/**
 * Iterates the current hooray and evaluates an expression on each of its values.
 * 
 * @param {Function} callback The expression to evaluate.
 */
Hooray.prototype.forEach = function (callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var self = this;

    this.length && (function forEach(index) {
        callback(self[index], index);

        if (++index < self.length)
            forEach(index);
    })(0);
}

/**
 * Gives you a new hooray made from a union of 2 other hoorays
 * 
 * @param {hooray} hooray to make an union
 * 
 */
Hooray.prototype.concat = function() {
    var hooray = new Hooray()
    for ( var i=0; i < arguments.length; i++ ){
        if (!(arguments[i] instanceof Hooray)) throw TypeError(arguments[i] + ' is not an hooray');
    }
    for (var i = 0; i < this.length; ++i) {
        hooray.push(this[i]);
    }
    for( var j=0; j < arguments.length ; j++ ){
        for (var i = 0; i < arguments[j].length; ++i) {
            hooray.push(arguments[j][i]);
        }
    }
    hooray.length--;
    return hooray
}

/**
 * Gives you a new hooray made from a union of 2 other hoorays
 * 
 * @param {hooray} item to make an search
 * 
 * @returns {item} returns the item or -1 if doesnt exist
 */
Hooray.prototype.indexOf = function (item) {
	var self = this;
	for (var i = 0; i < self.length; i++) {
		if (item === self[i]) {
			return i;
		}
	}
	return -1
}


Hooray.prototype.lastindexOf = function (item) {
	var self = this;
	for (var i = self.length-1; i >= 0; i--) {
		if (item === self[i]) {
			return i
		}
	}
	return -1
}

/**
 * Modifies your hooray into a modified one with your elements sorted
 * 
 * @param {element} item to make an search
 * 
 */
Hooray.prototype.sort = function () {
	var self = this;
    var temp = 0;

    for (var i = 0; i < self.length; i++) {
        for (var j = 1; j < (self.length - i); j++) {
            if (self[j - 1] > self[j]) {
                temp = self[j - 1];
                self[j - 1] = self[j];
                self[j] = temp;
            }
        }
    }
    return self;
}

/**
 * Verify if an object is a Hooray
 * 
 * @returns true if an object is a hooray
 * 
 */
Hooray.isHooray = function (hooray) {

	if (typeof hooray === 'undefined') throw TypeError(`${hooray} is undefined`);

	return hooray instanceof Hooray;
}

/**
 * add or delete elements of your hooray
 * 
 * @returns returns a new modified hooray 
 * 
 */

Hooray.prototype.splice = function (start, deleteCount) {

    var self = this;

    var result = new Hooray();

    for (var i = 0; i < Math.min(start, self.length); i++) {
    result[result.length++] = self[i];
    }
    for (var i = 2; i < arguments.length; i++) {
    result[result.length++] = arguments[i];
    }
    for (var i = start + deleteCount; i < self.length; i++) {
    result[result.length++] = self[i]
    }
    for (var i = 0; i < self.length; i++) {
    self[i] = result[i];
    }
    return result;
}

/**
 * Iterates a hooray and evaluates an expression on each of its values, returning true if all of them match it. Otherwise returns false.
 * .
 * @param {Function} callback The expression to evalute.
 * 
 * @returns {boolean} True if all values match the expression, otherwise false.
 */
Hooray.prototype.every = function(callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    
    for (var i = 0; i < this.length; i++)
        if (!callback(this[i])) return false;

    return true;
}

/**
 * Gives you a new hooray made of elements that fits in your extression
 * 
 * @param {Expresion} callback The expression to evalute with hooray (involved hooray needs to be in the expression).
 * 
 */
Hooray.prototype.filter = function(callback){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    var hooray2= new Hooray()
    for (var i = 0; i < this.length; i++){
        if(callback(this[i])) hooray2.push(this[i])
    }
    return hooray2;
}

/**
 * modifies your hooray to be inverted
 * 
 * @return {element} a new element made with hooray and callback
 */

Hooray.prototype.reverse = function () {
	if (!(this instanceof Hooray)) throw TypeError(this + ' is not an hooray');

	var newHoo = new Hooray();

	for (var i = 0; i < this.length; i++) {
		newHoo[i] = this[(this.length - 1) - i];
	}

	for (var i = 0; i < this.length; i++) {
		this[i] = newHoo[i];
	}

	return this;
}

/**
 * Gives you an element product of your hooray and a given callback
 * 
 * @param {Expresion} callback The expression to evalute with each element of the hooray
 * @param {Expresion} inicial (OPTIONAL) initial value
 * 
 * @return {element} a new element made with hooray and callback
 */
Hooray.prototype.reduce = function(callback,inicial){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    var redu;
    (typeof inicial === 'undefined')? redu = this[0] : redu = inicial;
    for (var i = 1; i < this.length; i++){
        (typeof inicial === 'undefined')? redu=callback(redu,this[i]) : redu=callback(redu,this[i])
    }
    return redu;
}

/**
 * Gives you an element product of your hooray and a given callback
 * 
 * @param {Expresion} callback The expression to evalute with each element of the hooray
 * @param {Expresion} inicial (OPTIONAL) initial value
 * 
 * @return {element} a new element made with hooray and callback
 */
Hooray.prototype.reduceright = function(callback,inicial){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    var redu;
    (typeof inicial === 'undefined')? redu = this[this.length-1] : redu = inicial;
    for (var i = this.length-2; i > 0; i--){
        (typeof inicial === 'undefined')? redu=callback(redu,this[i]) : redu=callback(redu,this[i])
    }
    return redu;
}

/**
 * Checks if at least one element of the hooray satisfies the callback condition
 * 
 * @param {Expresion} callback The expression to evalute with each element of the hooray
 * 
 * @return {bool} true or false 
 */
Hooray.prototype.some =function (callback) {
    if (!(this instanceof Hooray)) throw TypeError("horray param is not an horray");
    if (!(callback instanceof Function)) throw TypeError("undefined is not a function");

    for (var i = 0; i < this.length; i++) {
        if (callback(this[i], i))  {
            return true;
        }
    }
    return false;
}

/**
 * Gives you a new hooray made of elements that were modified each one by your callback
 * 
 * @param {hooray} hooray The hooray to operate
 * @param {Expresion} callback The expression to evalute with each element of the hooray
 * 
 * @return {hooray} a new hooray made of modified elements
 */
Hooray.prototype.map=function(callback){
	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    var hooray2= new Hooray();
    for (var i = 0; i < this.length; i++){
        hooray2.push(callback(this[i]))
    }
    return hooray2;
}
/**
 * modifies your hooray, takes out the first element and returns it
 * 
 * @param {hooray} hooray The hooray to operate
 * 
 * @return {element} a new element
 */
Hooray.prototype.shift=function(){
    var stack = new Hooray();
    var element = this[0]
    for (var i = 0; i < this.length-1; i++){
        stack.push(this[i+1]);
        this[i]=this[i+1]
    }
    delete(this[this.length-1])  
    this.length--
    return element;
}


/**
 * this method returns a string made with the hooray elements
 * 
 * @param {string} Separator (OPTIONAL) if a string is given here, it will be in the middle of each element as a separator
 * 
 * @return {element} a string
 */
Hooray.prototype.join = function(sep) {
    if (!(this instanceof Hooray)) throw TypeError(this + ' is not an hooray');
    if (typeof sep !== 'String') sep = ",";

    var result = '';
    for (var i = 0; i < this.length; i++) {
        result += this[i];
        if (i < this.length - 1) {
            result += sep;
        }
    }
    return result;
}
