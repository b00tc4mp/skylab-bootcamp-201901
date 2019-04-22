'use strict';

describe('index-of', function () {
    it('should itearate an array without altering it', function () {
        
        var numbers = [1, 2, 3];
        var expected = 2;
        var result = indexOf(numbers,3); // 2

        expect(result, expected);

    });

    it('should break on undefined array', function () {
        try {

            indexOf();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an Array.');
        }
    });

    it('should break on undefined callback', function () {
        var numbers = [1, 2, 3];
        try {

            indexOf(numbers,'string'); // 2

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'string is not a number.');
        }
    });

});