console.log('DEMO', 'map');

var array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = map( array1, function (x) { return x * 2; });

console.log(map1);
// expected output: Array [2, 8, 18, 32]
