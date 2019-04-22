/**
 * Returns the first index at which a given element can be found in the array, or -1 if it is not present.
 * 
 * @param {Array} array      The array to iterate.
 * @param {*} searchElement  The element to search in the array
 * @param {[number]} fromIndex The index to start the search at. If the index is greater than or equal to the array's 
 *                             length, -1 is returned, which means the array will not be searched. If the provided 
 *                             index value is a negative number, it is taken as the offset from the end of the array. 
 *                             Note: if the provided index is negative, the array is still searched from front to back. 
 *                             If the provided index is 0, then the whole array will be searched. 
 *                             Default: 0 (entire array is searched).
 *
 * @returns {number}         The first index of the element in the array; -1 if not found.
 * 
 */

'use strict';

function indexOf(array, searchElement, fromIndex) {

    var startIndex = fromIndex || 0;

	for (var i = startIndex; i < array.length; i++) {
        if(array[i] ===  searchElement) {
            return i
        }
    }
    return -1;

}
