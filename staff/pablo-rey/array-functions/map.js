/**
 * Returns New array with the value returned by the callback for each element
 * 
 * @param {Array} array 
 * @param {Function} callbackfn 
 * 
 * @returns {Array} New array with the value returned by the callback for each element
 */
function map (array, callbackfn, _this) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");

  var result = [];
  for (var k = 0; k < array.length; k++) {
    result[k] = callbackfn.call(_this, array[k], k, array);    
  }
  return result;
}