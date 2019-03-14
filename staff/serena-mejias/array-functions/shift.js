var array1 = [1, 2, 3];

function shift(array) {
  var firstElem = array[0];
  var temp = [];

  for (var i = 1; i < array.length; i++) {
    temp[i - 1] = array[i];
  }

  for (var j = 0; j < temp.length; j++) {
    array[j] = temp[j];
  }
  array.length--;
  return firstElem;
}
shift(array1);
console.log(array1);
