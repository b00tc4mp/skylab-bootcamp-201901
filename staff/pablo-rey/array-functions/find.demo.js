'use strict';

console.log("DEMO", "find");

var array1 = [5, 12, 8, 130, 44];

function isLargeNumber(element) {
  return element > 13;
}

console.log(find(array1, isLargeNumber));
// expected output: 130


console.log('Error case 1 - No params');

try {
  findIndex();
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 2 - Not an array');

try {
  findIndex(1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 3 - No function');

try {
  findIndex([]);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: undefined is not a function

console.log('Error case 4 - Not a function');

try {
  findIndex([],1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: undefined is not a function

