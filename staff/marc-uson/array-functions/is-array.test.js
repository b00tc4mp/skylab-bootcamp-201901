'use strict';

describe('isArray', function(){
    it('should return true cause array is an array', function(){
        var array = [1, 2, 3];

        var result = isArray(array);

        expect(result, true);
    });

    it('should return true cause array is an array', function(){
        var array = 'not an array';

        var result = isArray(array);

        expect(result, false);
    });
});