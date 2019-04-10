'use strict';


describe('concat', function () {
    it('should add array1 and array2', function () {
        var array1 = [1, 2, 3];
        var array2 = [4, 5, 6];
        
        var expected = [1,2,3,4,5,6]


        var result = concat(array1,array2);

        expect(result.toString(), expected.toString());
    });

    it('should break on undefined array', function () {
        try {
            concat(undefined);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
    it('No arguments recevied', function () {
        try {
            concat();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'No arguments recivied');
        }
    });

});
