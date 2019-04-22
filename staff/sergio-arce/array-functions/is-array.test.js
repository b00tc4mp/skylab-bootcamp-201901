
'use strict';


describe('is-array', function () {

    it('should return true if is an array', function () {

        var arr = [1, 2, 4];

        var result = isArray(arr);

        expect(result, true);

    });

    it('should return false if is not an array', function () {

        var elem = 3;

        var result = isArray(elem);

        expect(result, false);

    });

    it('should break on undefined array', function () {

        try {
            isArray();

            throw Error('should not reach this poin');

        } catch (error) {
            expect(error.message, "is undefined");
        }
    });

});
