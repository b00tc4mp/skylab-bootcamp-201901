/**
 * Abstraction of pop.
 * 
 * Removes the last element in an array and returns it.
 * 
 * @param {array} array  
 * 
 * @throws {TypeError} - If array is not an array
 */

function pop(array) {
    if (!(array instanceof Array)) throw new TypeError(array + ' is not an array');

    var poppedValue = array[array.length - 1]
    array.length = array.length -1;

    return poppedValue;
};