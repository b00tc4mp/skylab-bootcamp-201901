'use strict';

describe('find', function(){
    it('should return the matched value', function() {
        var array = [1, 2, 3, 5];

        var result = find(array, function(v) { return v > 3; });

        expect(result, 5);
    });

    it('should return undefined', function() {
        var array = [1, 2, 3];

        var result = find(array, function(v) { return v > 5; });

        expect(result, undefined);
    });

    it('should break an undefined array', function() {
        try {
            find();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break an undefined array', function() {
        try {
            var array = [1, 2, 3];
            find(array);
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});
