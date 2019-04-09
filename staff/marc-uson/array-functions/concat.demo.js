console.log('\n\nDEMO', 'concat');



console.log('case 1');

console.log(concat([1, 2, 3], [4, 5, 6]));
//[1, 2, 3, 4, 5, 6]

console.log('case 2');

console.log(concat([1, 2, 3], [4, 5, 6], ['a', 'b', 'c']));
//[1, 2, 3, 4, 5, 6, 'a', 'b'. 'c']


console.log('case 3');

try {
    concat(3,[]);

    console.error('should not reach this point');
} catch (error) {
    console.error(error.message)
}

console.log('case 4');

try {
    concat([],[], 'a');

    console.error('should not reach this point');
} catch (error) {
    console.error(error.message)

}
