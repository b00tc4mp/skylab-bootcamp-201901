/**
 * 
 * Abstraction of push.
 * 
 * Add an element/s to an array
 * 
 * @param {Array} arr 
 * @param {*} elem
 * 
 * @throws {TypeError} - If array is not an array
 * 
 * @returns {Number} - The new length property of the object upon which the method was called
 */

function push (arr, elem){

    if (!(arr instanceof Array))
        throw new TypeError(arr + ' is not an array');

    for (let i= 1; i<arguments.length; i++)

    arr[arr.length]=arguments[i]

    return arr
}