console.log('DEMO', 'findIndex');

var a = [5, 12, 8, 130, 44];

console.log('case 1');
console.log(findIndex(a, function(v) { return v > 13; }));
// 3

console.log('case 2');
console.log(findIndex(a, function(v) { return v > 10; }));
// 1

console.log('\n');