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

  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr[i] = arr[i];
  }

  for (var j = 1; j < arguments.length; j++) {
    newArr[j + 1] = arguments[j];
  }
  
  a = newArr;
  
  return newArr.length;
}

