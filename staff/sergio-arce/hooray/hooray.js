'use strict';

/**
 * 
 */

function Hooray() {
    if (arguments.length === 1 && typeof arguments[0] === 'number') {
        this.length = arguments[0];
    } else {
        for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
        this.length = arguments.length;
    }
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




/**
* Adds a value at the end of an hooray, incrementing its length by 1.
*
* @param {*} value The value to push in the hooray.
*
* @returns {number} The length of the hooray after adding the new value.
*/
Hooray.prototype.push = function (value) {
    if (arguments.length > 0)
        for (var i = 0; i < arguments.length; i++)
            this[this.length++] = arguments[i];

    return this.length;
}


/**
 * Retrieves the last value of an array, decrementing its length by 1.
 *
 * @param {Array} array The array to pop the value from.
 *
 * @returns {*} The value retrievied from the array.
 */
Hooray.prototype.pop = function () {

    var self = this;
    if (this.length) {
		var value = self[self.length - 1];
		delete(self[self.length - 1]);

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