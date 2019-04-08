console.log('\n\nDEMO', 'some');

var a = [1, 2, 5, 1, 20];

console.log('case 1');


console.log(some(a, 5, function(element, value){
    if (element===value) return true;
    return false;
}));
//true


console.log('case 2');

a=['a', 'b', 'c', 'd', 'e'];

console.log(some(a, 5, function(element, value){
    if (element===value) return true;
    return false;
}));
//false