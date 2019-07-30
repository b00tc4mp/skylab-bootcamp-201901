'use strict';

describe('is-array', function () {
    it('should itearate an array without altering it', function () {

        var numbers = [1,2,3,4,5,6];
        var expected = true;

        var result = isArray(numbers);

        expect(result, expected);

    });

    it('should break on undefined array', function () {
        try {
            isArray();

            throw Error('should not reach this point.');
        } catch (error) {
            expect(error.message, 'undefined is not an array.');
        }
    });

    it('should break on undefined callback', function () {

        try {
            isArray('string');

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'string is not an array.');
        }
    });

});