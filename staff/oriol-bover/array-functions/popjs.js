/**
 * Abstraction of pop
 * 
 * Iterates an array and removes the last element from an array and returns that element. This method changes the length of the array.
 * 
 * @param {Array} array - The array to iterate
 * 
 * @returns {any} - returns the element substracted from the array
 */

function pop(array) {
    if (!(array instanceof Array))
        throw new TypeError(array + ' is not an array');

    if(array.length == 0)
        return undefined;

    var value = array[array.length-1];
    array.length = array.length - 1; 

    return value;
}