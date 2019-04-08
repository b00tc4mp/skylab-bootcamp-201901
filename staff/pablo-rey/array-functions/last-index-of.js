/**
 * Returns the index of last occurrence where the element is equal to the given value. Otherwise -1
 * 
 * @param {Array} array 
 * @param {*} value 
 * @param {number} from Index to start the backward search
 * 
 * @returns {number} Index of last occurrence. -1 if not present
 */
function lastIndexOf(array, value, from) {
  for (var i = from || (array.length - 1) ; i >= 0; i--) {
    if (array[i] === value) return i;
  }
  return -1;
}