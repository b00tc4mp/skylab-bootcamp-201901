console.log('DEMO', 'reduce');

array=[1,2,3];
array2=['a', 'b', 'c'];

console.log(reduce(array, function(a, v){return a + v})); //6
console.log(reduce(array2, function(a, v){return a + v}));//abc