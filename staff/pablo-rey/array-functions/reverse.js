/**
 * Modifies the array with all elements in reverse order
 * 
 * @param {Array} array 
 * 
 * @returns {Array} The original array with all elements in reverse order
 */
function reverse(array) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");

  var len = array.length;
  for (var k = 0; k < len / 2; k++) {
    var j = len - 1 - k;
    var temp = array[k];
    array[k] = array[j] ;
    array[j] = temp;
  }
  return array;
}