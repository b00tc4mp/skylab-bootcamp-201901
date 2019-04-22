'use strict';

describe('Filter', function () {
    it('should break on undefined array', function () {
        try {
            filter();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
    it('should break on undefined callback', function () {
        var array = [1, 2, 3];

        try {
            filter(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});