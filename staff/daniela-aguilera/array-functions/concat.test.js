'use strict';

describe('concat', function () {
    it('should itearate an array without altering it', function () {

        var numbers1 = [1,2,3];
        var numbers2 = [4,5,6];
        var expected = [1,2,3,4,5,6];
        var result =  concat(numbers1, numbers2);

        expect(result, expected,true);

    });

    it('should break on undefined array', function () {
        try {
            concat();

            throw Error('should not reach this point.');
        } catch (error) {
            expect(error.message, 'undefined is not an Array.');
        }
    });

    it('should break on undefined array', function () {
        try {
            concat('string');

            throw Error('should not reach this point.');
        } catch (error) {
            expect(error.message, 'string is not an Array.');
        }
    });

}); 