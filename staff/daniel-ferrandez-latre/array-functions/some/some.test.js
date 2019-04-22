'use strict';

describe('some', function () {
    it('should return true on all items matching condition', function () {
        var array = [1, 2, 3];
        var result = some(array, function (element) { return element % 2 === 0; });

        expect(result, true);
    });


    it('should return false if any of the items does not match condition', function () {
        var array = [1, 2, 3];
        var result = some(array, function (element) { return element % 5 === 0; });

        expect(result, false);
    });

    it('should break on undefined array', function () {
        try {
            some();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined callback', function () {
        var array = [1, 2, 3];

        try {
            some(array);
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
    
});



