'use strict'




describe('map', function() {
    it('should break if its not an array', function () {
        
        try{
            map();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'its not an array');
        }
 
    })
    it('should break if its not a function', function (){
        var test =[2,4,6,8]
        try{
            map(test);
            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'is not a function')
        }

    })
    it('should iterate trough the array and apply a value to each item',function(){

       var array=[1,2,3,4,5]
       var actual= map(array,function(v,a){return v*a},2)
       var expected =[2,4,6,8,10]

            

            expect(expected,actual,true)

    })
   


    
});