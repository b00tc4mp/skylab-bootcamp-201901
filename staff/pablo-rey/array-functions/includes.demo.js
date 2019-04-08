console.log('DEMO', 'includes');

var array1 = [1, 2, 3];

console.log("Case 1");

console.log(includes(array1, 2));
// expected output: true



var pets = ['cat', 'dog', 'bat'];

console.log("Case 2");

console.log(includes(pets, 'cat'));
// expected output: true

console.log("Case 2");
console.log(includes(pets, 'at'));
// expected output: false