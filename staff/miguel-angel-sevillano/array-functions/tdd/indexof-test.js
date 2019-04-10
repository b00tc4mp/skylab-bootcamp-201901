'use strict';



describe('index_of', function() {
    it('should break on not an array', function () {
        
        try{
            index_Of();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message, 'undefined is not an array');
        }   
        
    })
    it('should break on not a number', function () {
        var a=[2,4,6,8,6]
        
        try{
            index_Of(a);

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message, 'undefined its not a number');
        }
           
    })

    it('should return the index of an item in array',function(){
        var a =[1,2,3,4]
        var item =3;
        var actual=0;
        var expected=2;

        actual = index_Of(a,3)
        expect(expected,actual)
    })
    

    
});