console.log('DEMO', 'forEach');

var a = [1, 2, 3];

console.log('Case 1');

forEach(a, function(v, i) { console.log(i, v); });
// 0 1
// 1 2
// 2 3

console.log('Case 2');

forEach(a, function(v) { console.log(v + 1); });
// 2
// 3
// 4


console.log('Error case 1 - No params');

try {
  forEach();
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 2 - Not an array');

try {
  forEach(1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 3 - No function');

try {
  forEach([]);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: undefined is not a function

console.log('Error case 4 - Not a function');

try {
  forEach([],1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: undefined is not a function
