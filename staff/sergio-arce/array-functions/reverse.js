/**
 * The first array element becomes the last, and the last array element becomes the first.
 * 
 * @param {Array} array The array to iterate.
 *@param {Array} array reverse
 */

function reverse(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr[arr.length - ( i+1 ) ] = arr[i];
    }
    return newArr;
}