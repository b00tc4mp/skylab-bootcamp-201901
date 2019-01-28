/**
 * Abstraction of reduce.
 * 
 * The reduce() method reduces an array into one value.
 * 
 * @param {Array} arr 
 * @param {Function} callback
 * @param {Number} accumulator initial value
 * 
 * @throws {TypeError} - If array is not an array
 * @throws {TypeError} - If callback is not a function
 */


function reduce(arr, callback, accumulator) {
    if(!(arr instanceof Array)) throw TypeError (arr + ' is not an array');
    if(!(callback instanceof Function)) throw TypeError (callback + ' is not a function');

    var i = 0;

    if(accumulator === undefined) {
        accumulator = arr[0].price;
        i = 1;
    }

    for(; i<arr.length; i++) {
        var product = arr[i];
        accumulator = callback(accumulator, product);
    }

    return accumulator;
};