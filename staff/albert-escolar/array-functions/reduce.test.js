'use strict';

describe('reduce', function () {

    it('success', function () {

        var array = [1, 2, 3, 4];
        var expectedResult = 10;
        var result = reduce(array, function (valorAnterior, valorActual) {

            return valorAnterior + valorActual;
        });

        expect(result, expectedResult);


    })




})