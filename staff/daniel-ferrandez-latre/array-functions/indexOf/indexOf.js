'use strict';
/**
 * Return a new array with the filtered results
 * 
 * @param {Array} array The array to iterate.
 * 
 * @param {element} element Element to get the index.
 * 
 * 
 *  @param {index} Index Optional parameter, that you can star from that position of the array
 * 
 */

function indexOf(array, element, index) {
    if(arguments.length === 0) {
        throw TypeError(' no arguments are passed.');
    } else if(!(arguments[0] instanceof Array)) {
        throw TypeError(array + ' first arguments is not an array');
    } else if (arguments.length > 2 && isNaN(arguments[2])){
        throw new TypeError(index + ' is not a number');
    }

    var starIndex = 0;
    if(index >= array.length) {
        return -1;
    } else {
        if(typeof index == 'undefined' ){
            starIndex = 0;
        } else {
            starIndex = index;
        }
    }
    for(var i = starIndex; i < array.length; i++) {
        if(array[i] === element) {
            return i;
        }
    }
    return -1;
}