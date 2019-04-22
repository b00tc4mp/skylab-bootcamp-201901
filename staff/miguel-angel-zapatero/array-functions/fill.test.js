'use strict';

describe('fill', function() {
    it('should fill all the elements of the array with the value passed', function() {
        var array = [1, 2, 3, 4, 5];

        var result = fill(array, 8);

        var expected = [8, 8, 8, 8, 8];

        expect(result, expected, true);
    });

    it('should fill all the elements of the array with the value, starting and ending with the index passed', function() {
        var array = [1, 2, 3, 4, 5];

        var result = fill(array, 8, 2, 4);

        var expected = [1, 2, 8, 8, 5];

        expect(result, expected, true);
    });

    it('should break an undefined array', function() {
        try {
            fill();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});