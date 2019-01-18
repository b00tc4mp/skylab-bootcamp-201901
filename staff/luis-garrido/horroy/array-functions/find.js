/**
 * Abstraction of find.
 * 
 * Returns the value of the first element in the array that satisfies the provided testing function.
 * Otherwise undefined is returned.
 * 
 * @param {Array} arr 
 * @param {*} value 
 * @param {function} callback 
 *  * 
 * @throws {Error} - If too many arguments (> 2)
 * @throws {TypeError} - If array is not an array
 * 
 * @return {*} value
 * 
 */

function find(arr, callback) {
    if (!(arr instanceof Array))
        throw new TypeError(arr + ' is not an array');
    if (!(callback instanceof Function))
        throw new TypeError(callback + ' is not a function');

    for (var i = 0 ; i<arr.length ; i++) {
        if (callback(arr[i])) return arr[i];
    }
}