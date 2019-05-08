'use strict'
/**
 * Returns the last index at which a given element can be found in the array, or -1 if it is not present.
 *  The array is searched backwards, starting at fromIndex.
 * @param {number} elementSearched The element to be searched in the array.
 * @param {array} array The array to iterate
 * 
 * @returns {i} Returns the index of the element searched for if found.
 * @return {-1} Returns -1 if the element is not found in the array.
 */

function lastIndexOf(elementSearched, array) {
    if(!(array instanceof Array))throw(array+' is not an array');
    for (var i = array.length; i >= 0; i--) {
        if (elementSearched === array[i]) {
            return i;
        }
    } return -1
}

