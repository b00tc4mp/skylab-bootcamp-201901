'use strict'

describe('reduceRight', function () {

    it('Should works good!', function () {

        var letters = ['A', 'B', 'C'];
        var result = ''; // 'CBA'
        var check = 'CBA';

       result = reduceRight(letters, function (vacio, valorActual) {

            return vacio + valorActual;

        });

        for (var i in result) {
            expect(result[i],check[i]);
        }
        
    });

    it('should break on undefined array', function () {
        try {
            reduceRight();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined callback', function () {
        var letters = ['A', 'B', 'C'];

        try {
            reduceRight(letters);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});