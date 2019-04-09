console.log('DEMO', 'map');

var a = [1, 2, 3, 4, 5, 6];

console.log('case 1');

console.log(map(a, function(v){return v * 3}));
//[3, 6, 9, 12, 15, 18]

console.log('case 2');

console.log(map(a, function(v){return v + 5}));
//[6, 7, 8, 9, 10, 11]