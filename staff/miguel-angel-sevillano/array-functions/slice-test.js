'use strict'




describe('slice', function() {
    it('should break if its not an array', function () {
        
        try{
            slice();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'is not an array');
        }
 
    })
    it('should break if its not a number', function (){
        var test =[2,4,6,8]
        try{
            slice(test,'a');
            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'is not a number')
        }

    })
    it('should return an array with the substracted elements by index first position and end position',function(){

       var array=[1,2,3,4,5]
       var actual= slice(array,2,4)
       var expected =[3,4,5]

            

            expect(expected,actual,true)

    })

    
});