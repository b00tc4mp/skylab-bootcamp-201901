'use strict';

console.log('DEMO', 'index of');

var listOfNumbers = [2,3,4,1,5,6,1,7];
var number = 1;
var notANumber = "A string";
var NotArray = 'A string';


console.log('Case 1');

console.log(lastindexOf(listOfNumbers, number))

// 6

console.log('Case 2 : Error');


try {
    lastindexOf(NotArray, number);
    console.error('should not reach this point');
  
} catch(error) { 
  
    console.error(error.message);
  
}
// "A string is not an Array."

console.log('Case 3 : Error');

try {
    lastindexOf(listOfNumbers, notANumber);
    console.error('should not reach this point');
  
} catch(error) { 
  
    console.error(error.message);
  
}
//"A string is not a number."