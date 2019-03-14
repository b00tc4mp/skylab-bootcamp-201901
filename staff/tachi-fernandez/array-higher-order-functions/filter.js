/**
 * Abstraction of filter
 * 
 * The filter() method creates a new array with all elements 
 * that pass the test implemented by the provided function.
 * 
 * @param {Array} array - Array to filter
 * @param {Function} callback - function to satisfy to filter
 * 
 * @throws {TypeError} - when array is not an array
 * @throws {TypeError} - when callback is not a function
 * 
 * @return {Array} - new array with filtered results
 */

function filter(array, callback) {

    if (!(array instanceof Array)) throw TypeError(array + ' should be an array');
    if (!(callback instanceof Function)) throw TypeError(callback + ' should be a function ')

    var res = []

    for (var i = 0; i < array.length; i++) {
        var value = array[i];
        if (callback(value)) res[res.length] = value
    }

    return res
}