/**
 * Returns the index of the first element that fill the condition in callback function
 * 
 * @param {Array} array 
 * @param {Function} callbackfn 
 * 
 * @returns {number} Index of first occurrence
 */
function findIndex (array, callbackfn) {
  for (var i = 0; i < array.length;  i++) {
    if (callbackfn(array[i], i, array)) return i;
  }
}