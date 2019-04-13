'use strict';

/**
 * method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), 
 * separated by commas or a specified separator string. If the array has only one item, then that item will be 
 * returned without using the separator.
 * 
 * @param {Array} array array to iterate
 * @param {string} separator Specifies a string to separate each pair of adjacent elements of the array
 * 
 * @returns {string} 
 */
function join(array, separator) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var results = '';
    for (var i = 0; i < array.length; i++) {
        results += array[i];
        if (i < array.length - 1) {
            results += separator;
        }
    }
    return results;
}


