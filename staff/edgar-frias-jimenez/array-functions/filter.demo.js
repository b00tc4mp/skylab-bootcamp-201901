console.log('-----');
console.log('DEMO', 'filter');

console.log('Case 1:');
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
console.log('words to filter if word => word.length > 6:', words);

const result = filter(words, word => word.length > 6);
console.log('Result ->', result);
// expected output: Array ["exuberant", "destruction", "present"]


console.log('Case 2:');
function isBigEnough(elemento) {
  return elemento >= 10;
}

var filtered = [12, 5, 8, 130, 44];
console.log('Filter numbers array:', filtered);

console.log('Result ->', filter(filtered, isBigEnough));
// Expects [12, 130, 44]

// In case the element to filter is not an array
var element = 'hola';

filter(element, isBigEnough);
// Expects an TypeError

// In case the function callback is wrong and is not a function
filter(words, 'adios');