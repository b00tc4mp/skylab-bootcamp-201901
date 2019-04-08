/**
 * Modifies the array with all elements in reverse order
 * 
 * @param {Array} array 
 * 
 * @returns {Array} The original array with all elements in reverse order
 */
function reverse(array) {
  for (var i = 0; i < array.length / 2; i++) {
    var temp = array[i];
    array[i] = array[array.length - 1 - i] ;
    array[array.length - 1 - i] = temp;
  }
  return array;
}