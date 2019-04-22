'use strict'




describe('splice', function() {
    it('should break if its not an array', function () {
        
        try{
            splice();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'is not an array');
        }
 
    })
    it('should break if its not a number', function (){
        var test =[2,4,6,8]
        try{
            splice(test,'a');
            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'is not a number')
        }

    })
    it('should iterate trough the array and add a value on index specified ',function(){

       var array=[1,2,3,4,5]
       var actual= splice(array,3,0,1)
       var expected =[1,2,3,1,4,5]

            

            expect(expected,actual,true)

    })
    it('should iterate trough the array and substract a value ',function(){

        var array=[1,2,3,4,5]
        var actual= splice(array,1,1)
        var expected =[1,3,4,5]
 
             
 
             expect(expected,actual,true)
 
     })
   


    
});