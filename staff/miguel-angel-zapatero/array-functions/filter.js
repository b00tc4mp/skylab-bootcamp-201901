'use strict';

/**
 * Iterate an array and evaluate an expression on each of its values, returning a new array with the values that match it.
 * 
 * @param {Array} arr The array to iterate.
 * @param {Function} callback The expression to evaluate.
 * 
 * @returns {Array} The new array.
 */
function filter(arr, callback) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    var result = [];
    var j = 0;
    for(var i = 0; i < arr.length; i++) {
        if(callback(arr[i])) {
            result[j] = arr[i];
            j++; 
        }
    }
    return result;
}