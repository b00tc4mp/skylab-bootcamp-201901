/**
 * Abstraction of pop.
 *
 * Removes the last element of an array and returns it
 *
 * @param {Array} arr - The array to remove the last item.
 */
function pop(arr) {
  if (!(arr instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }
  var lastItem = arr[arr.length-1];
  arr.length = arr.length - 1;
  return lastItem;
}
