console.log('-----');
console.log('DEMO', 'forEach');

var a = [1, 2, 3];

console.log('case 1');

forEach(a, function(v, i) { console.log(i, v); });
// 0 1
// 1 2
// 2 3

console.log('case 2');

forEach(a, function(v) { console.log(v + 1); });
// 2
// 3
// 4