console.log('DEMO', 'reduceRight');

var reducer2 = function (accumulator, currentValue) {
 return accumulator.concat(currentValue);
}

var array4 = [[0, 1], [2, 3], [4, 5]];
console.log(reduceRight(array4, reducer2));

// expected output: Array [4, 5, 2, 3, 0, 1]