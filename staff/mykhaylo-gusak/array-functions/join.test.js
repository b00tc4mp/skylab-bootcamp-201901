'use strict';

describe('join', function () {
    it('should itearate an array without altering it', function () {
        
        var numbers = [1,2,3,4,5,6];
        var expected = '1-2-3-4-5-6';
        
        var result = join(numbers,'-');

        expect(result, expected);

    });

    it('should break on undefined array', function () {
        try {
            join();

            throw Error('should not reach this point.');
        } catch (error) {
            expect(error.message, 'undefined is not an array.');
        }
    });

    it('should break on undefined callback', function () {

        try {
            join('string');

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'string is not an array.');
        }
    });

});