'use strict';

function Hooray() {
	if (arguments.length === 1 && typeof arguments[0] === 'number') {
		this.length = arguments[0];
	} else {
		for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
		this.length = arguments.length;
	}
}

Hooray.isHooray = function (hooray) {

	if (typeof hooray === 'undefined') throw TypeError(`${hooray} is undefined`);

	return hooray instanceof Hooray;
}

Hooray.prototype.push = function (value) {
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

Hooray.prototype.pop = function () {

	var self = this;
	if (this.length) {
		var value = self[self.length - 1];
		delete (self[self.length - 1]);

		self.length--;

		return value;
	}
}

Hooray.prototype.indexOf = function (item) {
	var pos = 0;
	var self = this;
	for (var i = 0; i < self.length; i++) {
		if (item === self[i]) {
			return pos = i;
		}
	}
	return -1
}

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

Hooray.prototype.concat = function () {
	for (var i = 0; i < arguments.length; i++) {
		if (!(arguments[i] instanceof Hooray)) throw TypeError(arguments[i] + ' is not an hooray');
	}
	for (var j = 0; j < arguments.length; j++) {
		for (var i = 0; i < arguments[j].length; ++i) {
			this.push(arguments[j][i]);
		}
	}
	this.length--;
}

Hooray.prototype.reverse = function () {
	if (!(this instanceof Hooray)) throw TypeError(this + ' is not an horray');

	var newHoo = new Hooray();

	for (var i = 0; i < this.length; i++) {
		newHoo[i] = this[(this.length - 1) - i];
	}

	for (var i = 0; i < this.length; i++) {
		this[i] = newHoo[i];
	}

	return this;
}
Hooray.prototype.every = function (callback) {
	if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');

	for (var i = 0; i < this.length; i++)
		if (!callback(this[i])) return false;

	return true;
}

Hooray.prototype.filter = function (callback) {
	if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');
	var hooray2 = new Hooray()
	for (var i = 0; i < this.length; i++) {
		if (callback(this[i])) hooray2.push(this[i])
	}
	return hooray2;
}

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
Hooray.prototype.reduce = function(callback,inicial){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    var redu;
    (typeof inicial === 'undefined')? redu = this[0] : redu = inicial;
    for (var i = 1; i < this.length; i++){
        (typeof inicial === 'undefined')? redu=callback(redu,this[i]) : redu=callback(redu,this[i])
    }
    return redu;
}
Hooray.prototype.reduceright = function(callback,inicial){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    var redu;
    (typeof inicial === 'undefined')? redu = this[this.length-1] : redu = inicial;
    for (var i = this.length-2; i > 0; i--){
        (typeof inicial === 'undefined')? redu=callback(redu,this[i]) : redu=callback(redu,this[i])
    }
    return redu;
}
Hooray.prototype.slice = function(start,stop){
    if(!(this instanceof Hooray)) throw TypeError(this + ' is not an hooray');
	if(typeof start !== 'number' && start !== undefined) throw TypeError(start + ' is not a number');
	if(typeof stop !== 'number' && stop !== undefined) throw TypeError(stop + ' is not a number');

	var nHoor = new Hooray();

	if (start === undefined) start = 0;
	if (stop === undefined || stop > this.lenght) stop = this.length;
	if (start < 0) start = this.length + start;
	if (stop < 0) stop = this.length + stop;
	if(start > this.length) return nHoor;
	for (var i = start; i < stop; i++) {
		nHoor[nHoor.length++] = this[i];
	}
	return nHoor;
}

