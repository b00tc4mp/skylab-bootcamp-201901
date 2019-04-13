'use strict';

/**
 * method returns the last index at which a given element can be found in the array, or -1 if it is not present. 
 * The array is searched backwards,
 * @param {Array} array array to iterate
 * @param {any} searchElement Element to locate in the array.
 */

function lastIndexOf(array,searchElement){
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    for (var i = array.length; i>= 0;i--){
        if(searchElement === array[i]){
            return i;
        }

    }
    return -1;
}

