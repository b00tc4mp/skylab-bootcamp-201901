console.log('\n\nDEMO', 'every');

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
var a = [1, 2, 3];

console.log('case 1');

console.log(every(a, function(v) { return v > 0; }));
=======
var array = [1, 2, 3];

console.log('case 1');

console.log(every(array, function(v) { return v > 0; }));
>>>>>>> develop
=======
var array = [1, 2, 3];

console.log('case 1');

console.log(every(array, function(v) { return v > 0; }));
>>>>>>> Stashed changes
=======
var array = [1, 2, 3];

console.log('case 1');

console.log(every(array, function(v) { return v > 0; }));
>>>>>>> Stashed changes
// true

console.log('case 2');

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
console.log(every(a, function(v) { return v < 2; }));
// false
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
}
>>>>>>> develop
=======
}
>>>>>>> Stashed changes
=======
}
>>>>>>> Stashed changes
