'use strict';

describe('reduceRight', function () {
 
    it('executes a reducer function (from right-to-left) on each member of the array resulting in a single output value', function () {
        var array = [1, 2, 3, 4];
        var expected = 10;

        var result = reduceRight(array, function(x, i){ return x + i;});
        
        expect(result, expected);
    });

   
    it('should break on undefined array', function () {
        try {
            reduceRight();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });


    it('should break on undefined callback', function () {
        var array = [1, 2, 3];

        try {
            reduceRight(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });


});