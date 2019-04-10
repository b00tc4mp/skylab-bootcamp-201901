'use strict';

/**
 * Returns a new array with all values where the evaluation returns true
 * 
 * @param {Array} array 
 * @param {Function} callbackfn 
 * 
 * @returns {Array} New array with all values that evaluation function returns true
 */
function filter (array, callbackfn, _this) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");

  var result = [];
  for (var k = 0; k < array.length; k++) {
    if (callbackfn.call(_this, array[k], k, array)) {
      result[result.length] = array[k];    
    }    
  }
  return result;
}