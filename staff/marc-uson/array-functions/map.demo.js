console.log('\n\nDEMO', 'map');

var a = [1, 2, 5, 1, 20];

console.log('case 1');

console.log(map(a, function(value){
    return value * 2;
}));
//[2, 4, 10, 2, 40]

console.log('case 2');

a=[1, 2, 3, 4, 5];

console.log(map(a, function(value){
    return value / 2;
}));
//[0.5, 1, 1.5, 2, 2.5]