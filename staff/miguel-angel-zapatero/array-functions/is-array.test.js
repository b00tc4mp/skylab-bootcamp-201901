'use strict';

describe('is-array', function() {
    it('should return true', function() {
        var array = [1, 2, 3];
        
        var result = isArray(array);
        
        expect(result, true);
    })

    it('should return false', function() {
        var str = 'hello';

        var result = isArray(str);

        expect(result, false);
    });
});