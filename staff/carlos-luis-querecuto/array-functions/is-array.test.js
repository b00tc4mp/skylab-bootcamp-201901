'use strict';

describe('Is array', function () {

    it('should break on undefined array', function () {
        try {
            isArray();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an object');
        }
    });
});