/**
 * Abstraction of indexOf
 * 
 * Returns the first index at which a given element can be found in the array, or -1 if it is not present.
 * 
 * 
 * @param {Array} arr 
 * @param {*} elem 
 * @param {Number} posI
 * 
 * @throws {TypeError} If an array is not an array
 * 
 * @returns {Number} - The first index of the element in the array; -1 if not found
 */

function indexOf (arr, elem, posI) {

    if (!(arr instanceof Array)) throw TypeError (arr + ' should be an array')

    var pos = 0;
    
    if (posI === undefined) posI =0;
    
    for (let i=posI; i< arr.length; i++){

		if (arr[i] === elem){
		pos = i
        return pos
        }
    }

    if (pos === 0) pos = -1;

    return pos
}
