/**
 * Abstraction of join.
 * 
 * Creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string.
 * 
 * @param {*} array
 * @param {*} separator 
 * 
 * @throws {TypeError} - If array is not an array.
 * 
 * @returns {String}
 */

function join (array, separator) {
    if(!(array instanceof Array)) throw new TypeError (array + ' is not an array');

    var result = '';

    for (let i=0; i<array.length; i++) {
        if(array[i] === null || array[i] === undefined) array[i] = '';
        separator = separator? separator : '';

        result += array[i]
        
        if (i == array.length-1) {
            return result
        }
        result += separator
    }
    return result
};