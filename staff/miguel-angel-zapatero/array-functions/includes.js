'use strict';

/**
 * Iterate an array to find the value into the array, returning true if match it, otherwise false.
 * 
 * @param {Array} arr The array to iterate. 
 * @param {*} value The value to find
 * 
 * @returns {boolean} True if the value is matched, otherwise false.
 */
function includes(arr, value) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');
    
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] === value) return true;
    }
    return false;
}