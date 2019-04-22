'use strict';

describe('pop', function() {
    it('should retrieve the last value from an array', function() {
        var array = [1, 2, 3];

        var value = pop(array);

        expect(array.length, 2);

        expect(value, 3);

        expect(array, [1, 2], true);
    });

    it('should return undefined on empty array', function() {
        var array = [];

        var value = pop(array);

        expect(array.length, 0);

        expect(value, undefined);
    });

    it('should break on undefined array', function() {
        try {
            pop();

            throw Error('should not arrive here');
        } catch(error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});