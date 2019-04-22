'use strict';

describe('some', function() {
    it('should return true', function() {
        var array = [1, 2, 3, 4, 5];

        var result = some(array, function(v) {
            return v % 2 === 0;
        });

        expect(result, true);
    });

    it('should return false', function() {
        var array = [1, 3, 5];

        var result = some(array, function(v) {
            return v % 2 === 0;
        });
        
        expect(result, false);
    });

    it('should return false with an empty array', function() {
        var array = [];

        var result = some(array, function(v) {
            return v % 2 === 0;
        });
        
        expect(result, false);
    });

    it('should break on undefined array', function() {
        try {
            some();
            // si llega a este punto es que la función no envia Errors?¿?
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined function', function() {
        var array = [];

        try {
            some(array);

            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});