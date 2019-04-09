console.log('DEMO', 'reduceRight');

var a = [2, 5, 10];
var b = [[0, 1], [2, 3], [4, 5]];

console.log('case 1');
console.log(reduceRight(a, function(acc, elem) {
    return acc + elem
}));
// 17

console.log('case 1');
console.log(reduceRight(a, function(acc, elem) {
    return acc * elem
}, 5));
// 500

console.log('case 2');
console.log(reduceRight(b, concat));
// [4, 5, 2, 3, 0, 1]

console.log('\n');