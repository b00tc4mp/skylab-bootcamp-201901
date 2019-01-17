/**
 *
 * @param {Array} arr - The array to reverse.
 *
 * @returns {Array} - Array reverse
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
