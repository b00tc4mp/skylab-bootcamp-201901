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
Hooray.prototype.forEach = function(callback) {
	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var self = this;

	this.length && (function forEach(index) {
		callback(self[index], index);

		if (++index < self.length)
			forEach(index);
	})(0);
}