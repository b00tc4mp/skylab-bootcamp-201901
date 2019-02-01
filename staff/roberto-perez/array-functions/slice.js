function slice(arr, start, end) {
  if (!(arr instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }

  if (start >= arr.length) return [];

  if (!start) {
    start = 0;
  } else if (start < 0) {
    start = arr.length + start;
  }

  if (!end || end > arr.length) {
    end = arr.length;
  } else if (end < 0) {
    end = arr.length + end;
  }

  var newArr = [];
  var j = 0;

  for (var i = start; i < end; i++) {
    newArr[j] = arr[i];
    j++;
  }

  return newArr;
}
