suite('map', function () {
    test('should return new Array with the mapped values into it', function () {
        var array = [1, 2, 5, 9, 10 ,3];

        var result = lastIndexOf(array, 5, 4);
        var arrayExpected = [2, 4, 10, 18, 20 ,6];

        for(value in result) {
            expect(result[i], arrayExpected[i]);
        }
    });

});
