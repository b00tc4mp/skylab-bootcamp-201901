'use strict'



describe('sort', function() {
    it('should break if its not an array', function () {
        
        try{
            splice();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'is not an array');
        }
 
    })

    it('should iterate trough the array and add a value on index specified ',function(){

        var a = [3, 4, 2, 5, 6, 7];

        var expected = sort(a);

        var actual = [2,3,4,5,6,7];
            

            expect(expected,actual,true);

    })
})