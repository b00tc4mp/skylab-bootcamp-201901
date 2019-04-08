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
  var start = 0;
  var acc = initialValue;
  if (typeof initialValue === "undefined") {
    start = 1;
    acc = array[0];
  }
  for (var i=start; i < array.length; i++) {
    acc = callbackfn(acc, array[i], i, array);
  }
  return acc;
}