'use strict'
/** Creates a new array with the results of calling a provided function on every element in the calling array.
 * 
 * @param {Array} array The array to iterate
 * @param {function} callback The expression to evaluate.
 * 
 * @returns {newArray} Returns the resulting array.
 */


function map(array, callback) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray[i] = callback(array[i])
    }
    return newArray;
}