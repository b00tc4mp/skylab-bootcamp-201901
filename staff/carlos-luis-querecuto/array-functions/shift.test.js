'use strict';

describe('Map', function () {
    it('should break on undefined array', function () {
        try {
            forEach();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});