/**
 * This function determines whether an array includes a certain value among its entries, 
 * returning true or false as appropriate.
 * 
 * @param {Array} array          
 * @param {*} searchElement The value to search for.
 * @param {[number]} fromIndex     The position in this array at which to begin searching for valueToFind
 * 
* @returns {boolean} - A Boolean which is true if the value valueToFind is found within the array 
                       (or the part of the array indicated by the index fromIndex, if specified). 
                       Values of zero are all considered to be equal regardless of sign (that is, -0 is 
                       considered to be equal to both 0 and +0), but false is not considered to be the same as 0.
  * 
 */

'use strict';

function includes(array, searchElement, fromIndex) {

    var startIndex = fromIndex || 0;

	for (var i = startIndex; i < array.length; i++) {
        if(array[i] ===  searchElement) {
            return true
        }
    }
    return false;
}