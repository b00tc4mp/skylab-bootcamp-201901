'use strict';


describe('reverse', function(){
    it('should reverse the array', function(){
        var array = [1,2,3]; 
        var result = reverse(array);
        var expected = [3,2,1];

        expect(result,expected,true);

    });
    it('should fail if is not an array', function(){
        try{
            reverse()
            throw Error('should not reach this point');
        }catch(error){
            expect(error.message, 'undefined is not an array')
        }
    });
});
