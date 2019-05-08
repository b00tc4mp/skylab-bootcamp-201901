'use strict';

describe('sort', function () {
    it('Should return the same array', function () {
        var answer = [1, 2, 3, 4, 5];
        var a = [1, 2, 3, 4, 5];

        try {
            sort(a);

            throw Error('should not reach this point');
        } catch (error) {
            expect(a, answer, true);
        }
    });


    it('should an error', function () {
        try {
            sort();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('Should return it ordenated', function () {
        var answer = [1, 3, 4, 5, 6];
        var a = [1, 3, 5, 4, 6];

        try {
            sort(a);

            throw Error('should not reach this point');
        } catch (error) {
            expect(a, answer, true);
        }
    });

});  