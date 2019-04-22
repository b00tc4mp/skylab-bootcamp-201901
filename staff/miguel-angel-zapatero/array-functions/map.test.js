'use strict';

describe('map', function() {
    it('should return true on all items matching condition', function() {
        var array = [1, 10, 25];

        var result = map(array, function(v) { return v * 2 });

        var expected = [2, 20, 50];
        
        expect(result, expected, true);
    });

    it('should break an undefined array', function() {
        try {
            map();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break an undefined array', function() {
        try {
            var array = [1, 2, 3];
            map(array);
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});