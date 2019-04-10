'use strict';

console.log('DEMO', 'reduceRight');

var letters = ['a', 'b', 'c'];

console.log('case 1');
reduceRight(letters, function (vacio, valorActual) {

    return vacio + valorActual;

});
// 'cba'


