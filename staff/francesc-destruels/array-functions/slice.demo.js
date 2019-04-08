console.log('DEMO', 'slice');

var a = [1, 2, 3, 4, 5, 6];

console.log('case 1');

console.log(slice(a, 2));
//[1, 2, 4, 5, 6]

console.log('case 2');

console.log(slice(a, 1, 3));
//[1, 5, 6]