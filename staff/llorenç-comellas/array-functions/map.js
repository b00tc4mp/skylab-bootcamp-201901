'use strict';

/**
 *  creates a new array with the results of calling a provided function on every element in the calling array
 * 
 * @param {Array} array 
 * @param {Callback} callback 
 */

function map(array, callback) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray[i] = callback(array[i]);
    }
    return newArray;

}