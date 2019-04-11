'use strict';

describe('reduce', function() {
    it('should return the multiplication of all the array\'s values', function() {
        var array = [1, 10, 25];

        var result = reduceRight(array, function(x, y) { return x * y; });
        
        expect(result, 250);
    });

    it('should break an undefined array', function() {
        try {
            reduceRight();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break an undefined function', function() {
        try {
            var array = [1, 2, 3];
            reduceRight(array);
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});