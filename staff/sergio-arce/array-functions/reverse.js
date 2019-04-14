/**
 * The first array element becomes the last, and the last array element becomes the first.
 * 
 *  @param {Array} arr The array to iterate.
 *  @returns {Array} array reverse
 * 
 * 
 */

function reverse(arr) {
    
    if (!(arr instanceof Array)) throw TypeError(`${arr} is not an array`)
     
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr[arr.length - ( i+1 ) ] = arr[i];
    }
    return newArr;
}