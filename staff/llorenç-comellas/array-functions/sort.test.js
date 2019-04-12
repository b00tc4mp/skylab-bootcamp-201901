'use strict';

describe('sort', function(){
    it('should return de array in order', function(){
        var array = [3,4,2,1];
        var result = sort(array);
        var expected = [1,2,3,4];

        expect(result,expected);
    });
});