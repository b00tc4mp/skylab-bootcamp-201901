'use strict';

describe('slice', function(){
    it('should return [2,5,1,20]', function(){
        var array = [1, 2, 5, 1, 20];

        var result = slice(array,1);

        expect(result, [2, 5, 1, 20], true);
    });

    it('should return [b,c,d]', function(){
        var array = ['a', 'b', 'c', 'd', 'e'];

        var result = slice(array,1,4);

        expect(result, ['b', 'c', 'd'], true);
    });

    it('should return []', function(){
        var array = ['a', 'b', 'c', 'd', 'e'];

        var result = slice(array,1,'a');

        expect(result, [], true);
    });

    it('should return [1,2,5,1,20]', function(){
        var array = [1, 2, 5, 1, 20];

        var result = slice(array,'a');

        expect(result, [1, 2, 5, 1, 20], true);
    });

    it('should break on undefined is not an array', function(){
        var array = undefined;

        try {
            slice(array,1,4);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});
