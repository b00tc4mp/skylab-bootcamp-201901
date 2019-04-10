'use strict';

console.log('DEMO', 'every');

var a = [1, 2, 3];

console.log('case 1');

console.log(every(a, function(v) { return v > 0; }));
// true

console.log('case 2');

console.log(every(a, function(v) { return v < 2; }));
// false

console.log('Error case 1 - No params');

try {
  every();
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 2 - Not an array');

try {
  every(1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 3 - No function');

try {
  every([]);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: undefined is not a function

console.log('Error case 4 - Not a function');

try {
  every([],1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: undefined is not a function
