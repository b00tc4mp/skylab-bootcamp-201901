'use strict';
/**
 *  method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
 * 
 * @param {Array} Arrays and/or values to concatenate into a new array. If valueN is undefined, concat returns a shallow copy of the existing array on which it is called. See the description below for more details.
 *  
 * @returns {Array} The reversed array.
 */
function reverse(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    var index = 0
    let reverseArray = []
    for (let i = array.length - 1; i >= 0; i--) {
        reverseArray[index] = array[i]
        index++
    }
    return reverseArray
}
