/**
 * Returns the value of the first element that fill the condition in callback function
 * 
 * @param {Array} array 
 * @param {Function} callbackfn 
 * 
 * @returns {*} Element of first occurrence
 */
function find(array, callbackfn) {
  for (var i = 0; i < array.length;  i++) {
    if (callbackfn(array[i], i, array)) return array[i];
  }
}