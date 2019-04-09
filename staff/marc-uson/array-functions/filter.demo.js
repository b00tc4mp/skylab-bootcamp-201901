console.log('\n\nDEMO', 'filter');

var a = [1, 2, 3, 1, 2];

console.log('case 1');

console.log(filter(a, function(v) { return v < 3 ? true : false; }))
// [1, 2, 1, 2]

console.log('case 2');

console.log(filter(a, function(v) { return v > 2 ? true : false; }))
<<<<<<< Updated upstream
<<<<<<< HEAD
// [3]
=======
=======
>>>>>>> Stashed changes
// [3]

console.log('case 3');

try {
    filter();

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}

console.log('case 4');

try {
    filter(a);

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
<<<<<<< Updated upstream
}
>>>>>>> develop
=======
}
>>>>>>> Stashed changes
