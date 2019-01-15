var array = [1, 2, 3, 4];

function fill(arr, num) {
  var newArr = [];
  for (var i=0; i<arr.length; i++) {
    newArr[i] = num;
    return newArr;
  }
}

console.log(fill(array, 5));



