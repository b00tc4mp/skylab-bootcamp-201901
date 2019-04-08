console.log('DEMO', 'slice');

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log("Case 1");
console.log(slice(animals, 2));
// expected output: Array ["camel", "duck", "elephant"]

console.log("Case 2");
console.log(slice(animals, 2, 4));
// expected output: Array ["camel", "duck"]

console.log("Case 3");
console.log(slice(animals, 1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]
