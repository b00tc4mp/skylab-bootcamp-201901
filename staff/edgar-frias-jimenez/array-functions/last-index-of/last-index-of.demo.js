console.log('-----');
console.log('DEMO', 'lastIndexOf');

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals);

console.log("lastIndexOf(animals, 'Dodo'): expected output: 3", lastIndexOf(animals, 'Dodo'));
// expected output: 3

console.log("lastIndexOf(animals,'Triger'): expected output: -1", lastIndexOf(animals,'Triger'));
// expected output: -1

console.log("lastIndexOf(animals,'Tiger'): expected output: 1", lastIndexOf(animals,'Tiger'));
// expected output: 1

console.log("lastIndexOf(animals,'Penguin'): expected output: 2", lastIndexOf(animals,'Penguin'));
// expected output: 2