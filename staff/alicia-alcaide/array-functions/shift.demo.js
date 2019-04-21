'use strict';

console.log('DEMO', 'shift');

console.log('case 1');
var myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

var shifted = shift(myFish); 
console.log('after:', myFish); 
// myFish after: ['clown', 'mandarin', 'surgeon']

console.log('Removed this element:', shifted); 
// Removed this element: angel