console.log('DEMO', 'reduce');

var a = [1, 10, 25];
var b = [4, 5, 2];

console.log('case 1');
console.log(reduce(a, function(x, y) { return x + y; }));
// 36

console.log('case 2');
console.log(reduce(b, function(x, y) { return x * y; }));
// 40

console.log('case 3');
console.log(reduce(b, function(x, y) { return x * y; }, 7));
// 80

console.log('\n');