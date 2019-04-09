'use strict'

suite('join', function () {
    test('should return a String joined by the passed String', function () {
        var array = [1, 2, 8, 9];

        var result = join(array, '-');
        var strExpected = '1-2-8-9';

        expect(result, strExpected);
        
    });

});

