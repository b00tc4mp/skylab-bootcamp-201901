'use strict';
/**
 * Iterates an array and sort all elements within it.
 * 
 * @param {Array} array The array to iterate.
 * 
 * 
 */
function sort(array) {
    if(arguments.length === 0) {
        throw TypeError(undefined + ' is not an array.');
    } else if(!(arguments[0] instanceof Array)) {
        throw new TypeError(array + ' is not an array.');
    }
    var auxValue = 0;
    for(var i = 0; i < array.length; i++) {
        for(var j = 1; j < array.length; j++) {
            if(array[j - 1] > array[j] ) {
                auxValue = array[j - 1];
                array[j - 1] = array[j];
                array[j] = auxValue;
            }
        }
    }
}