'use strict';

console.log('DEMO', 'join');

var elements = ['Fire', 'Wind', 'Rain'];

console.log("Case 1");
console.log(join(elements));
// expected output: "Fire,Wind,Rain"

console.log("Case 2");
console.log(join(elements,''));
// expected output: "FireWindRain"

console.log("Case 2");
console.log(join(elements, '-'));
// expected output: "Fire-Wind-Rain"


console.log('Error case 1 - No params');

try {
  join();
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 2 - Not an array');

try {
  join(1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

