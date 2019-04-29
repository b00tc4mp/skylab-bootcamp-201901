'use strict';

/**
 * changes the contents of an array by removing or replacing existing elements and/or adding new elements 
 * @param {Array} array array to iterate
 * @param {Number} startIndex index at which to start changing the array
 */


function splice(array, startIndex) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    var newArray = [];
    if (startIndex < 0){ 
        var index = array.length + startIndex; // Aqui se suma porque startIndex es negativo.
    } else {
        var index = startIndex;
    }
    for (var i = index ; i < array.length; i++) {
        newArray[newArray.length] = array[i];
    }
    array.length = index;
    return newArray;

}


