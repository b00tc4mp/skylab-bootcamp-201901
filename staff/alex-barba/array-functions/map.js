/**
 * Abstraction of map.
 * 
 * Iterates an array evaluating an expression on each of its values. 
 * The result is located and returned in a new array.
 * 
 * @param {Array} array - The array to map.
 * @param {Function} callback - The expression to evaluate.
 * 
 * @throws {TypeError} - If array is not an array.
 * @throws {TypeError} - If callback is not an function.
 * 
 * @returns {Array} - A new array with the resulting values.
 */
function map(array, callback) {

    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (!(callback instanceof Function)) throw TypeError (callback + ' is not a function');

    var res = [];

    for (var i = 0; i < array.length; i++) res[i] = callback(array[i]);

    return res;
};