'use stric';
console.log('DEMO', 'index of');
var listOfNumbers = [1,2,3,4,5,6,7];
var number = 2;
var notANumber = "o";

console.log('Case 1');
console.log(indexOf(listOfNumbers, number))

console.log('Case 2 : Error');
try {
    indexOf(listOfNumbers, notANumber);
    console.error('should not reach this point');
  
} catch(error) { 
    console.error(error.message);
}