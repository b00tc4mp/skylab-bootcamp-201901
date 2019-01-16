/**
 * Abstracting of reverse
 * 
 * The reverse() method reverses an array in place. 
 * The first array element becomes the last, and 
 * the last array element becomes the first.
 * 
 * @param {Array} array - the array to reverse it
 * 
 * @returns {Array} - the array reversed
 */

 function reverse(array){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an Array');

    var end = array.length - 1;
    for (var i = 0; i < Math.floor(array.length / 2); i++) {
        var safe = array[i];
        array[i] = array[end];
        array[end] = safe;
        end--;
    }
    return array;
 }