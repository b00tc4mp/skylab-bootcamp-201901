/**
 * 
 * Abstraction of push.
 * 
 * Add an element/s to an array
 * 
 * 
 * @param {Array} arr 
 * @param {*} elem
 * 
 * @throws {TypeError} - If array is not an array
 */

function push (arr, elem){

    if (!(arr instanceof Array))
        throw new TypeError(arr + ' is not an array');

    for (let i= 1; i<arguments.length; i++)

    arr[arr.length]=arguments[i]

    return arr
}