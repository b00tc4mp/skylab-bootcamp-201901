'use strict';

console.log('DEMO', 'concat')

var a =[1,2,3];
var b =[4,5,6];
var c = [7,8]

console.log('Case1');

console.log(concat(a,b));

// 1,2,3,4,5,6

console.log('Case2');

console.log(concat(a,b,c))
// 1,2,3,4,5,6,7,8