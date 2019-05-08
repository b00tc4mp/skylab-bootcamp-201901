/**
 * Adds a value at the end of an array, icrementing it
 * 
 * @param {Array} array The array to push the value in.-
 * @param {any}value The value to push in the array.
 * 
 * @returns {array.length} returns the new length of the array.
 */
function push(array, value){
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');

    array[array.length]= value;

    return array.length;
}