'use strict';

console.log('DEMO', 'map');

var array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = map( array1, function (x) { return x * 2; });

console.log(map1);
// expected output: Array [2, 8, 18, 32]


console.log('Error case 1 - No params');

try {
  map();
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 2 - Not an array');

try {
  map(1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 3 - No function');

try {
  map([]);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: undefined is not a function

console.log('Error case 4 - Not a function');

try {
  map([],1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: undefined is not a function
