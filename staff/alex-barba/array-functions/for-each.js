/**
 * Abstraction of forEach.
 * 
 * Executes a provided function once for each array element.
 * 
 * @param {Array} array - The array to iterate.
 * @param {Function} callback - The expression to evaluate.
 * 
 * @throws {TypeError} - If array is not an array
 * @throws {TypeError} - If callback is not an functions
 * 
 * @returns {*}
 */
function forEach(array, callback) {
    if (!(array instanceof Array)) throw new TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    for (var i = 0; i < array.length; i++) callback(array[i]);
};