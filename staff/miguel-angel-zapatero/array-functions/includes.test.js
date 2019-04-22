'use strict';

describe('includes', function () {
    it('should returns true on the matched value', function () {
        var array = [1, 2, 3];

        var result = includes(array, 2);

        expect(result, true);
    });

    it('should returns false on the not matched value', function() {
        var pets = ['cat', 'dog', 'bat'];

        var result = includes(pets,'dino');

        expect(result, false);
    });

    it('should break on undefined array', function () {
        try {
            includes();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});