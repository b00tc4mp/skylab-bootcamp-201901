console.log('-----');
console.log('DEMO', 'isArray');

var a = [1, 2, 3];
var b = {foo: 123};
var c = 'foobar';

console.log('var a = [1, 2, 3];', isArray(a));
// expected output: true

console.log('var b = {foo: 123};', isArray(b));
// expected output: false

console.log('var c = "foobar";', isArray(c));
// expected output: false
