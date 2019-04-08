console.log('\n\nDEMO', 'shift');

var a = [1, 2, 5, 1, 20];

console.log('case 1');

[element, a] = shift(a);
console.log(element);
console.log(a);
//1
//2,5,1,20


console.log('case 2');

a=['a', 'b', 'c', 'd', 'e'];

[element, a] = shift(a);
console.log(element);
console.log(a);
//a
//b,c,d,e