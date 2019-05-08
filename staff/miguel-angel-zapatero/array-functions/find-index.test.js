'use strict';

describe('findIndex', function() {
    it('should return the index of any items matching condition', function() {
        var array = [5, 12, 8, 130, 44];

        var result = findIndex(array, function(v) { return v > 13; });

        expect(result, 3);
    });

    it('should return -1', function() {
        var array = [5, 12, 8, 13, 44];

        var result = findIndex(array, function(v) { return v > 50; });

        expect(result, -1);
    });

    it('should break an undefined array', function() {
        try {
            findIndex();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break an undefined array', function() {
        try {
            var array = [1, 2, 3];
            findIndex(array);
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});