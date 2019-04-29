'use strict';

describe('filter', function () {
    it('should itearate an array without altering it', function () {
        
        var numbers = [1,2,3,4,5,6];
        var expected = [4,5,6] ;
        
        var result = filter(numbers, function (element, index) {
          if (element > 3) {
            return true;
          } else {
            return false;
          }
        
        });
        // [4,5,6]

        expect(result, expected,true);

    });

    it('should break on undefined array', function () {
        try {
            filter();

            throw Error('should not reach this point.');
        } catch (error) {
            expect(error.message, 'undefined is not an array.');
        }
    });

    it('should break on undefined callback', function () {
        var array = [1,2,3,4,5,6];

        try {
            filter(array,'string');

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'string is not a function.');
        }
    });

});