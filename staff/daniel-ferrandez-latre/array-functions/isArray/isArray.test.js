suite('isArray', function () {
    test('should return return true in case the given element is an Array', function () {
        var array = [1, 2, 5, 9, 10 ,3];

        var result = isArray(array);
        var booleanExpected = true;

        expect(result, booleanExpected);
        
    });

});
