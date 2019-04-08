console.log('\n\nDEMO', 'fill');

 var a= [1, 2, 3, 4, 5];

console.log('case 1');

console.log(fill(a, 'b'));
//['b', 'b', 'b', 'b', 'b']

console.log('case 2');

a= [1, 2, 3, 4, 5];
console.log(fill(a, 'b', 2, 4));
//[1, 2, 'b', 'b', 5]
