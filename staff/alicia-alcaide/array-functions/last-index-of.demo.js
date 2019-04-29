'use strict';

console.log('DEMO', 'lastIndexOf');
     
var array = [2, 5, 9, 2];

console.log('case 1');
console.log(lastIndexOf(array, 2));     // 3
console.log('case 2');
console.log(lastIndexOf(array, 7));     // -1
console.log('case 3');
console.log(lastIndexOf(array, 2, 3));  // 3
console.log('case 4');
console.log(lastIndexOf(array, 2, 2));  // 0
console.log('case 5');
console.log(lastIndexOf(array, 2, -2)); // 0
console.log('case 6');
console.log(lastIndexOf(array, 2, -1)); // 3


