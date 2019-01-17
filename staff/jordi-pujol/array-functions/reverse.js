/**
 * Abstraction of reverse
 * 
 * Reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
 * 
 * @param {Array} arr
 * 
 * @returns {Array} a reference to the array.
 */

function reverse (arr){

    if (arguments.length > 1) throw TypeError ('There should be just one parameter (array)')
    if (!(arr instanceof Array)) throw TypeError (arr + ' should be an array')

    var rev;

    for (var i=0; i< (arr.length/2); i++){
        rev = arr[i]
        arr[i] = arr[arr.length-1-i]
        arr[arr.length-1-i] = rev
    }
    return arr
}