console.log('DEMO', 'indexOf');

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log("Case 1");
console.log(indexOf(beasts, 'bison'));
// expected output: 1

console.log("Case 2");
// start from index 2
console.log(indexOf(beasts, 'bison', 2));
// expected output: 4

console.log("Case 3");
console.log(beasts.indexOf(beasts, 'giraffe'));
// expected output: -1


console.log('Error case 1 - No params');

try {
  indexOf();
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array

console.log('Error case 2 - Not an array');

try {
  indexOf(1);
  console.error("Validation failed");
} catch (error) {
  console.log(error)
}
// Expected > TypeError: array param is not an array
