'use strict';

describe('sort', function () {
    it('should sort the current array from min to max value within it', function () {
        var array = [2, 4, 1, 3, 5];

        sort(array);
        var checkArray = [1, 2, 3, 4, 5];
        

        expect(array, checkArray, true);
    });

    it('should break when arrgument are not passed', function () {
        try{ 
            sort();
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message, undefined + ' is not an array.');
        }
    });

    it('should break when arrgument is not an array', function () {
        try{ 
            var num = 5;
            sort(num);
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message, num + ' is not an array.');
        }
    });
   
});



