console.log('-----');
console.log('DEMO', 'index-of');

var array = [2, 9, 9, 12, 33, 19];
console.log('Search for the index in array', array);
console.log('indexOf(array, 2)', indexOf(array, 2));
// Expects 0
console.log('indexOf(array, 7)', indexOf(array, 7));
// Expects -1
console.log('indexOf(array, 19)', indexOf(array, 19));
// Expects 5
console.log('indexOf(array, -1)', indexOf(array, -1));
// Expects -1
console.log('indexOf(array, 33)', indexOf(array, 33));
// Expects 4
