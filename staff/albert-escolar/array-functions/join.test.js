'use strict'

describe('join', function () {
    it('should join two arrays into a string', function () {

        var array1 = [1, 2, 3];
        var expected = "1,2,3";
        var result;

        result = join(array1, ',');

        expect(result, expected);
    })

    it('should fail when not passed an array', function () {

        try {
            join()
        } catch(error){
            expect(error.message, 'undefined is not an array');
        }

    })
});