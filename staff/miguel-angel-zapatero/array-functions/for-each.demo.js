console.log('DEMO', 'forEach');

var a = [1, 10, 25];

console.log('case 1');
console.log(forEach(a, function(v) { return v + 5 }));
// 6
// 15
// 30

console.log('case 2');
console.log(forEach(a, function(v) { return v / 5; }));
// 0.2
// 2
// 5

console.log('\n');