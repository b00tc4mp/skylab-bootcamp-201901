'use stric'
console.log('DEMO', 'every');

var array = [1, 2, 3];

console.log('case 1');

console.log(every(array, function(v) { return v > 0; }));
// true

console.log('case 2');

console.log(every(array, function(v) { return v < 2; }));
// false

console.log('case 3');

try {
    every();

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}

console.log('case 4');

try {
    every(array);

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}
