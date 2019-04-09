console.log('DEMO', 'filter');
console.log('case 1');
a=[1,2,3,4];
console.log('case 1');
console.log(filter(a, function(v) { return v < 2; }));
//[1]

console.log('case 2');
try {
    filter();
    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}
    console.log('case 3');
try {
    filter([1,2,3]);

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}
    console.log('case 4');
try {
    filter([1,2,3], 'String');

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}
    console.log('case 5');
try {
    filter('[1,2,3]', function(v) { return v < 2; });

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}
console.log('case 6');
try {
    filter(function(v) { return v < 2; },[1,2,3] );

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}