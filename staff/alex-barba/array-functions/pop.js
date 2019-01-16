/**
 * Abstraction of pop.
 * 
 * removes the last element from an array and returns that element. This method changes the length of the array.
 * 
 * @param {Array} arr - The array to remove the last element.
 * 
 * @throws {TypeError} - If array is not an array.
 * @throws {TypeError} - If array is not defined.
 * 
 * @returns {*}
 */
function pop(array) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');

    if (array.length === 0) return undefined
    var last = array[array.length-1]
    array.length = array.length-1
    return last
};