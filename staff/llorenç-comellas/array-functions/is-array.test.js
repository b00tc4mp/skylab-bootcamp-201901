'use strict';

describe('isArray', function () {
    it('should return true when pass and array', function () {
        var array1 = [1, 2, 3];
        var result = isArray(array1);

        expect(result,true);
    });
    it('should return false when not pass and array', function(){
        var array2 = 2;
        var result= isArray(array2);
        

        expect(result, false);
    });
});


