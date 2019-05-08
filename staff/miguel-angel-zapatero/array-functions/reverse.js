'use strict';

/**
 * Iterate an array and change the order, the first array's element becomes the last and the last array's element becomes the first.
 * 
 * @param {Array} arr The array to iterate. 
 * 
 * @returns {Array} The new array.
 */

function reverse(arr) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');

    var newArr = [];
    
    for(var i = 0; i < arr.length; i++) {
        newArr[i] = arr[(arr.length-1) - i];
    }
    
    for(var i = 0; i < arr.length; i++) {
        arr[i] = newArr[i];
    }
    
    return arr;
}