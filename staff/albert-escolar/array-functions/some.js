'use strict'
/**
 * Tests whether at least one element in the array passes the test implemented by the provided function.
 * @param {array} array The array to iterate
 * @param {function} callback The expression to evaluate
 * 
 * @returns {result} Returns true if the test passes or false if it fails.
 */

function some(array, callback) {
    if(!(array instanceof Array)) throw TypeError(array+' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback +' is not a function');
    var result = false;
    for (var i = 0; i < array.length - 1; i++) {
        if (callback(array[i])) {
            result = true;

        }
    }
    return result;
}