'use strict';

/**
 * Returns the index of last occurrence where the element is equal to the given value. Otherwise -1
 * 
 * @param {Array} array 
 * @param {*} value 
 * @param {number} fromIndex Index to start the backward search
 * 
 * @returns {number} Index of last occurrence. -1 if not present
 */
function lastIndexOf(array, value, fromIndex) {
  if (!(array instanceof Array)) throw new TypeError("array param is not an array");

  var len = array.length;
  if (len === 0) return -1;
  var n = (arguments.length > 2) ? parseInt(fromIndex) : (len - 1);
  var k = (n >= 0) ? Math.min(n, len - 1) : (len - Math.abs(n));

  while (k >= 0) {
    if (array[k] === value) return k;
    k--;
  }
  return -1;
}