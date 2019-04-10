'use stric'
console.log('DEMO', 'contact');

var letters1 = ["h", "h", "y"];
var letters2 = ["m", "p", "y"];
var notArray = 'A string';

console.log('Case 1');

console.log(concat(letters1,letters2));
// ["h", "h", "y", "m", "p", "y"];


console.log('Case 2 : Error');

try {

    concat(notArray,letters2);

    console.error('should not reach this point');
  
} catch(error) {
  
    console.error(error.message);
}
// "A string" is not an Array.
console.log('Case 3 : Error');

try {

    concat(letters1,notArray);

    console.error('should not reach this point');
  
} catch(error) {
  
    console.error(error.message);
}
// // "A string" is not an Array.