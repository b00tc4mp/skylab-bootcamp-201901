console.log('\n\nDEMO', 'findIndex');

var a = [1, 2, 5, 10, 20];

console.log('case 1');

<<<<<<< Updated upstream
<<<<<<< HEAD
console.log(findIndex(a, function(v){return v > 3 ? true : false}));
=======
console.log(filter(a, function(v){return v > 3 ? true : false}));
>>>>>>> develop
=======
console.log(filter(a, function(v){return v > 3 ? true : false}));
>>>>>>> Stashed changes
//2

console.log('case 2');

<<<<<<< Updated upstream
<<<<<<< HEAD
console.log(findIndex(a, function(v){return v > 20 ? true : false}));
//undefined
=======
=======
>>>>>>> Stashed changes
console.log(filter(a, function(v){return v > 20 ? true : false}));
//undefined

console.log('case 3');

try {
    findIndex();

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}

console.log('case 4');

try {
    findIndex(a);

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
<<<<<<< Updated upstream
}
>>>>>>> develop
=======
}
>>>>>>> Stashed changes
