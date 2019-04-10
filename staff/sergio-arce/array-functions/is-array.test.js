'use strict';


suite('is-array', function () {

    test('should return true if is an array', function () {

        var arr = [1, 2, 4];

        var result = isArray(arr);

        expect(result, true);

    });

    test('should return false if is not an array', function () {

        var elem = 3;

        var result = isArray(elem);

        expect(result, false);

    });

    test('should break on undefined array', function () {

        try {
            isArray();

            throw Error('should not reach this poin');

        } catch (error) {
            expect(error.message, "is undefined");
        }
    });

});
