'use strict';

describe('concat', function () {
    it('should concatenate the arrays passed as arguments', function () {

        var array1 = [1, 2, 3];
        var array2 = [4, 5, 6];
        var expectedResult = [1, 2, 3, 4, 5, 6];
        var result = []

        result = concat(array1, array2);

        expect(result.length, 6);
        expect(result.toString(), expectedResult.toString());

    });

    it('should failed when not passed any arguments', function () {
        try {
            concat();
            throw Error('Should not have succeded');
        } catch (error) {
            expect(error.message, 'No arguments recieved');
        }
    })

    it('should failed when passed an undefined', function () {
        try {
            concat(undefined);
            throw Error('Should not have succeded');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    })



});