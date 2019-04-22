'use strict';

describe('lastIndexOf', function () {
    it('should return the index of the matched value', function () {
        var array = [1, 2, 3, 2];

        var result = lastIndexOf(array, 2);

        expect(result, 3);
    });

    it('should returns -1 on the not matched value', function() {
        var pets = ['cat', 'dog', 'bat'];

        var result = lastIndexOf(pets,'dino');

        expect(result, -1);
    });

    it('should break on undefined array', function () {
        try {
            lastIndexOf();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break when the index value is not a number', function () {
        try {
            var array = [1, 2, 3];
            
            lastIndexOf(array, 3, 'string');

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'string is not a number');
        }
    });
});