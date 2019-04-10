'use strict';

suite('join', function () {
    test('should join elements of array', function () {
        var array = ['fire', 'wind', 'rain'];
        var expected = 'fire,wind,rain';
        var result = join(array, ',');

        expect(result, expected);

    });

    test('should fail when not pass and array', function () {
        try {
            join();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array')
        }
    });

});

