'use strict';

describe('concat', function() {
    it('should return the new array with only one passed argument', function() {
        var array = [1, 2, 3];

        var result = concat(array);

        expect(result, array, true);
    })

    it('should return the new array concatenating the two arrays passed', function(){
        var array1 = [1, 2, 3];
        var array2 = [4, 5, 6];

        var result = concat(array1, array2);

        var expected = [1, 2, 3, 4, 5, 6];

        expect(result, expected, true);
    });

    it('should return the new array concatenating diferent type arguments', function(){
        var array1 = [1, 2, 3];
        var array2 = ['hello', 25];
        var str = 'world';
        var num = 88;

        var result = concat(array1, array2, str, num);

        var expected = [1, 2, 3, 'hello', 25, 'world', 88];
        
        expect(result, expected, true)
    });

    it('should return an empty array with no arguments passed', function() {
        var result = concat();
        
        expect(result.length === 0, true);
    });
});