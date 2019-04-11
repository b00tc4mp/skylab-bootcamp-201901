/**
 * Returns the last index at which a given element can be found in the array, or -1 if it is not present. 
 * The array is searched backwards, starting at fromIndex.
 * 
 * @param {array} array         The array to iterate.
 * @param {*} searchElement     The element to search in the array
 * @param {[number]} fromIndex  The index at which to start searching backwards. 
 * 
 * @returns {number} - The last index of the element in the array; -1 if not found.
 * 
 */

'use strict';

function lastIndexOf(array, searchElement, fromIndex) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    var indexStart = 0;

    if (arguments.length === 2 || fromIndex >= array.length) {
        indexStart = array.length - 1;
    } else {
        if (fromIndex < 0) {
            indexStart = array.length + (fromIndex);

        } else {
            indexStart = fromIndex; 
        }
    }


    for (var i = indexStart; i >= 0; i--) {
        if (array[i] === searchElement) {
            return i;
        }
    }

    return -1;
}
