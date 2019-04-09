suite('lastIndexOf', function () {
    test('should return the last index that certain element has into Array', function () {
        var array = [1, 2, 5, 9, 10 ,3];

        var result = lastIndexOf(array, 5, 4);
        var indexExpected = 2;

        expect(result, indexExpected);
        
    });

});
