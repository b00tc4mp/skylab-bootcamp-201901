console.log('\n\nDEMO', 'some');

var a = [1, 2, 5, 1, 20];

console.log('case 1');


console.log(some(a, function(element){
    if (element===5) return true;
    return false;
}));
//true


console.log('case 2');

a=['a', 'b', 'c', 'd', 'e'];

console.log(some(a, function(element){
    if (element===5) return true;
    return false;
}));
//false