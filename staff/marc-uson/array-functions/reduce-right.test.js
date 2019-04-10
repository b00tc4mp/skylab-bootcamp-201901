'use strict';

describe('reduceRight', function(){
    it('should return 34', function(){
        var array = [1, 2, 5, 1, 20];

        var result = reduceRight(array, function(anterior, actual){ return anterior + actual});

        expect(result, 34);
    });
});

console.log('\n\nDEMO', 'reduceRight');


console.log('case 1');


console.log(reduceRight( a, function(anterior, actual){
    return anterior + actual;
},5));
//34


console.log('case 2');

a=['a', 'b', 'c', 'd', 'e'];

console.log(reduceRight(a, function(anterior, actual){
    return anterior + actual;
},'A'));
//aabcde;
