'use strict';

describe('reduceRight', function () {
    it('should break on undefined array', function () {
        try {
            reduceright();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined element', function () {
        var array = ['a', 'b', 'c'];

        try {
            reduceright(array);
            
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });

    it('should break on undefined callback', function () {
        var array = [1, 2, 3];

        try {
            reduceright(array,function(x){ return x});

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an initial parameter');
        }
    });

});