'use strict';

suite('filter', function () {
    test('should return a new array filled just by filtered values', function () {
        var array = [1, 2, 5, 9, 10 ,3];

        var result = every(array, function (v) { return v > 5; });
        var arrayExpected = [9, 10];

        for (var i in result) {
            expect(result[i], arrayExpected[i]);
        }
    });

});
