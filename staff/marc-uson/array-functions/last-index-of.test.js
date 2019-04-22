'use strict';
describe('lastIndexOf', function(){
    it('should return 3 cause is the last index cointaining the given variable', function(){
        var array = [1, 2, 5, 1, 20];
        var variable = 1;

        var result = lastIndexOf(array, variable);

        expect(result, 3);
    });

    it('should return 3 cause is the last index cointaining the given variable', function(){
        var array = ['a', 'b', 'c', 3, 4, 'a'];
        var variable = 'a';

        var result = lastIndexOf(array, variable);

        expect(result, 5);
    });

    it('should break on undefined is not an array', function(){
        var array = undefined;
        var variable = 3;

        try {
            lastIndexOf(array, variable);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});