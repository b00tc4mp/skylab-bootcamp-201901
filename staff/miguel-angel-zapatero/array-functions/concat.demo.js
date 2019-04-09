console.log('DEMO', 'concat');

var a = [1, 2, 3];
var b = [4, 5, 6];
var c = ['hello', 25, {name: 'Miguel'}];
var d = 'world'
var e = 88;

console.log('case 1');
console.log(concat(a));
// [1, 2, 3]

console.log('case 2');
console.log(concat(a, b));
// [1, 2, 3, 4, 5, 6]

console.log('case 3');
console.log(concat(b, c));
// [4, 5, 6, 'hello', 25, {name: 'miguel'}]

console.log('case 4');
console.log(concat(c, d, e));
// [4, 5, 6, 'hello', 25, {name: 'miguel'}, 'world', 88]

console.log('\n');

