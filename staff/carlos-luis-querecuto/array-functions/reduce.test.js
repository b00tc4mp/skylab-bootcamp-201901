'use strict';

describe('reduce', function () {
    it('should break on undefined array', function () {
        try {
            reduce();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
    it('should break on undefined callback', function () {
        var array = [1, 2, 3];

        try {
            reduce(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
    it('should break on undefined initial element', function () {
        var array = ['a', 'b', 'c'];

        try {
            reduce(array,function(x){return x});
            
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an initial parameter');
        }
    });
});