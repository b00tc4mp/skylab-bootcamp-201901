console.log('DEMO', 'find');

var a = [5, 12, 33, 58];

console.log('case 1');
console.log(find(a, function(v) { return v > 13; }));
// 33

console.log('case 2');
console.log(find(a, function(v) { return v < 15; }));
// 5

console.log('case 3');
console.log(find(a, function(v) { return v > 60; }));
// undefined

console.log('\n');