'use strict'


describe('Reverse', function() {
    it('should break on undefined', function () {
        
        try{
            reverse();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'its not an array');
        }
 
    })
    it('shoud shitch the order of the first and last items of an array', function (){

        var array = [1,2,3,4]
        var expected = [4,2,3,1]
        var actual = reverse(array)
       
        expect(expected,actual,true)
    })
   


    
});