/**
 * Apply the callback reducer to each element. Returns the last value
 * 
 * @param {Array} array 
 * @param {Function} callbackfn 
 * @param {*} initialValue 
 * 
 * @returns {*} the last value of the reduction
 */
function reduce (array, callbackfn, initialValue) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");

  var start = 0;
  var accumulator;
  if (arguments > 2) {
    accumulator = initialValue
  } else {
    start = 1;
    accumulator = array[0];
  }

  for (var i=start; i < array.length; i++) {
    accumulator = callbackfn(accumulator, array[i], i, array);
  }
  return accumulator;
}