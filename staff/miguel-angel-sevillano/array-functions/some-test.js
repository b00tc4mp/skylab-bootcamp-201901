'use strict'


describe('some',function(){
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
    it('should iterate trough the array and return true if have any coincidences',function(){

       var array=[1,2,3,4,5]
       var actual= some(array,function(acc,array){return acc<array},3)
       var expected = true

            

            expect(expected,actual)

    })
})


var test=[3,4,5,6]



some(test,function(acc,array){return acc<array})