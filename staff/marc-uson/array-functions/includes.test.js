'use strict';

describe('includes', function(){
    it('should return true because the given array includes the given variable', function(){
        var array = [1, 2, 5, 10, 20];
        var variable = 10;

        var result = Includes(array, variable);

        expect(result, true);
    });

    it('should return false because the given array not includes the given variable', function(){
        var array = [1, 2, 5, 10, 20];
        var variable = 30;

        var result = Includes(array, variable);

        expect(result, false);
    });

    it('should break on undefined array', function(){
        var array = undefined;
        var variable = 10;

        try {
                Includes(array, variable);

                throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on index is not a number', function(){
        var array = [1, 2, 3, 4];
        var variable = 10;
        var index = 'a';

        try {
                Includes(array, variable, index);

                throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'a is not a number');
        }
    });
});
