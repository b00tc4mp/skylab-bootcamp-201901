'use strict';

describe('indexOf', function () {
    it('should return index of firts item matching condition', function () {
        var array = [1, 2, 3];

        var elem1 = 1;

        var exp = 0;

        var result = indexOf(array, elem1);

        expect(result, exp);
    });

    it('should return -1 if item not matching condition', function () {

        var array = [3, 4, 6];

        var elem1 = 2;

        var exp = -1;

        var result = indexOf(array, elem1);

        expect(result, exp);
    });

    it('should return -1 if item not matching condition', function () {

        var array = [3, 7, 6];

        var exp = -1;

        var result = indexOf(array);

        expect(result, exp);
    });



    it('should break on undefined array', function () {

        try {
            indexOf();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, "Cannot read property 'length' of undefined");
        }
    });

});