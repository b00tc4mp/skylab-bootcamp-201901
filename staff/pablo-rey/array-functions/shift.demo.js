'use strict';

console.log('DEMO', 'shift');

var array1 = [1, 2, 3];

var firstElement = shift(array1);

console.log(array1);
// expected output: Array [2, 3]

console.log(firstElement);
// expected output: 1

console.log('Error case 1 - No params');

try {
  shift();
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 2 - Not an array');

try {
  shift(1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array
