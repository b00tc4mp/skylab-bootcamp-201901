'use strict';

describe('shift',function(){
    it('should remove the first element of the array',function(){
        var array = [1,2,3];
        var result= shift(array);
        var expected = 1;

        expect(result, expected);
    });

    it('should fail when not pass an array',function(){
       try{
            shift();
           throw Error('should not reach this point');
       }catch (error){
        expect(error.message, 'undefined is not an array');
       }
    });
});