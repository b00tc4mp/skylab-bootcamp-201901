console.log("DEMO", "filter");

var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

console.log(filter(words, function (word) { return word.length > 6; }));
// expected output: Array ["exuberant", "destruction", "present"]


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
