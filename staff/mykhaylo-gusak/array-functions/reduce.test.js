'use strict'

describe('reduce', function () {

    it('Should works good!', function () {

        var letters = ['A', 'B', 'C'];
        var result = '';
        var check = 'ABC';

       result = reduce(letters, function (vacio, valorActual) {

            return vacio + valorActual;

        });

        for (var i in result) {
            expect(result[i],check[i]);
        }
        
    });

    it('should break on undefined array', function () {
        try {
            reduce();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined callback', function () {
        var letters = ['A', 'B', 'C'];

        try {
            reduce(letters);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});