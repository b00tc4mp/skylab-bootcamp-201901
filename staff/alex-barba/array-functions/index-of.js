/**
 * Abstraction of indexOf.
 * 
 * Returns the first index at which a given element can be found in the array, or -1 if it is not present.
 * 
 * @param {Value} value
 * @param {Array} array
 * @param {Number} start
 * 
 * @throws {TypeError} - If array is not an array.
 * @throws {TypeError} - If start is not a number
 * 
 * @returns {Number} - The first index of the element in the array; -1 if not found.
 */

function indexOf (value, array, start) {
    if (!(array instanceof Array)) throw new TypeError(array + ' is not an array.')
    if (!(typeof start === 'number' || start !== 'undefined')) throw new TypeError(start + ' is not a number.')

    start = start? start : 0;
    for(var i=start; i<array.length; i++) {
        if (array[i] === value){
            return i;
        }
    }
    return -1;
};