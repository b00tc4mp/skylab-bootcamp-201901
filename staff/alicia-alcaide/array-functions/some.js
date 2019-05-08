/**
 * Tests whether at least one element in the array passes the test implemented by the provided function.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callback Function to test for each element
 * 
 * @returns {boolean} True if the callback function returns a truthy value for any array element; otherwise, false.
 */

'use strict';

function some(array, callback) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');

    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array))  {
            return true;
        }
    }
    return false;
} 