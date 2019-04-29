'use strict';
/**
 * Itarate an array and evaluate an expression on each of its values, returning true if one of them match it, otherwise false.
 * 
 * @param {Array} arr the array to iterate.
 * @param {Function} callback the expression to evaluate.
 * 
 * @returns {boolean} True if one of the values match it, otherwise false.
 */
function some(arr, callback) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');
    // if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');
    // Otra manera de obterner el mismo resultado¿?¿?
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    if(!arr.length) return false;
    
    for(var i = 0; i < arr.length; i++) {
        if(callback(arr[i])) return true;
    }
    return false;
}