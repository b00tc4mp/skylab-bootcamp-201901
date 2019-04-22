'use strict';

describe('join', function(){
    it('should join the given array with \'+\'', function(){
        var array = [1, 2, 5, 10, 20];
        var joinSymbol = '+';

        var result = join(array, joinSymbol);

        expect(result, '1+2+5+10+20');
    });

    it('should join the given array with \',\'', function(){
        var array = [1, 2, 5, 10, 20];
        var joinSymbol = ',';

        var result = join(array, joinSymbol);

        expect(result, '1,2,5,10,20');
    });

    it('should break on undefined is not an array', function(){
        var array = undefined;
        var joinSymbol = ',';
        
        try {
            join(array, joinSymbol);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});