'use strict';

describe('filter', function () {
    it('should create a new array and return the elemenets that pass the test implemented ', function () {
        var array = [1, 5, 8, 10, 13];
        var result = filter(array, function(element){return element >5});
        var expected = [8,10,13];

        expect(result, expected,true);
    });

    it('should fail when not pass an array ', function () {
        try {
            filter();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array')
        }
    });
    it('should fail when not pass a function ', function () {
        var array = [1, 5, 8, 10, 13];
        try {
            filter(array);
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function')
        }
    });
});