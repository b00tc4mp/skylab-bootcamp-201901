/**
 * Abstraction of push.
 *
 * Removes the last element of an array and returns it
 *
 * @param {Array} arr - The array to remove the last item.
 */
function push(arr) {
  if (!(arr instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }

  for (var i = 1; i < arguments.length; i++) {
    arr[arr.length] = arguments[i];
  }
  
  return arr.length;
}

