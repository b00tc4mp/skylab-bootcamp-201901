'use strict'

describe('lastIndexOf', function () {
    it('should return the last index of an array', function () {
        var array = [1, 2, 3];
        var expected = 2;
        var result;

        result = lastIndexOf(3, array);

        expect(result, expected);
    });
});