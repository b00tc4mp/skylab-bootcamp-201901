'use strict';

console.log('DEMO', 'forEach');

var array = [1, 2, 3];

console.log('case 1');

forEach(array, function(v, i) { console.log(i, v); });
// 0 1
// 1 2
// 2 3

console.log('case 2');

forEach(array, function(v) { console.log(v + 1); });
// 2
// 3
// 4
