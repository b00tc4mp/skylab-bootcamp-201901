/**
 * Abstraction of some.
 *
 * Check if at least one element of the array complies with the condition implemented by the provided function.
 *
 * @param {Array} array - array to check
 * @param {Function} callback - The expresion to evaluate
 *
 * @throws {TypeError} - when array is not an Array
 * @throws {TypeError} - when callback is not a function
 *
 * @return {boolean} - true if the callback function returns a truthy value for any element in the array; otherwise, false.
 */
 function some(arr, callback) {
  if (!(arr instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }

  if (!(typeof callback === "function")) {
    throw new TypeError(callback + " is not a function");
  }

  for (var i = 0; i < arr.length; i++) {
    var value = arr[i];
    if (callback(value)) return true;
  }
  return false;
}