/**
 * returns the index of the first element in the array that satisfies the provided testing function. 
 * Otherwise, it returns -1, indicating no element passed the test.
 * 
 * @param {Array}    array    - The array to filter
 * @param {Function} callback - The expression to evaluate.
 * 
 * @returns {number} - An index in the array if an element passes the test; otherwise, -1.
 */
'use strict';

function findIndex(array, callback) {

	for (var i = 0; i < array.length; i++) {
        if(callback(array[i])) return i;
    }
    return -1;
}