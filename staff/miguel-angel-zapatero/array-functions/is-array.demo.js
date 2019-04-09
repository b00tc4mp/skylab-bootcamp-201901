console.log('DEMO', 'isArray');

var a = [1, 2, 3];
var b = 'hello';
var c = 25;
var d = {name: 'miguel'};

console.log('case 1');
console.log(isArray(a));
// true

console.log('case 2');
console.log(isArray(b));
// false

console.log('case 3');
console.log(isArray(c));
//false

console.log('case 4');
console.log(isArray(d));
//false

console.log('\n');