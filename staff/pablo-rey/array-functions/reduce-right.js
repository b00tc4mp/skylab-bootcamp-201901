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
  var start = array.length - 1;
  var acc = initialValue;
  if (typeof initialValue === "undefined") {
    acc = array[start];
    start = start - 1;
  }
  for (var i=start; i >= 0; i--) {
    acc = callbackfn(acc, array[i], i, array);
  }
  return acc;
}