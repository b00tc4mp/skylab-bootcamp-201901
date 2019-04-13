'use strict';

/**Returns a shallow copy of a portion of an array into a new array object 
 * selected from begin to end (end not included).
 * The original array will not be modified.
 * 
 * @param {array} array The array to iterate
 * @param {number} startIndex The index from where to start the iteration
 * @param {number} endIndex The index from where the iteration has to stop
 * 
 * @returns {newArray} Returns the result in a new array.
 */

function slice(array, startIndex, endIndex) {
    var newArray = [];
    
    if (!(endIndex)) {
        endIndex = array.length;
    }
    if (startIndex > array.length) {
        return newArray;
    }
    for (var i = startIndex; i < endIndex; i++) {
        newArray[newArray.length] = array[i];

    }
    return newArray;
}