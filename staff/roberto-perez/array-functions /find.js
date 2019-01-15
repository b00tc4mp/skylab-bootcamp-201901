/**
 * Abstraction of find.
 *
 * Returns the value of the first element of the array that fulfills the test function provided
 *
 * @param {Array} arr - The array to search an item in.
 * @param {Function} callback - The expression to evaluate.
 * 
 * @returns {*} - An item if found, otherwise undefined
 */
function find(arr, callback) {
  if (!(arr instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }

  if (!(typeof callback === 'function')) {
    throw new TypeError(callback + " is not a function");
  }

  for (var i = 0; i < arr.length; i++) {
    var value = arr[i];
    if (callback(value)) return value;
  }
}
