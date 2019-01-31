/**
 * Abstraction of fill.
 * 
 * Fills an array from one position to other.
 * 
 * @param {Array} array 
 * @param {*} value 
 * @param {number} start 
 * @param {number} end 
 * 
 * @throws {Error} - If too many arguments (> 4)
 * @throws {TypeError} - If array is not an array
 */

function fill(array, value, start, end) {
    if (arguments.length > 4) throw Error('too many arguments');

    if (!(array instanceof Array)) throw new TypeError(array + ' is not an array');

    start = start === undefined ? 0 : (start < 0 ? array.length + start : start);
    end = end === undefined ? array.length : (end < 0 ? array.length + end : end);

    for (var i = start; i < end; i++)
        array[i] = value;

    return array;
}