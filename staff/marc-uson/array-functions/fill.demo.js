console.log('\n\nDEMO', 'fill');

 var a= [1, 2, 3, 4, 5];

console.log('case 1');

console.log(fill(a, 'b'));
//['b', 'b', 'b', 'b', 'b']

console.log('case 2');

a= [1, 2, 3, 4, 5];
console.log(fill(a, 'b', 2, 4));
//[1, 2, 'b', 'b', 5]
<<<<<<< HEAD
=======

console.log('case 3');

try {
    fill(3,[], 'v', 4);

    console.error('should not reach this point');
} catch (error) {
    console.error(error.message);
}

console.log('case 4');

try {
    fill(a,'v', 'e',0);
    
    console.error('should not reach this point');
} catch (error) {
    console.error(error.message);
}
>>>>>>> develop
