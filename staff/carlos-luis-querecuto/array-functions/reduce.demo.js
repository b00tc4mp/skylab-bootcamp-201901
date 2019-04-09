console.log('DEMO', 'Reduce');

console.log('case 1');

var total = [0, 1, 2, 3];
// total == 6
console.log(reduce(total,function(a, b){ return a + b; }));


console.log('case 2');

var integrado = [[0,1], [2,3], [4,5]];
console.log(reduce(integrado,function(a,b) { return concat(a,b)}))
  // integrado es [0, 1, 2, 3, 4, 5]