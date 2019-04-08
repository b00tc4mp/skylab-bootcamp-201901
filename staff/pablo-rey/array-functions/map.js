/**
 * Returns New array with the value returned by the callback for each element
 * 
 * @param {Array} array 
 * @param {Function} callbackfn 
 * 
 * @returns {Array} New array with the value returned by the callback for each element
 */
function map (array, callbackfn) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result[i] = callbackfn(array[i], i, array);    
  }
  return result;
}