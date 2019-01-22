/**
 * Abstraction of reduce.
 * 
 * Reduces an array into a value.
 * 
 * @param {Array} array - The array to operate on.
 * @param {Function} callback - The expression to evaluate.
 * @param {*} accumulator - The accumulator of the reduction value.
 * 
 * @returns {*} - The reduction value.
 */

function reduce(array, callback, accumulator) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (!(callback instanceof Function)) throw TypeError(callback + ' is not an function');

    var i = 0;

    if (accumulator === undefined) {
        accumulator = array[0];

        i = 1;
    }

    for (; i < array.length; i++) {
        var item = array[i];

        accumulator = callback(accumulator, item);
    }
    return accumulator;
};