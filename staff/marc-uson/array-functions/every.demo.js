console.log('\n\nDEMO', 'every');

var a = [1, 2, 3];

console.log('case 1');

console.log(every(a, function(v) { return v > 0; }));
// true

console.log('case 2');

console.log(every(a, function(v) { return v < 2; }));
// false