'use strict';

/**
 * Returns the index of the first element that fill the condition in callback function
 * 
 * @param {Array} array 
 * @param {Function} callbackfn 
 * 
 * @returns {number} Index of first occurrence
 */
function findIndex (array, callbackfn, _this) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");

  for (var k = 0; k < array.length;  k++) {
    if (callbackfn.call(_this, array[k], k, array)) return k;
  }
  return -1;
}