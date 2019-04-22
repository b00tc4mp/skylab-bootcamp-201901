'use strict';

describe('join', function () {
    it('should join elements of array', function () {
        var array = ['fire', 'wind', 'rain'];
        var expected = 'fire,wind,rain';
        var result = join(array, ',');

        expect(result, expected);

    });

    it('should fail when not pass and array', function () {
        try {
            join();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array')
        }
    });

});

