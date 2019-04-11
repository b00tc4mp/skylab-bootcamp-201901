'use strict';

describe('reduce', function () {
    it('should executes a reducer function on each member of the array', function () {
        var array = [1, 2, 3, 4];
        var expected = 10;
        var result = reduce(array, function (acc, currentValue) {
            return acc + currentValue;
        });

        expect(result, expected);

    });

    it('should ok', function () {
        var array = [1, 2, 3, 4];
        var expected = 13;
        var initialValue = 3;
        var result = reduce(array,function (acc, currentValue,) {
            return acc + currentValue;
        }, initialValue);
        expect(result, expected);
    });

    it('should fail when not pass an array', function () {
        try {
            reduce();
            throw Error('should not reach this point')
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should fail when not pass a function', function () {
        var array = [1, 2, 3, 4];
        try {
            reduce(array);
            throw Error('should not reach this point')
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });


});