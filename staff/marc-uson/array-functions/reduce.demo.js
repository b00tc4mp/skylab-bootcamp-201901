console.log('\n\nDEMO', 'reduce');

var a = [1, 2, 5, 1, 20];

console.log('case 1');


console.log(reduce( a, function(anterior, actual, index, array){
    return anterior + actual;
},5));
//34


console.log('case 2');

a=['a', 'b', 'c', 'd', 'e'];

console.log(reduce(a, function(anterior, actual, index, array){
    return anterior + actual;
}, 'A'));
//aabcde;
