/**
 * Abstraction of indexof.
 * 
 * The indexOf() method returns the index within the calling String object of the first occurrence
 * of the specified value, starting the search at fromIndex. Returns -1 if the value is not found.
 * 
 * @param {Array} arr 
 * @param {*} value 
 * @param {number} startIndex - from which index of the array starts to search, default = 0 
 *  * 
 * @throws {Error} - TODO
 * @throws {TypeError} - TODO
 * 
 * @return {number} value - index of element found, or -1
 * 
 */


function indexOf(arr, value, startIndex) {
    if (!(arr instanceof Array))
        throw new TypeError(arr + ' is not an array');

    startIndex = startIndex === undefined ? 0 : (startIndex < 0 ? arr.length + startIndex : startIndex);
	for (var i = startIndex; i<arr.length; i++) {
        if (arr[i]===value) return i;
		else if(i===arr.length-1) return -1;
    }
}

