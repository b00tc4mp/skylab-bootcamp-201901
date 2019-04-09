'use strict';

suite('indexOf', function () {
    test('', function () {
        var array = ['hello', 'world'];

        var result = indexOf(array, 'word');
        var expect =1
        expect(result, expect);
    });


    test('', function () {
        var array = [1, 2, 3];

        var result = indexOf(array, 'animal');
        var expect =-1;

        expect(result, expect);
    });

});

