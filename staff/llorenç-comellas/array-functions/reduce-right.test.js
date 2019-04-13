'use strict';

describe('reduce right', function () {
    it('should executes a reducer function on each member of the array', function () {
        var array = [1, 2, 3, 4];
        var expected = 10;
        var result = reduceRight(array, function (acc, currentValue) {
            return acc + currentValue;
        });

        expect(result, expected);

    });

    it('should executes a reducer function on each member of the array with a initial value', function () {
        var array = [1, 2, 3, 4];
        var expected = 13;
        var initialValue = 3;
        var result = reduceRight(array,function (acc, currentValue) {
            return acc + currentValue;
        }, initialValue);
        expect(result, expected);
    });

    it('should fail when not pass an array', function () {
        try {
            reduceRight();
            throw Error('should not reach this point')
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should fail when not pass a function', function () {
        var array = [1, 2, 3, 4];
        try {
            reduceRight(array);
            throw Error('should not reach this point')
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });


});