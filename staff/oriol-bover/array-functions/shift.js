/**
 * Abstraction of shift
 * 
 * Iterate an array and removes the first element from an array and returns that removed element. 
 * This method changes the length of the array.
 * 
 * @param {Array} array 
 * 
 * @returns {*} - The removed element from the array; undefined if the array is empty.
 */

function shift(array){
    if(!(array instanceof Array)) throw TypeError('the array isn\'t an Array');

    var res = array[0];
    var array2 = Object.assign([], array);

    for (var i = 0; i < array.length-1; i++) {
        array[i] = array2[i+1];
    }

    array.length = array.length-1;
    return res;

}