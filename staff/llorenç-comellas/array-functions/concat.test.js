'use strict';


suite('concat', function () {
    test('add array1 and array2', function () {
        var array1 = [1, 2, 3];
        var array2 = [4, 5, 6];
        
        var expected = [1,2,3,4,5,6]


        var result = concat(array1,array2);

        expect(result, expected);
    });


});
