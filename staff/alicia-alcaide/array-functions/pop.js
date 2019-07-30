/**
 * Retrieves the last value of an array, decrementing its length by 1.
 * 
 * @param {Array} array The array to pop the value from.
 * 
 * @returns {*} The value retrievied from the array.
 */

'use strict';

function pop(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    if (array.length) {
        var value = array[array.length - 1];

        array.length--;

        return value;
    }
}