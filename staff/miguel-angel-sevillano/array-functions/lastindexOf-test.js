

'use strict'


describe('some',function(){
    it('should break if its not an array', function () {
        
        try{
            lastindex();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'its not an array');
        }
 
    })
    it('should break if its not a number', function (){
        
        try{
            lastindex(test);
            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'its not a number')
        }

    })
    it('should iterate trough the array and return the last index of the value passed by',function(){

       var array=[1,2,3,4,5]
       var actual= lastindex(array,3)
       var expected =2

            

            expect(expected,actual)

    })
    it('should iterate trough the array and return the last index of the value starting at index provided',function(){

        var array=[1,2,3,4,5,6]
        var actual= lastindex(array,4,1)
        var expected =3
 
             
 
             expect(expected,actual)
 
     })
     it('should return false if there is no item to compare ',function(){

        var array=[1,2,3,4,5,6]
        var actual= lastindex(array,0,1)
        var expected =false
 
             
 
             expect(expected,actual)
 
     })
})
