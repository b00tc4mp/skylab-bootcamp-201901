'use strict';

describe('reduce', function() {
    it('should return the sum of all the array\'s values', function() {
        var array = [1, 10, 25];

        var result = reduce(array, function(x, y) { return x + y; });
        
        expect(result, 36);
    });

    it('should break an undefined array', function() {
        try {
            reduce();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break an undefined function', function() {
        try {
            var array = [1, 2, 3];
            reduce(array);
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});