/**
 * 
 * Abstraction of indexOf.
 * 
 * Returns the first position in the array where the searched item is found.
 * 
 * @param {Array} arr 
 * @param {*} value 
 * @param {Number} start
 * 
 * @returns {Number}
 * 
 * @throws {Error} - If too many arguments
 * @throws {TypeError} - If arr is not an array
 */

function indexOf(arr, value, start) {
    if (arguments.length > 3) throw Error ('too many arguments')
    if (!(arr instanceof Array)) throw new TypeError(arr + ' is not an array');
    start = start? start : 0;
    for (var i = start; i < arr.length; i++) {
        if (arr[i] === value) {
            return i;
        }
    }
    return -1;
};