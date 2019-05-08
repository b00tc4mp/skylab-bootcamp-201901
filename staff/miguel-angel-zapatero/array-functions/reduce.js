'use strict';

/**
 * Executes a reducer function (that you provide) on each member of the array resulting in a single output value.
 * 
 * @param {Array} arr The array to reduce.
 * @param {Function} callback The function provided.
 * @param {[*]} value Optional first value.
 * 
 * @return {*} the single value.
 */

function reduce(arr, callback, value) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    var acc = value || arr[0];
    var index = 0;
    
    if(!value) index = 1;

    for(var i = index; i < arr.length; i++) {
        acc = callback(acc, arr[i])  
    }
    return acc;
}