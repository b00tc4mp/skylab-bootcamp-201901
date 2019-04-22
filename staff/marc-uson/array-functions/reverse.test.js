'use strict';

describe('reverse', function(){
    it('should return 29', function(){
        var array = [1, 2, 5, 1, 20];

        var result = reverse(array, function(anterior, actual){ return anterior + actual});

        expect(result, [20, 1, 5, 2, 1], true);
    });

    it('should return Aabcde', function(){
        var array = ['a', 'b', 'c', 'd', 'e'];

        var result = reverse(array, function(anterior, actual){ return anterior + actual});

        expect(result, ['e','d', 'c', 'b', 'a'], true);
    });
    it('should break on undefined is not an array', function(){
        var array = undefined;

        try {
            reverse(array, function(){});

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});