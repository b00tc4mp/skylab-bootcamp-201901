'use strict';

describe('every', function () {
    it('should return true on all items matching condition', function () {
        var array = [1, 2, 3];

        var result = every(array, function (v) { return v > 0; });

        expect(result, true);
    });


    it('should return false on any of the items not matching the condition', function () {
        var array = [1, 2, 3];

        var result = every(array, function (v) { return v < 0; });

        expect(result, false);
    });

    it('should fail on undefined array', function () {
        try {
            every();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should fail on undefined callback', function () {
        var array = [1, 2, 3];

        try {
            every(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});
