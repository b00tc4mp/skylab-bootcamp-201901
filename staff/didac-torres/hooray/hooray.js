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
 * Retrieves the last value of an horray, decrementing its length by 1.
 *
 * @param {horray} horray The horray to pop the value from.
 *
 * @returns {*} The value retrievied from the horray.
 */
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