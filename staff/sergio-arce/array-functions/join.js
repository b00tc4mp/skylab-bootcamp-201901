/**
 *joins all the elements of a matrix (or an object similar to an array)
 * in a string and returns this string.
 * 
 * @param {Array} arr - The array to join
 * @param {String} sep - The separator
 * 
 * @returns {String} - creates and returns a new string by 
 * concatenating all of the elements in an array, separated 
 * by commas or a specified separator string.
 */

function join(arr, sep) {
    if (!(arr instanceof Array)) throw TypeError(`${arr} is not an array`);

    var result = '';
    if (sep === undefined) {
        sep = ',';
    }
    for (let i = 0; i < arr.length; i++) {
        if (i !== arr.length-1) { 
             result = result + arr[i] + sep;
        } else {
            result = result + arr[i];
        }
    }
    return result;
 }
 