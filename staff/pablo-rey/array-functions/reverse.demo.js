'use strict';

console.log('DEMO', 'reverse');

var array1 = ['one', 'two', 'three'];
console.log('array1: ', array1);
// expected output: Array ['one', 'two', 'three']

var reversed = reverse(array1); 
console.log('reversed: ', reversed);
// expected output: Array ['three', 'two', 'one']

/* Careful: reverse is destructive. It also changes
the original array */ 
console.log('array1: ', array1);
// expected output: Array ['three', 'two', 'one']


console.log('Error case 1 - No params');

try {
  reverse();
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 2 - Not an array');

try {
  reverse(1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array
