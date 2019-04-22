'use strict'



describe('Filter', function() {
    it('should break on not an array', function () {
        
        try{
            filter();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'is not an array');
        }      
    })
    it('should break on not a function', function () {
        var a=[1,2,3,4]
        
        try{
            filter(a);

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'is not a function');
        }      
    })




    it('should return an array with the filtered conditions by callback',function(){

        var a=[1,2,3,4,5,2,4,2]
        var actual = filter(a,function(v){ return v == 2})
        var expected =[2,2,2]
        expect(expected,actual,true)
    })
});




