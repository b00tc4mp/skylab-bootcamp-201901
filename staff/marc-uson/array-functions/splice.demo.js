console.log('\n\nDEMO', 'splice');

var a = [1, 2, 5, 1, 20];

console.log('case 1');


console.log(splice(a, 1, 0, 'a'));
//1,'a',5,1,20


console.log('case 2');

a=['a', 'b', 'c', 'd', 'e'];

console.log(splice(a, 2, 3, 1));
//'a','b',1
