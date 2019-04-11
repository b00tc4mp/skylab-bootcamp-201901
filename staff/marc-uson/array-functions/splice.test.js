'use strict';

describe('splice', function(){
    it('should return 1 and array modified [2,5,1,20]', function(){
        var array = [1, 2, 5, 1, 20];

        splice(array, 1, 0, 'a');

        expect(array, [1, 'a', 5, 1, 20], true);

    });

    it('should return a and array modified [b,c,d,e]', function(){
        var array = ['a', 'd', 2, 'c', 'b', 1];

        splice(array);

        expect(array, [1, 2, 'a','b', 'c', 'd'], true);
    });

    it('should break on undefined is not an array', function(){
        var array = undefined;

        try {
            splice(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});



console.log('\n\nDEMO', 'splice');

var a = [1, 2, 5, 1, 20];

console.log('case 1');


console.log(splice(a, 1, 0, 'a'));
//1,'a',5,1,20


console.log('case 2');

a=['a', 'b', 'c', 'd', 'e'];

console.log(splice(a, 2, 3, 1));
//'a','b',1
