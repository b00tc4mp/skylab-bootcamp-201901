'use strict';

suite('isArray', function () {
    test('should return true when pass and array', function () {
        var array1 = [1, 2, 3];
        var result = isArray(array1);

        expect(result,true);
    });
    test('should return false when not pass and array', function(){
        var array2 = 2;
        var result= isArray(array2);
        

        expect(result, false);
    });
});


