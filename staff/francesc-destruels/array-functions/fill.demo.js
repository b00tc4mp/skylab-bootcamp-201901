console.log('DEMO', 'fill');

var a = [1, 2, 3, 4, 5, 6, 7];

console.log('case 1');

console.log(fill(a, 4));
//  [4, 4, 4, 4, 4, 4, 4]

console.log('case 2');

console.log(fill(a, 4, 3));
//  [1, 2, 3, 4, 4, 4, 4]

console.log('case 3');

console.log(fill(a, 4, 3, 5));
//  [1, 2, 3, 4, 4, 4, 7]