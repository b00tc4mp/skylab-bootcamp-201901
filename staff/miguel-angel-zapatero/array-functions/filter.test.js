'use strict';

describe('filter', function() {
    it('should return a new array with all the matched items of the condition', function() {
        var array = [1, 2, 3];

        var result = filter(array, function(v) { return v > 1; });

        var expected = [2, 3];

        expect(result, expected, true);
    });

    it('should break an undefined array', function() {
        try {
            filter();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break an undefined array', function() {
        try {
            var array = [1, 2, 3];
            filter(array);
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});