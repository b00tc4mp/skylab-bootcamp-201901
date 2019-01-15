var array=[1,2,3,4];

function find(arr, func) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      newArr[i] = func(arr[i]);
      return newArr;
    }
  }
  
  var result = find(array, function(num) {
    num = 2;
    return array[0] > num;
  });

console.log(result);
