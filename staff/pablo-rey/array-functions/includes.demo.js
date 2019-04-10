'use strict';

console.log('DEMO', 'includes');

var array1 = [1, 2, 3];

console.log("Case 1");

console.log(includes(array1, 2));
// expected output: true



var pets = ['cat', 'dog', 'bat'];

console.log("Case 2");

console.log(includes(pets, 'cat'));
// expected output: true

console.log("Case 2");
console.log(includes(pets, 'at'));
// expected output: false

console.log('Error case 1 - No params');

try {
  includes();
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 2 - Not an array');

try {
  includes(1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array
