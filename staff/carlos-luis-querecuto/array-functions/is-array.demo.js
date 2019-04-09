console.log('DEMO', 'IsArray');

var a = [1, 2, 3];

console.log('case 1');

console.log(isArray(a));
//true

console.log('case 2');

console.log(isArray({foo: 123}));
 // false

 console.log('case 2');

 console.log(isArray('foobar'));
  // false