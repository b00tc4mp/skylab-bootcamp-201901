/**
 * Abstraction of unshift.
 *
 * Add one or more elements to the beginning of the array.
 *
 * @param {Array} arr - array to shift
 *
 * @throws {TypeError} - when arr is not an Array
 *
 * @return {boolean} - returns the new length of the array.
 */
function unshift(arr) {
  if (!(arr instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }

  var newArr = [];

  var k = 0;
  for(var i = 1; i < arguments.length; i++) {
    newArr[k++] = arguments[i];
  }
  
  for(var i = 0; i < arr.length; i++) {
    newArr[k++] = arr[i];
  }
  
  for (var i = 0; i < newArr.length; i++) {
    var element = newArr[i];
    arr[i] = element;
  }

  arr.length = newArr.length;

  return arr.length;
}
