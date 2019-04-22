'use strict';

console.log('DEMO', 'concat');

console.log('case 1');

var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];
var array3 = ['g', 'h', 'i'];


console.log(concat(array1,array2,array3));
// ["a", "b", "c", "d", "e", "f", "g", "h", "i"]

console.log('case 2');

var array1 = ['a', 'b', 'c'];
var array2 = [1];
var array3 = ['pepe'];
console.log(concat(array1,array2,array3));
//["a", "b", "c", 1, "pepe"]