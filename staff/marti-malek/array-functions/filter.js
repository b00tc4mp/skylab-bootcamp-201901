/**
 * 
 * Abstraction of filter.
 * 
 * Returns the elements of an array that are validated througha function.
 * 
 * @param {Array} arr 
 * @param {Function} func 
 * 
 * @returns {Array}
 * 
 * @throws {Error} - If too many arguments
 * @throws {TypeError} - If arr is not an array
 */

function filter(arr, func) {
    var res = [];

    if (arguments.length > 2) throw Error ('too many arguments');
    if (!(arr instanceof Array)) throw TypeError (arr + 'is not an array')

    for (var i = 0; i < arr.length; i++) {
        if (func(arr[i])) {
            res[res.length] = arr[i]
        }
    }
    return res;
};