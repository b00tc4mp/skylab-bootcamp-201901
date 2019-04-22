'use strict';

/**
 * Apply the callback reducer to each element backwards begging from the end of array. Returns the last value
 * 
 * @param {Array} array 
 * @param {Function} callbackfn 
 * @param {*} initialValue 
 * 
 * @returns {*} the last value of the reduction
 */
function reduceRight (array, callbackfn, initialValue) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");

  var start = array.length - 1;
  var accumulator;
  if (arguments > 2) {
    accumulator = initialValue
  } else {
    accumulator = array[start];
    start = start - 1;    
  }
  for (var k=start; k >= 0; k--) {
    accumulator = callbackfn(accumulator, array[k], k, array);
  }
  return accumulator;
}