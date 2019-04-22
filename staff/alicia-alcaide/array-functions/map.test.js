'use strict';

describe('map', function () {
 
    it('Returns New array with the value returned by the callback for each element', function () {
        var array = [1, 2, 3];
        var expected = [3, 4, 5];

        var result = map(array, function(x){ return x + 2;});
        
        expect(result, expected, true);
    });

   
    it('should break on undefined array', function () {
        try {
            map();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });


    it('should break on undefined callback', function () {
        var array = [1, 2, 3];

        try {
            map(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });


});