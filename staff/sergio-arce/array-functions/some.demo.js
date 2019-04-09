console.log('DEMO', 'some');

var a = [1, 2, 3];

console.log('case 1');

console.log(some(a, function(x){ return x > 6; }));
// false

console.log('case 2');

console.log(some(a, function(x){ return x > 2; }));
// true