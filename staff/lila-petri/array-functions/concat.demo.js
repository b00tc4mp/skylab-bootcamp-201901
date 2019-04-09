console.log('DEMO', 'concat');
var array=[1,2,3];
var array2=[3,4,5];

console.log('case 1');
console.log(concat(array, array2));
//[ 1, 2, 3, 4, 5 ]

console.log('case 2');
try {
    concat();

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}

console.log('case 3');
try {
    concat([1,2,3],'string');
    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}
console.log('case 4');
try {
    concat('string','string');
    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}
console.log('case 5');
try {
    concat(7,'string');
    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}