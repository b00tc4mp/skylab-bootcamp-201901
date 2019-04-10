'use strict';

suite('_forEach', function () {
    test('should itearate an array without altering it', function () {
        var array = [1, 2, 3];

        var result = [] // [2,3,4]
        
        var check = [2, 3, 4];

        forEach(array, function (v, i) { result[i] = v+1; });
        //  2
        //  3
        //  4

        for (var i in array) {
            expect(result[i], check[i]);
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