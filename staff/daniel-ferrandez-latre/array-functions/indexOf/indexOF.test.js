suite('indexOf', function () {
    test('should return the index of a given element when no index is passed by', function () {
        var array = [1, 2, 5, 9, 10 ,3];

        var result = indexOf(array, 5);
        var indexExpected = 2;

        expect(result, indexExpected);
        
    });

    test('should return the index of a given element when index passed by', function () {
        var array = [1, 2, 5, 9, 10 ,3];

        var result = indexOf(array, 10, 2);
        var indexExpected = 4;

        expect(result, indexExpected);
        
    });

});
