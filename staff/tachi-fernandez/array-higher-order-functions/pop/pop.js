/**
 * Abstraction of pop.
 * 
 * Pop delete at last element of array
 * 
 * @param {Array} array 
 * @throws {Error} - If too many arguments (> 2)
 * @throws {TypeError} - If array is not an array
 */


function pop(array) {

    if (!(array instanceof Array)) throw new typeError("array in not an array")
    if (arguments.length > 1) throw Error('too many arguments');

    var lastNum = array[array.length - 1]
    array.length = array.length -1
    return lastNum
}
