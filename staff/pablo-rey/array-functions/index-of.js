/**
 * Returns the index of first occurrence where the element is equal to the given value. Otherwise -1
 * 
 * @param {Array} array 
 * @param {*} value 
 * @param {number} start Index to start 
 * 
 * @returns {number} Index of first occurrence. -1 if not present
 */
function indexOf(array, value, start) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");

  for (var k = parseInt(start) || 0; k < array.length; k++) {
    if (array[k] === value) return k;
  }
  return -1;
}