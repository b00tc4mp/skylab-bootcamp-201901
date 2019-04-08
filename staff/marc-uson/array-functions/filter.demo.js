console.log('\n\nDEMO', 'filter');

var a = [1, 2, 3, 1, 2];

console.log('case 1');

console.log(filter(a, function(v) { return v < 3 ? true : false; }))
// [1, 2, 1, 2]

console.log('case 2');

console.log(filter(a, function(v) { return v > 2 ? true : false; }))
// [3]