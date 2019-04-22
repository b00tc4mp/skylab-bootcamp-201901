'use strict';

console.log('DEMO', 'join');

var elements = ['Fire', 'Wind', 'Rain'];

console.log('case 1');
console.log(join(elements));
// expected output: "Fire,Wind,Rain"

console.log('case 2');
console.log(join(elements,''));
// expected output: "FireWindRain"

console.log('case 3');
console.log(join(elements,'-'));
// expected output: "Fire-Wind-Rain"
var elements = ['Fire', 'Wind', 'Rain'];
