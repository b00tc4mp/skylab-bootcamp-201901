'use strict';

describe('sort', function(){
    it('should return the array modified [1, 1, 2, 5, 20]', function(){
        var array = [1, 2, 5, 1, 20];

        sort(array);

        expect(array, [1, 1, 2, 5, 20], true);

    });

    it('should return the array modified [1, 2, a, b, c, d]', function(){
        var array = ['a', 'd', 2, 'c', 'b', 1];

        sort(array);

        expect(array, [1, 2, 'a','b', 'c', 'd'], true);
    });

    it('should break on undefined is not an array', function(){
        var array = undefined;

        try {
            sort(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});
