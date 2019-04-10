
console.log('DEMO', 'filter');

var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
var notArray = 'Not an array';
var notFunction = 'Not a function';

console.log('Case 1');

console.log(filter(words,morethan6)) ;
// ['spray', 'limit', 'elite']



console.log('Case 2 : Error');

try {

    filter(notArray,moreThan6);

    console.error('should not reach this point');
  
} catch(error) {
  
    console.error(error.message);
}
// "Not an array" is not an Array.
console.log('Case 3 : Error');

try {

    filter(words,notFunction);

    console.error('should not reach this point');
  
} catch(error) {
  
    console.error(error.message);
}
// // "Not a function" is not a function.



