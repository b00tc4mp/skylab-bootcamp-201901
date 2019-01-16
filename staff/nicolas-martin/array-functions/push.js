/**
 * 
 * @param {Array} array 
 * @param {*} element 
 * 
 * @returns {number} - the new length of the array
 */

function push(array, element) {
    assert(array instanceof Array, array + ' is not an array');
    array[array.length] = element;
    return array.length;
}