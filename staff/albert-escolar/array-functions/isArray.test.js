'use strict'

describe('isArray', function () {
    it('should return true when passed an array', function () {
        var array = [1, 2, 3];
        var expected = true;
        var result = Boolean;

        result = isArray(array);

        expect(result, expected);

    }); 

    it('should return false when not passed an array', function(){
        var notArray = 2;
        var expected = false;
        var result;

        result = isArray(notArray);

        expect(result, expected);

    });

});