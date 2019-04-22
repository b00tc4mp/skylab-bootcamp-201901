/**
 * Removes the first element from an array and returns that removed element. 
 * This method changes the length of the array.
 * 
 * @param {Array} array    the array which have to remove the first element
 * 
 * @returns {*} The element removed
*/

'use strict';

function shift(array) {

    var firstItem = array[0];

    for (var i=1; i < array.length; i++) {
        array[i-1] = array[i];
    }
    array.length = array.length - 1;

    return firstItem;
    
}
