'use strict';

describe('join', function() {
    it('should concatenate the arrays values with specified separator string', function() {
        var array = [2, 'world', 'miguel'];

        var result = join(array, '-');

        var expected = '2-world-miguel';
        
        expect(result, expected);
    });

    it('should concatenate the arrays values without specified separator string', function() {
        var array = ['hello', 'world', 'miguel'];

        var result = join(array);

        var expected = 'hello,world,miguel';
        
        expect(result, expected);
    });

    it('should break on undefined array', function () {
        try {
            join();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});