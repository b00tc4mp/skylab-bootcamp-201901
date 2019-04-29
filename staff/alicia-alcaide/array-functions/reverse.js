/**
 * Modifies the array with all elements in reverse order
 * 
 * @param {Array} array Arrays and/or values to concatenate into a new array.
 * 
 * @returns {Array} A new Array instance with all elements in reverse order
*/

'use strict';

function reverse(array) {

    var newArray = [];
    var j = 0;

    for (var i=array.length; i >= 0 ; i--) {
        newArray[j] = array[i];
        j++;
    }
    return newArray;
}