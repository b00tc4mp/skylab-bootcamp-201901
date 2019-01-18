/**
 * Removes the last element from an array and returns that element
 *  
 * @param {Array} array 
 * @param {*} element 
 * 
 * @returns {number} - the new length of the array or undefined if the array is empty
 */

function pop(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');  
    if (arguments.length > 1) throw Error('too many arguments');
    var lastElement = array[array.length-1];
    array.length = array.length - 1;
    return lastElement;
}

