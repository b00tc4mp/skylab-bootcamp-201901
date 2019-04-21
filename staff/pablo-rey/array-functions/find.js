'use strict';

/**
 * Returns the value of the first element that fill the condition in callback function
 * 
 * @param {Array} array 
 * @param {Function} callbackfn 
 * 
 * @returns {*} Element of first occurrence
 */
function find(array, callbackfn, _this) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");
  if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");
    
  for (var k = 0; k < array.length;  k++) {
    if (callbackfn.call(_this, array[k], k, array)) return array[k];
  }
}