console.log('DEMO', 'indexOf');

var a = [1, 2, 3];

console.log('case 1');
console.log(indexOf(a, 2));
// 1

var pets = ['cat', 'dino','dog', 'bat', 'dino'];

console.log('case 2');
console.log(indexOf(pets, 'dog'));
// 2

console.log('case 3');
console.log(indexOf(pets, 'dino', 2));
// 4

console.log('case 4');
console.log(indexOf(pets, 'cat', 1));
// -1

console.log('\n');