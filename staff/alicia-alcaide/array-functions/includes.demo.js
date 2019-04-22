'use strict';

console.log('DEMO', 'includes');

console.log('case 1');

var array1 = [1, 2, 3];

console.log(includes(array1,2));
// expected output: true

console.log('case 2');

var pets = ['cat', 'dog', 'bat'];

console.log(includes(pets,'cat'));
// expected output: true

console.log('case 3');

console.log(includes(pets,'at'));
// expected output: false