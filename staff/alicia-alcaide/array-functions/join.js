/**
 * Concatenate all elements  in a string separated by the separator
 * 
 * @param {Array}  array 
 * @param {string} separator Optional. Inserted between each element. Default: empty
 * 
 * @returns {string} All elements concatenated with the separator between
 */

'use strict';

function join(array, separator) {

    var result = '';

    if (arguments.length === 1) {
        separator = ','; 
    }

    for (var i=0; i < array.length; i++) {
        if (result === '') {
            result = array[i]
        }
        else {
            result = result + separator + array[i]
        }
    }
    
    return result;
    
}