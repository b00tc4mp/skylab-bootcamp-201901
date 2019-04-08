/**
 * Returns a new array with all elements of array1 and array2
 * 
 * @param {Array} array1 
 * @param {Array} array2 
 * 
 * @return {Array} All elements of array1 and array2
 */

function concat (array1, array2) {
  var result = [];
  for (var i = 0; i < array1.length; i++) {
    result[i] = array1[i];
  }
  for (var i = 0; i < array2.length; i++) {
    result[array1.length + i] = array2[i];
  }
  return result;
}