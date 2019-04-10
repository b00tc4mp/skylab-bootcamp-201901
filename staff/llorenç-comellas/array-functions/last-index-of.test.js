'use strict';

describe('lastIndexOf', function(){
    it('should return the last index of the element', function(){
        var array = [1,2,3];
        var result = lastIndexOf(array, 3)
        var expected = 2;

        expect(result, expected);
    });
    it('should return -1 when the element is not in the array', function(){
        var array = [1,2,3];
        var result = lastIndexOf(array, 4)
        var expected = -1;

        expect(result, expected);
    });

    it('should fai when not pass an array', function(){
       try{
           lastIndexOf();
           
           throw Error('should not reach this point');
        }catch(error){
            expect(error.message, 'undefined is not an array');
       }
    });
});
