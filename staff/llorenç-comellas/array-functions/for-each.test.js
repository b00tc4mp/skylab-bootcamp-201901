'use strict';

describe('forEach', function () {
    it('should itearate an array without altering it', function () {
        var array = [1, 2, 3];

        var result = [];

        forEach(array, function (v, i) { result[i] = v; });
        // 0 1
        // 1 2
        // 2 3

        expect(result, array, true);

        var expected = { 0: 1, 1: 2, 2: 3 };

        expect(array, expected, true);
    });

    it('should do nothing if array has not content', function() {
        var array = [];

        var result = [];

        forEach(array, function (v, i) { result[i] = v; });

        expect(result.length, 0);
    });

    it('should break on undefined array', function () {
        try {
            forEach();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined callback', function () {
        var array = [1, 2, 3];

        try {
            forEach(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });

});