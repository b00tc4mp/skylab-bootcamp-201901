/**
 * Abstraction of for-each.
 * 
 * Iterates an array evaluating and expression on each of its values.
 * 
 * @param {Array} array - The array to iterate.
 * @param {Function} callback - The expression to evaluate.
 */
function forEach(array, callback) {
    if (!(array instanceof Array))
        throw new TypeError(array + ' is not an array');

    // if (!(callback instanceof Function))
    if (typeof callback !== 'function')
        throw new TypeError(callback + ' is not a function');

    for (var i = 0; i < array.length; i++) callback(array[i]);
}


