var array = [1, 2, 3, 4];

function find(array, func) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i];
    if (func(value)) return value;
  }
}

