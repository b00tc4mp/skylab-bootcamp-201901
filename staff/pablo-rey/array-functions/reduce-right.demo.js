'use strict';

console.log('DEMO', 'reduceRight');

var reducer2 = function (accumulator, currentValue) {
 return accumulator.concat(currentValue);
}

var array4 = [[0, 1], [2, 3], [4, 5]];
console.log(reduceRight(array4, reducer2));

// expected output: Array [4, 5, 2, 3, 0, 1]


console.log('Error case 1 - No params');

try {
  reduceRight();
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 2 - Not an array');

try {
  reduceRight(1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 3 - No function');

try {
  reduceRight([]);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: undefined is not a function

console.log('Error case 4 - Not a function');

try {
  reduceRight([],1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: undefined is not a function
