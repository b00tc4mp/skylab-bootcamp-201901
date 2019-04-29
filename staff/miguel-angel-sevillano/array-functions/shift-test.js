'use strict'



describe('Shift', function() {
    it('should break on not an array', function () {
        
        try{
            shift();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'is not an array');
        }      
    })
    

    it('should return the array without the first item',function(){

        var a=[1,2,3,4]
        var actual = shift(a)
        var expected =[2,3,4]
        expect(expected,actual,true)
    })
    
    it('should return undefinded if array length its 0',function(){

        var a=[]
        var actual = shift(a)
        var expected =undefined
        expect(expected,actual)
    })
});
