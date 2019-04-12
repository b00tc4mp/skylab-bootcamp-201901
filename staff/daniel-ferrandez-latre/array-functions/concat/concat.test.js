'use strict';

describe('concat', function () {
    it('Shoul return two arrays numeric arrays combined in one', function () {
        var array1 = [1,2];
        var array2 = [3,4];
        var result = concat(array1, array2);

        var arrayExpected = [1, 2, 3, 4];
        var result = concat(array1, array2);

        for (var i in result) {
            expect(result[i], arrayExpected[i]);
        }
    });

    it('Shoul return two arrays String arrays combined in one', function () {
        var array1 = ['a','b'];
        var array2 = ['c','d'];
        var result = concat(array1, array2);

        var arrayExpected = ['a', 'b', 'c', 'd'];
        var result = concat(array1, array2);

        for (var i in result) {
            expect(result[i], arrayExpected[i]);
        }
    });

    it('Shoul return two arrays, one String array and other numeric combined in one', function () {
        var array1 = ['a','b'];
        var array2 = [1, 2];
        var result = concat(array1, array2);

        var arrayExpected = ['a', 'b', 1, 2];
        var result = concat(array1, array2);

        for (var i in result) {
            expect(result[i], arrayExpected[i]);
        }
    });

    it('should break on undefined array', function () {
        try {
            concat();
            throw Error('should not reach this point');
        } catch (error) {
            console.log(error.message)
            expect(error.message, 'undefined is not an array');
        }
    });


});