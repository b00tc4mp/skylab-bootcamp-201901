'use strict';

/**
 * executes a reducer function (that you provide) on each member of the array resulting in a single output value.
 * @param {Array} array array to iterate
 * @param {Function} callback Function to execute on each element in the array,
 * @param {Number} initialValue Value to use as the first argument to the first call of the callback
 */
function reduce(array, callback, initialValue) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');
    var acc = array[0];
    if (initialValue) {
        acc = initialValue;
        var a = 0;
    }else{
        a = 1;
    }
    for (var i = a; i < array.length; i++) {
        acc = callback(acc, array[i]);

    } return acc;
};




