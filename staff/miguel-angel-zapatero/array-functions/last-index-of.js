'use strict';

/**
 * Returns the last index at which a given element can be found in the array, or -1 if it is not present.
 * 
 * @param {Array} arr The array to find the given element.
 * @param {*} elem The element to be finded.
 * @param {[Number]} i The index to start the search at.
 * 
 * @returns {Number} The index of the element finded.
 */

function lastIndexOf(arr, elem, i) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');
    if(typeof i !== 'number' && i !== undefined) throw TypeError(i + ' is not a number');

    var index = i;
    if(!index) index = 0;
    for(var j = arr.length; j > index; j--) {
        if(elem === arr[j]) return j;
    }
    return -1;
}