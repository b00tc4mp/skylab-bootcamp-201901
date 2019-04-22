'use strict';

/**
 * Method returns the first index at which a given element can be found in the array, or -1 if it is not present.
 * @param {Array} array array to iterate
 * @param {any} searchElement Element to locate in the array.
 */
function indexOf(array,searchElement){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    for(var i =0; i < array.length; i++){
        if(array[i] === searchElement){
            return i;
        }
          
    }
    return -1;
}

