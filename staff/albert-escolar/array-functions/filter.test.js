'use strict'

describe('filter', function () {

    it('should succeed to make an array with numbers higher than 10', function () {

        var array = [1, 15, 2, 10, 14];

        var newArray = filter(array, function (element) {
            return element > 10;
        })

        expect(newArray.toString(), [15, 14].toString());
    })
    it('should succeed to make an array with numbers lesser than 10', function () {

        var array = [1, 15, 2, 10, 14];

        var newArray = filter(array, function (element) {
            return element < 10;
        })

        expect(newArray.toString(), [1, 2].toString());
    })

    it('should fail if array is undefined', function () {
        try {
            filter(undefined, function (element) {
                return element < 10;
            })
        } catch (error) {

            expect(error.message, 'undefined is not an array');
        }

    })

    it('should fail if callback is not a function', function () {
        try {
            var array = [1, 15, 2, 10, 14];
            var callback = undefined;
            filter(array, undefined);

        } catch (error) {
            expect(error.message, callback + ' is not a function');
        }


    })
})