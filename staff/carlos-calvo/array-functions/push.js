/**
 * 
 * @param {Array} array 
 * @param {Object} element 
 * 
 * 
 * return the array with the added element
 */

function push(array, element){
    if(!(array instanceof Array)) throw new Error('First parameter must be an array')

    array[array.length] = element;

}
