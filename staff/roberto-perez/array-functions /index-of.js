/**
 * Abstraction of indexOf.
 *
 * Returns the first index in which a given element can be found in the array
 *
 * @param {Array} arr - The array to fill.
 * @param {*} searchElement - Element to find in the array.
 * @param {Number} [fromIndex] - The index by which the search is started.
 */

function indexOf(arr, searchElement, fromIndex) {
  if (arguments.length <= 0) return -1;

  if (!(arr instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }

  if (!searchElement) {
    throw new Error("The second argument is necessary");
  }

  if (fromIndex >= arr.length) return -1;
  if (arr == null) return -1;

  fromIndex = fromIndex || 0;

  var i = fromIndex < 0 ? arr.length + fromIndex : fromIndex;

  if (i >= arr.length) {
    return -1;
  }

  while (i < arr.length) {
    if (arr[i] === searchElement) {
      return i;
    }
    i++;
  }

  return -1;
}
