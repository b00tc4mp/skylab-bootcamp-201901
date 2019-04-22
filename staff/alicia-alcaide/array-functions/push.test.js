'use strict';

describe('push', function() {
    it('should add a value at the end of an array', function() {
        var array = [1, 2, 3];

        var length = push(array, 4);

        expect(array.length, 4);

        expect(length, array.length);

        expect(array, [1, 2, 3, 4], true);
    });

    it('should add multiple values at the end of an array in order', function() {
        var array = [1, 2, 3];

        var length = push(array, 4, 5);

        expect(array.length, 5);

        expect(length, array.length);

        expect(array, [1, 2, 3, 4, 5], true);
    });

    it('should not add a non-provided value at the end of an array', function() {
        var array = [1, 2, 3];

        var length = push(array);

        expect(array.length, 3);

        expect(length, array.length);

        expect(array, [1, 2, 3], true);
    });

    it('should break on undefined array', function() {
        try {
            push();

            throw Error('should not arrive here');
        } catch(error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});