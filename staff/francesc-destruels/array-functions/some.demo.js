console.log('DEMO', 'some');

var a = [1, 2, 3, 4, 5, 6];

console.log('case 1');

console.log(some(a, function(v){return v === 1}));
//true

console.log('case 2');

console.log(some(a, function(v){return v > 7}));
//false