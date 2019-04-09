console.log('DEMO', 'includes');

var a = [1, 2, 3];

console.log('case 1');
console.log(includes(a, 2));
// true

var pets = ['cat', 'dog', 'bat'];

console.log('case 2');
console.log(includes(pets, 'cat'));
// true

console.log('case 3');
console.log(includes(pets, 'dino'));
// false

console.log('\n');