console.log('-----');
console.log('DEMO', 'concat');

var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];
var array3;
var array4 = 'hola';

console.log("var array1 = ['a', 'b', 'c'];");
console.log("var array2 = ['d', 'e', 'f'];");

console.log(concat(array1, array2));
// expected output: Array ["a", "b", "c", "d", "e", "f"]

// In case one value is void
console.log('If on value is void: concat(array1)');
try {
  concat(array1);

  console.error('should not reach this point');
} catch(error) {
  console.error(error.message);
}

// In case one value is undefined
console.log('If undefined values: concat(array3, array1)', 'array3:', array3);
try {
  concat(array3, array1);

  console.error('should not reach this point');
} catch(error) {
  console.error(error.message);
}

// In case one value is not valid type
console.log('If one value has an invalid type: concat(array1, array4)', 'array4:', array4);
try {
  concat(array1, array4);

  console.error('should not reach this point');
} catch(error) {
  console.error(error.message);
}