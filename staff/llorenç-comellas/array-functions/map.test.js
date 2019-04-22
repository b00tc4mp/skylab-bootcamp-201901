'use strict';

describe('map', function () {
    it('should reates a new array with the results of calling a provided function on every element in the calling array. ', function () {
        var array = [1, 2, 3];
        var result = map(array, function (element) {
            return element * 2;
        });
        var expected = [2, 4, 6];

        expect(result, expected,true);
    });

    it('should fail when not pass an array ', function () {
        try {
            map();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
    it('should fail when not pass a function ', function () {
        var array = [1, 2, 3];
        
        try {
            map(array);
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});
