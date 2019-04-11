'use strict';

describe('splice', function(){
    it('should return an array modified [1, a, 5, 1, 20]', function(){
        var array = [1, 2, 5, 1, 20];

        var result = splice(array, 1, 0, 'a');

        expect(result, [1, 'a', 5, 1, 20], true);

    });
    
    it('should return an array modified [a,b,1]', function(){
        var array =['a', 'b', 'c', 'd', 'e'];

        var result = splice(array, 2, 3, 1);

        expect(result, ['a','b', 1], true);
    });

    it('should break on undefined is not an array', function(){
        var array = undefined;

        try {
            splice(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on a is not  number', function(){
        var array = [];

        try {
            splice(array,'a');

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'a is not a number');
        }
    });

    it('should break on a is not  number', function(){
        var array = [];

        try {
            splice(array, 0, 'a');

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'a is not a number');
        }
    });
});