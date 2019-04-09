console.log('\n\nDEMO', 'findIndex');

var a = [1, 2, 5, 10, 20];

console.log('case 1');


console.log(findIndex(a, function(v){return v > 3 ? true : false}));
//2

console.log('case 2');

console.log(findIndex(a, function(v){return v > 20 ? true : false}));
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
}
