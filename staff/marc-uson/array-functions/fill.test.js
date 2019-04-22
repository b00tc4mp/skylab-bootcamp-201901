'use strict';

describe('fill', function(){
    it('should return the array full of the given value', function(){
        var array = [1, 2, 3, 4, 5];
        var value = 'b'

        var result = fill(array, value);

        expect(String(result), 'b,b,b,b,b');
    });

    it('should return the elements in the array defined from index to end changed the given value', function(){
        var array = [1, 2, 3, 4, 5];
        var value = 'b'
        var index = 2;
        var end = 4;

        var result = fill(array, value, index, end);

        expect(String(result), '1,2,b,b,5');
    });

    it('should break because the value of index is not a number', function(){
        var array = [1, 2, 3, 4, 5];
        var value = 'b'
        var index = 'a';
        var end = 4;

        try {
            fill(array, value, index, end);
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'a is not a number');     
        }
    });

    it('should break because end is not a number', function(){
        var array = [1, 2, 3, 4, 5];
        var value = 'b'
        var index = 4;
        var end = 'b';

        try {
            fill(array, value, index,end);
        } catch (error) {
            expect(error.message, 'b is not a number');
        }
    })
});