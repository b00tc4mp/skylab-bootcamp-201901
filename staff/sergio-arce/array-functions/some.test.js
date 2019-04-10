'use strict';

suite('some', function(){
    test('normal case', function(){

        var arr = [1, 2, 3, 4];
        var expectedResult = true;
        
        var result = some(arr, function(x){
            return x < 2;
        });

        expect(result, expectedResult);
    });

    test('error callback', function(){

        var arr = [1, 2, 3, 4];

        var callback = ''
        try {

            some(arr, callback)
            
        } catch (error) {
            
            expect(error.message, `${callback} is not a function`);
        }

    });

    test('error array', function(){

        var arr = 'string';

        try {
            some(arr)

        } catch (error) {
            
            expect(error.message, `${arr} is not an array`);
        }
    });

});


