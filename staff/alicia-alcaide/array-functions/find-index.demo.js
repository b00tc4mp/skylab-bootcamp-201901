'use strict';

console.log('DEMO', 'findIndex');

console.log('case 1');

var array1 = [5, 12, 8, 130, 44];

console.log(findIndex(array1, function (element) {return element > 13;}));
// 3

console.log(findIndex(array1, function (element) {return element > 240;}));
// -1