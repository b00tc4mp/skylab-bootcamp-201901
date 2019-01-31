/**
 *
 * @param {Array} arr - The array to reverse.
 *
 * @returns {Array} - Array reverse
 */
function reverse(arr) {
  if (!(arr instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }

  var start = 0;
  var end = arr.length - 1;

  while (start < end) {
    var temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }

  return arr;
}
