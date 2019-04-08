console.log('\n\nDEMO', 'findIndex');

var a = [1, 2, 5, 10, 20];

console.log('case 1');

console.log(findIndex(a, function(v){return v > 3 ? true : false}));
//2

console.log('case 2');

console.log(findIndex(a, function(v){return v > 20 ? true : false}));
//undefined