'use strict';

describe('indexOf', function() {
    it('should return index of element', function(){
        var array =['hello','world'];
        var result = indexOf(array,'hello')
        var expected = 0;

        expect(result,expected);

    });

    it('should return -1 when the element is not in the array', function(){
        var array = ['hello','world'];
        var result = indexOf(array,'animal');
        var expected = -1;

        expect(result,expected);

    });

    it('should fail when not pass and array', function(){
        
        try{
            indexOf();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message, 'undefined is not an array')
        }
    })
});

