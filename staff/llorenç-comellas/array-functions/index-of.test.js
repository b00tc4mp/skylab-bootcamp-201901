'use strict';

suite('indexOf', function() {
    test('should return index of element', function(){
        var array =['hello','world'];
        var result = indexOf(array,'hello')
        var expected = 0;

        expect(result,expected);

    });

    test('should return -1', function(){
        var array = ['hello','world'];
        var result = indexOf(array,'animal');
        var expected = -1;

        expect(result,expected);

    });

    test('should fail when not pass and array', function(){
        
        try{
            indexOf();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message, 'undefined is not an array')
        }
    })
});

