/**
 * Abstraction of join.
 *
 * Joins all the elements of a array
 *
 * @param {Array} arr - The array to fill.
 * @param {String} [separator] - String used to separate each of the array elements
 */
function join(arr, separator) {
  if (!(arr instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }
  if(arr.length <= 0) {
    return "";
  }
  var stringJoined = "";
  separator = separator || "";
  for (var i = 0; i < arr.length - 1; i++) {
    stringJoined += arr[i] + separator;
  }
  return stringJoined + arr[arr.length - 1];
}

