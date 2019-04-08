/**
 * Returns a new array with all values where the evaluation returns true
 * 
 * @param {Array} array 
 * @param {Function} callbackfn 
 * 
 * @returns {Array} New array with all values that evaluation function returns true
 */
function filter (array, callbackfn) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (callbackfn(array[i], i, array)) {
      result[result.length] = array[i];    
    }    
  }
  return result;
}