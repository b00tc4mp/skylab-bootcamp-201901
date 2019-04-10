'use strict'



suite('isArray', function() {
    test('should break on undefined', function () {
        
        try{
            isArray();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'its undefined');
        }
 
    })
    test('shoud return true if item is array', function (){

        var array = [1,2,3,4]
        var expected = Boolean
        var actual = true
        expected = isArray(array)
        expect(actual, expected)

    })
   


    
});