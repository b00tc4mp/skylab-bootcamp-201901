'use strict';

describe('some', function () {
 
    it('Tests whether at least one element in the array passes the test implemented by the function', function () {
        var array = [1, 2, 3, 4, 5];

        var result = some(array, function(x){ return x > 3; });
        
        expect(result, true);
    });

    it('Tests none of the elements in the array passes the test implemented by the function', function () {
        var array = [1, 2, 3, 4, 5];

        var result = some(array, function(x){ return x > 10; });
        
        expect(result, false);
    });

   
    it('should break on undefined array', function () {
        try {
            some();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });


    it('should break on undefined callback', function () {
        var array = [1, 2, 3];

        try {
            some(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });


});