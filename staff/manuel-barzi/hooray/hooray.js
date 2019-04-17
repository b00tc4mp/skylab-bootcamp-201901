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

    // var self = this;

    // this.length && (function forEach(index) {
    //     callback(self[index], index);

    //     if (++index < self.length)
    //         forEach(index);
    // })(0);

    // OR alternative with binding

    var forEach;

    this.length && (forEach = function(index) {
        callback(this[index], index);

        if (++index < this.length)
            forEach(index);
    }.bind(this))(0);
}