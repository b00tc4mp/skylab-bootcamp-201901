console.log('DEMO', 'map');

console.log('case 1');
a=[1,2,3]
console.log(map(a, function(v) { return v * 2; }));

console.log('case 2');
try {
    map([1,2,3]);

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}
    console.log('case 4');
try {
    map([1,2,3], 'String');

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}
    console.log('case 5');
try {
    map('[1,2,3]', function(v) { return v * 2; });

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}
console.log('case 6');
try {
    map(function(v) { return v * 2; },[1,2,3] );

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}