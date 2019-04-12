'use strict';

describe('Join', function () {
    it('should break on undefined array', function () {
        try {
            join();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined separator', function () {
        var array = [1, 2, 3];

        try {
            join(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a string');
        }
    });
});