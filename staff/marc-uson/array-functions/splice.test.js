'use strict';

describe('splice', function(){
    it('should return an array modified [1, 2, 3,4,5,6,7,8,9] and [] as a result', function(){
        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        var result = splice(array);

        expect(array, [1, 2, 3,4,5,6,7,8,9], true);
        expect(result, [], true);

    });
    it('should return an array modified [1, 2, 3,4,5,6,7,8,9] and [] as a result', function(){
        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        var result = splice(array, 20);

        expect(array, [1,2,3,4,5,6,7,8,9], true);
        expect(result, [], true);

    });
    it('should return an array modified [1, 2, 3,4,5,6,7,8,9] and [] as a result', function(){
        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        var result = splice(array, 1, 0);

        expect(array, [1, 2, 3,4,5,6,7,8,9], true);
        expect(result, [], true);

    });
    it('should return an array modified [1, 2, 3] and [4,5,6,7,8,9] as a result', function(){
        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        var result = splice(array, 3);

        expect(array, [1, 2, 3], true);
        expect(result, [4, 5, 6, 7, 8, 9], true);

    });
    it('should return an array modified [1, a, 2, 3, 4, 5, 6, 7, 8, 9] and [] as a result', function(){
        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        var result = splice(array, 1, 2, 'a');

        expect(array, [1, 'a', 3, 4, 5, 6, 7, 8, 9], true);
        expect(result, [2], true);
    });

    it('should return an array modified [a,b,1,2,3]', function(){
        var array =['a', 'b', 'c', 'd', 'e'];

        var result = splice(array, 2, 3, 1, 2, 3);

        expect(array, ['a','b', 1, 2, 3], true);
        expect(result, ['c','d', 'e'], true);
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