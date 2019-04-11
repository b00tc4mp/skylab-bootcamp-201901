'use strict';

describe('reduce', function () {

    it('should reduce the array to 10', function () {

        var array = [1, 2, 3, 4];
        var expectedResult = 10;
        var result = reduce(array, function (valorAnterior, valorActual) {

            return valorAnterior + valorActual;
        });

        expect(result, expectedResult);


    });


    it('should reduce the array to 13', function () {

        var array = [1, 2, 3, 4];
        var initialValue = 3;
        var expectedResult = 13;
        var result = reduce(array, function (valorAnterior, valorActual) {

            return valorAnterior + valorActual;
        }, initialValue);

        expect(result, expectedResult);


    });

    it('should fail when array is undefined', function () {
        try {
            reduce();

            throw Error('should not get here');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }

    });


});