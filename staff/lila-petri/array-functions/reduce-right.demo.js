console.log('DEMO', 'reduceRight');

array=[1,2,3];
array2=['a', 'b', 'c'];

console.log(reduceRight(array, function(a, v){return a + v})); //6
console.log(reduceRight(array2, function(a, v){return a + v}));//cba