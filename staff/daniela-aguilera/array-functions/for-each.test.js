'use strict';

suite('forEach', function () {
    test('should iterate an array without altering it', function () {
        var array = [1, 2, 3];
        var result = []

        forEach(array, function (v, i) { result[i] = v; });
        // 0 1
        // 1 2
        // 2 3

        for (var i in array) {
            expect(result[i], array[i]);
        }

        var check = [1, 2, 3];

        for (var i in check) {
            expect(check[i], array[i]);
        }
    });

    test('should break on undefined array', function () {
        try {
            forEach();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    test('should break on undefined callback', function () {
        var array = [1, 2, 3];

        try {
            forEach(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });

});