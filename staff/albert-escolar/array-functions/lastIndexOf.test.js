'use strict'

suite('lastIndexOf', function(){
    test('should return the last index of an array',function(){
        var array=[1,2,3];
        var expected = array[2];
        var result;

        result = lastIndexOf(3,array);

        expected(result, expected);
    });
});