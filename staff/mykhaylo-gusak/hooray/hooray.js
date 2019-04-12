'use strict';

/**
 * 
 */
function Hooray() {
    for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
	this.length = arguments.length;
	





}

/**
 * Iterates the current hooray and evaluates an expression on each of its values.
 * 
 * @param {Function} callback The expression to evaluate.
 */

// forEach
Hooray.prototype.forEach = function(callback) {
	
	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var self = this;

	this.length && (function forEach(index) {
		callback(self[index], index);

		if (++index < self.length)
			forEach(index);
	})(0);
};

// Concat
Hooray.prototype.concat = function (horray1, horray2) {

	if (!(horray1 instanceof Hooray)) throw TypeError(horray1 + ' is not an Hooray.');
	if (!(horray2 instanceof Hooray)) throw TypeError(horray2 + ' is not an Hooray.');
  
	var newHooray = [];
	
	for (var i = 0; i < horray1.length; i++) {
	  newHooray[i] = horray1[i];
	}
	
	for (var j = 0; j < horray2.length; j++) {
	  newHooray[horray1.length + j] = horray2[j]
	}
	
	return newHooray;
  }


