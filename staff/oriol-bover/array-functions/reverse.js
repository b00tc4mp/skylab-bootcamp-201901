
/**
 * Abstractioin of reverse
 * 
 * Iterates an array and reverse it. he first array element becomes the last, and the last array element becomes the first.
 * 
 * @param {Array} array 
 * 
 * @returns {Array} - The array reversed
 */


function reverse(array){
    if (!(array instanceof Array))
        throw new TypeError(array + ' is not an array');

    var array2 = Object.assign([], array);

    for (let i = 0; i < array.length; i++) {
        array[i] = array2[array.length-1-i];
    }
    
    return array;
}