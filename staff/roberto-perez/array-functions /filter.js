/**
 *
 * @param {Array} arr - The array to reverse.
 *
 * @returns {Array} - Array reverse
 */
function filter(arr, callback) {
  if (!(arr instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }

  if (!(typeof callback === "function")) {
    throw new TypeError(callback + " is not a function");
  }

  var newArr = [];

  var k = 0;
  for(var i = 0; i < arr.length; i++) {
    if(callback(arr[i])) newArr[k++] = arr[i];
  }

  return newArr;
}
