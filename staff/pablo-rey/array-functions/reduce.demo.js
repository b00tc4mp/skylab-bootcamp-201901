'use strict';

console.log('DEMO', 'reduce');


const array7 = [1, 2, 3, 4];
const reducer = function (accumulator, currentValue) { return accumulator + currentValue; };

console.log("Case 1");
// 1 + 2 + 3 + 4
console.log(reduce(array7, reducer));
// expected output: 10

console.log("Case 2");
// 5 + 1 + 2 + 3 + 4
console.log(reduce(array7, reducer, 5));
// expected output: 15


console.log('Error case 1 - No params');

try {
  reduce();
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 2 - Not an array');

try {
  reduce(1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 3 - No function');

try {
  reduce([]);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: undefined is not a function

console.log('Error case 4 - Not a function');

try {
  reduce([],1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: undefined is not a function
