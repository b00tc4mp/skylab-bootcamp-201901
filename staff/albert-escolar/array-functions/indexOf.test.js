'use strict'

describe('idexOf', function () {
    it('should return index of an element in an array', function () {

        var array = [1, 2, 3];
        var expected = 0;
        var result = indexOf(1, array);

        expect(result, expected);

    })

    it('should return -1 if the element is not found in the array', function () {

        var array = [1, 2, 3];
        var expected = -1;
        var result = indexOf(4, array);

        expect(result, expected);

    })

    it('should fail when not passed an array', function () {
        var notArray = 2;

        try {

            indexOf("cat", notArray);
            throw Error('SHOULD NOT REACH THIS POINT');
        } catch (error) {
            expect(error.message, notArray+' is not an array');
        }
    })


    it('shoul fail when array is undefined', function () {
        var undefinedArray = undefined;
        try {
            indexOf('cat',undefinedArray);
            throw Error('SHOULD NOT REACH THIS POINT');
        } catch (error){
            expect(error.message, undefinedArray+' is not an array');
        }

    })








})