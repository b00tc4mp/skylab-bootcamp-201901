'use strict';

describe('shift', function(){
    it('should return 1 and array modified [2,5,1,20]', function(){
        var array = [1, 2, 5, 1, 20];

        var result = shift(array);

        expect(array, [2, 5, 1, 20], true);

        expect(result, 1);
    });

    it('should return a and array modified [b,c,d,e]', function(){
        var array = ['a', 'b', 'c', 'd', 'e'];

        var result = shift(array);

        expect(array, ['b', 'c', 'd', 'e'], true);

        expect(result, 'a');
    });
    it('should break on undefined is not an array', function(){
        var array = undefined;

        try {
            shift(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});
