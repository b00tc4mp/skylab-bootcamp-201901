'use strict';

console.log('DEMO', 'lastIndexOf');

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log("Case 1");
console.log(lastIndexOf(animals,'Dodo'));
// expected output: 3

console.log("Case 2");
console.log(lastIndexOf(animals, 'Tiger'));
// expected output: 1

console.log("Case 3");
console.log(lastIndexOf(animals,'Dodo',2));
// expected output: 0


console.log('Error case 1 - No params');

try {
  lastIndexOf();
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 2 - Not an array');

try {
  lastIndexOf(1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array
