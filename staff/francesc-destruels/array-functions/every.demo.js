console.log('DEMO', 'every');
var array1 = [5, 2, 6];

console.log('case 1');

console.log(every(array1, function(v) { return v > 0; }));
// true

console.log('case 2');

console.log(every(array2, function(v) { return v < 2; }));
// false