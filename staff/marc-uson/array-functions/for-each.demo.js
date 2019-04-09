console.log('\n\nDEMO', 'forEach');

var a = [1, 2, 3];

console.log('case 1');

forEach(a, function(v, i) { console.log(i, v); });
// 0 1
// 1 2
// 2 3

console.log('case 2');

forEach(a, function(v) { console.log(v + 1); });
// 2
// 3
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// 4
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
// 4

console.log('case 3');

try {
    forEach();

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}

console.log('case 4');

try {
    forEach(a);

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
