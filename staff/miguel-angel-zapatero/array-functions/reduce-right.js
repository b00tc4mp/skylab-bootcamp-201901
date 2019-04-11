'use strict';

/**
 * Executes a reducer function (that you provide) on each member of the array resulting in a single output value from right to left.
 * 
 * @param {Array} arr The array to reduce.
 * @param {Function} callback the fucntion provided
 * @param {[*]} value Optional first value
 */

function reduceRight(arr, callback, value) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');
    
    var acc = value || arr[arr.length - 1];
    var index = arr.length - 2;
    
    if(value) index = arr.length - 1;

    for(var i = index; i >= 0; i--) {
        acc = callback(acc, arr[i]); 
    }
    return acc;
}