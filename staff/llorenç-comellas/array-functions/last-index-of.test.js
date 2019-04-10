'use strict';

describe('lastIndexOf', function(){
    it('should return the las index', function(){
        var array = [1,2,3];
        var result = lastIndexOf(array, 3)
        var expected = 2;

        expect(result, expected);
    });
});
