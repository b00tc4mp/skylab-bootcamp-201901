'use strict';

/**
 * creates a new array with the results of calling a provided function on every element in the calling array.
 * 
 * @param {Array} arr The array to iterate.
 * @param {Function} callback The function to be provided.
 * 
 * @returns {Array} The results of the provided function results.
 */

function map(arr, callback) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    var newArr = []
    for(var i = 0; i < arr.length; i++) {
        newArr[i] = callback(arr[i]);
    }
    return newArr;
}