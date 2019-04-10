/**
 * Addsa value at the end of an array, icrementing
 * 
 * @param {Array} array The array to push the value in.-
 * @param {*} value The value to push in the array.
 * 
 * @returns {NUMBER} 
 */
function push(array, value){
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');

    array[array.length]= value;

    return array.length;
}