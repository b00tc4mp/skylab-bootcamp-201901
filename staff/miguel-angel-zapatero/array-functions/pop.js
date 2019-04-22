'use strict';

/**
 * Removes the last element and return it.
 * 
 * @param {Array} arr The array to removes the last element 
 */
function pop(arr) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');

    if (arr.length) {
        var result = arr[arr.length - 1];

        arr.length--;

        return result;
    }
}