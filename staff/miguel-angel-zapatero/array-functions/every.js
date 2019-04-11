'use strict';

/**
 * Iterate an array and evaluate an expression on each of its values, returning true if all of them match it, otherwise false.
 * 
 * @param {Array} arr The array to iterate.
 * @param {Function} callback The expression to evaluate.
 * 
 * @returns {boolean} True if all values macth the expression, otherwise false.
 */

function every(arr, callback) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for(var i = 0; i < arr.length; i++) {
        if(!callback(arr[i])) return false;
    }
    return true;
}