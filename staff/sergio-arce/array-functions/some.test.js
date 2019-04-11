'use strict';

describe('some', function(){
    it('normal case', function(){

        var arr = [1, 2, 3, 4];
        var expectedResult = true;
        
        var result = some(arr, function(x){
            return x < 2;
        });

        expect(result, expectedResult);
    });

    it('error callback', function(){

        var arr = [1, 2, 3, 4];

        var callback = ''
        try {

            some(arr, callback)
            
        } catch (error) {
            
            expect(error.message, `${callback} is not a function`);
        }

    });
    
    it('error array', function(){

        var arr = 'string';

        try {
            some(arr)

        } catch (error) {
            
            expect(error.message, `${arr} is not an array`);
        }
    });

});




