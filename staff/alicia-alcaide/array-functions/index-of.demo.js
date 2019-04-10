'use strict';

console.log('DEMO', 'indexOf');

var array = [2, 9, 9];

console.log('case 1');
console.log(indexOf(array, 2));     
// 0

console.log('case 2');
console.log(indexOf(array, 7));     
// -1

console.log('case 3');
console.log(indexOf(array, 9, 2));  
// 2

console.log('case 3');
console.log(indexOf(array, 2, -3)); 
// 0