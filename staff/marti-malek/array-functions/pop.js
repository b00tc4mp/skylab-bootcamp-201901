/**
 * Abstraction of pop.
 * 
 * Removes the last element of an array.
 * 
 * @param {Array} arr 
 * 
 * @returns {Array}
 * 
 * @throws {Error} - If too many arguments
 * @throws {TypeError} - If arr is not an array 
 */

function pop(arr) {
    if (arguments.length > 1) throw Error ('too many arguments');
    if (!(arr instanceof Array)) throw TypeError (arr + 'is not an array')

    var last = arr[arr.length-1];
    arr.length = arr.length-1;
    return last;
};