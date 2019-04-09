console.log('\n\nDEMO', 'IndexOf');

var a = [1, 2, 5, 10, 20];

console.log('case 1');

console.log(IndexOf(a, 10));
//3

console.log('case 2');

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
console.log(IndexOf(a, 30));
//-1
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
console.log(IndexOf(a, 1, 1));
//-1

console.log('case 3');

try {
    IndexOf(2, 10, 4);

    console.error('should not reach this point');
} catch (error) {
    console.error(error.message);
}

console.log('case 4');

try {
    IndexOf(a, 10, 'a');

    console.error('should not reach this point');
} catch (error) {
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
