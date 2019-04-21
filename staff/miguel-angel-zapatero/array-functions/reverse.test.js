'use strict';

describe('reverse', function() {
    it('should returns the reversed array', function() {
        var array = ['dino', 'gato', 2, 3];

        var result = reverse(array);

        var expected = [3, 2, 'gato', 'dino'];
        expect(result, expected, true);
    });

    it('should break on undefined array', function() {
        try {
            reverse();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});