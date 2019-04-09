console.log('\n\nDEMO', 'Includes');

var a = [1, 2, 5, 10, 20];

console.log('case 1');

console.log(Includes(a, 10));
//true

console.log('case 2');

console.log(Includes(a, 'a'));
//false

console.log('case 3');

try {
    Includes(2, 10, 4);

    console.error('should not reach this point');
} catch (error) {
    console.error(error.message);
}

console.log('case 4');

try {
    Includes(a, 10, 'a');

    console.error('should not reach this point');
} catch (error) {
    console.error(error.message);
}