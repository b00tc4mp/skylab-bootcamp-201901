'use strict';

describe('slice', function () {
 
    it('Returns a new array with the elements between start index and end index', function () {
        var array = [1, 2, 3, 4, 5];
        var expected = [3, 4]

        var result = slice(array,2, 4);
        
        expect(result, expected, true);
    });

   
    it('should break on undefined array', function () {
        try {
            slice();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

});