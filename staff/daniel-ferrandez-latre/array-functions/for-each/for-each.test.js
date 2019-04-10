'use strict';

describe('forEach', function () {
    it('should itearate an array without altering it', function () {
        var array = [1, 2, 3];

        var result = []
        var index = 0;
        forEach(array, function (v, i) { result[i] = v;});
        // 0 1
        // 1 2
        // 2 3

        var check = [1, 2, 3];

        expect(check, array);
        
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