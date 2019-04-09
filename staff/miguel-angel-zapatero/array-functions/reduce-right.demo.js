console.log('DEMO', 'reduceRight');

var a = [[0, 1], [2, 3], [4, 5]];

console.log('case 1');
console.log(reduceRight(a, function(x, y){
    return concat(x, y)
}));
// [4, 5, 2, 3, 0, 1]

console.log('\n');