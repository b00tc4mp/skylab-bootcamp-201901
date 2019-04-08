/**
 * Returns a new array with elements between start and end(not included)
 * 
 * @param {Array} array 
 * @param {number} begin Optional. Default 0
 * @param {number} end Optional. Default length of array
 * 
 * @returns {Array} new array with elements between start and end(not included)
 */
function slice (array, begin, end) {
  var start = begin || 0;
  var last = end || array.length;
  var result = [];
  for (var i = start; i < last; i++) {
    result[i-start] = array[i];
  }
  return result;
}