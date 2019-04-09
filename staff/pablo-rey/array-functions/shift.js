/**
 * Removes the first element of an array and returns it
 * 
 * @param {Array} array 
 * 
 * @returns {*} The element removed
 */
function shift(array) {
  var result = array[0];
  for(i = 0; i < array.length - 1; i++) {
    array[i] = array[i+1];
  }
  array.length = array.length - 1;  
  return result;
}