console.log('DEMO', 'forEach');

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
// 4

console.log('case 3');
try {
    forEach([1,2,3]);

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}
    console.log('case 4');
try {
    forEach([1,2,3], 'String');

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}
    console.log('case 5');
try {
    forEach('[1,2,3]', function(v) { console.log(v + 1); });

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}
console.log('case 6');
try {
    forEach(function(v) { console.log(v + 1); },[1,2,3] );

    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}