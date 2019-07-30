'use strict';

describe('indexOf', function(){
    it('should return 3 because is the index where we can find the given variable', function(){
        var array = [1, 2, 5, 10, 20];
        var variable = 10;

        var result = indexOf(array, variable);

        expect(result, 3);
    });

    it('should return -1 because can\'t find the given variable starting at the given index', function(){
        var array = [1, 2, 5, 10, 20];
        var variable = 1;
        var index = 1;

        var result = indexOf(array, variable, index);

        expect(result, -1);
    });

    it('should break on undefined is not an array', function(){
        var array = undefined;
        var variable = 1;
        var index = 1;

        try {
            indexOf(array, variable, index);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on a is not an array', function(){
        var array = [];
        var variable = 1;
        var index = 'a';

        try {
            indexOf(array, variable, index);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'a is not a number');
        }
    });

});