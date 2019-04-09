'use strict';

suite('concat', function(){
    test('should return an array concatening the two arrays given', function(){
        var array1 = [1, 2, 3];
        var array2 = [4, 5, 6];

        var result = concat(array1, array2);
        expect(String(result),'1,2,3,4,5,6' );
    });
    
    test('should return an array concatening the two arrays given', function(){
        var array1 = [1, 2, 3];
        var array2 = ['a', 'b', 'c'];

        var result = concat(array1, array2);
        expect(String(result),'1,2,3,a,b,c' );
    });

    test('should return error cause first parameter is not an Array', function(){
        var array1 = 3;
        var array2 = [];
        try {
            concat(array1, array2);
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, '3 is not an array');
        }
    
    });

    test('should return error cause third parameter is not an array', function(){
        var array1 = [1];
        var array2 = [2];
        var array3 = 'a';

        try {
            concat(array1, array2, array3);
            throw Error('should not reach this point');    
        } catch (error) {
            expect(error.message, 'a is not an array');   
        }
    });


});
