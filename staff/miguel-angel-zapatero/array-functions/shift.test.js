'use strict';

describe('shift', function() {
    it('should removes the first element and return it', function() {
        var array = ['camel', 'bison', 'dino'];

        var result = shift(array);

        expect(result, 'camel');

        var expected = ['bison', 'dino'];
        expect(array, expected, true);
    });

    it('should break on undefined array', function() {
        try {
            shift();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
}); 