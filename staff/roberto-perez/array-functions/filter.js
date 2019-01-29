/**
 * Abstraction of filter.
 *
 * Create a new array with all the elements that meet the condition implemented by the given function
 *
 * @param {Array} array - array to check
 * @param {Function} callback - The expresion to evaluate
 *
 * @throws {TypeError} - when array is not an Array
 * @throws {TypeError} - when callback is not a function
 *
 * @return {boolean} - A new array with the elements that meet the condition. If no element meets the condition, an empty array will be returned.
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
