/**
 * applies a function against an accumulator and each value of the array
 *  (from right-to-left) to reduce it to a single value.
 * 
 * @param {Array} array  The array to iterate
 * @param {Function} callbackfn  Function to execute on each element in the array
 * @param {[*]} initialValue  Value to use as the first argument to the first call of the callback. If no initial value is supplied, the first element in the array will be used. 
 * 
 * 
 * @returns {*} The value that results from the reduction.
 */

'use strict';

function reduceRight (array, callback, initialValue) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');

    var start = array.length - 1;
    var accumulator;
    if (arguments > 2) {
        accumulator = initialValue
    } else {
        accumulator = array[start];
        start = start - 1;    
    }
    
    for (var k=start; k >= 0; k--) {
        accumulator = callback(accumulator, array[k], k, array);
    }
    return accumulator;
} 