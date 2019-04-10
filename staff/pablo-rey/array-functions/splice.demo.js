'use strict';

console.log('DEMO', 'splice');

var months = ['Jan', 'March', 'April', 'June'];

console.log("Case 1");
splice(months, 1, 0, 'Feb');
// inserts at 1st index position
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

console.log("Case 2");
splice(months, 4, 1, 'May');
// replaces 1 element at 4th index
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']
