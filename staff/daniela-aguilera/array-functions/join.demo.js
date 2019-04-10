'use strict';

console.log('DEMO', 'join');

var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
var notArray = 'A string';
var aFunction = function () {};


console.log('Case 1');

console.log(join(words, ','));
// spray,limit,elite,exuberant,destruction,present,"

console.log('Case 2 : Error');

try {

    join(notArray,',');

    console.error('should not reach this point');
  
} catch(error) {
  
    console.error(error.message);
}

// "A string is not an array"
console.log('Case 3 : Error');

try {

    join(words,aFunction);

    console.error('should not reach this point');
  
} catch(error) {
  
    console.error(error.message);
}
// "function () {} is a function"