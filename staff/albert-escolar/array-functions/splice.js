'use strict'

/**
 * Changes the contents of an array by removing or replacing existing elements and/or adding new elements
 * 
 * @param {array} array  The array to iterate
 * @param {number} startIndex The index from where to start the iteration
 * 
 * @returns {erasedArray} Returns the removed elements of the array.
 */

function splice(array, startIndex) {
    var erasedArray = [];
    if (startIndex < 0) {
        var index = array.length + startIndex; // Aqui se suma porque startIndex es negativo.
    } else {
        var index = startIndex
    }
    for (var i = index; i < array.length; i++) {
        erasedArray[erasedArray.length] = array[i];
    }
    array.length = index;
    return erasedArray;

}