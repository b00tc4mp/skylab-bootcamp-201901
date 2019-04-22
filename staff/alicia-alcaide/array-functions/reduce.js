/**
 * executes a reducer function on each member of the array resulting in a single output value.
 * 
 * @param {Array} array  The array to iterate
 * @param {Function} callbackfn  Function to execute on each element in the array
 * @param {[*]} initialValue  Value to use as the first argument to the first call of the callback. If no initial value is supplied, the first element in the array will be used. 
 * 
 * 
 * @returns {*} The value that results from the reduction.
 */

'use strict';

 function reduce (array, callback, initialValue) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');

    var start = 0;
    var accumulator = 0;
    if (arguments > 2) {
        accumulator = initialValue
    } else {
        start = 1;
        accumulator = array[0];
    }

    for (var i=start; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
} 