console.log('DEMO', 'filter');

a=[1,2,3,4];

console.log('case 1');
console.log(filter(a, function(v) { return v < 2; }));
//[1]