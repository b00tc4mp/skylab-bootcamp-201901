/**
 * Abstraction of filter.
 * 
 * The filter() method creates a new array filled with all array elements that pass a test.
 * 
 * @param {Array} arr 
 * @param {Function} callback
 * @param {Number} accumulator
 * 
 * @throws {TypeError} - If array is not an array
 * @throws {TypeError} - If callback is not a function
 */


function filter(arr, callback) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

     var result = [];

     for (var i = 0; i < arr.length; i++) {
        if(callback(arr[i])) {
            result[result.length] = arr[i];
        }
    }
    return result;
};