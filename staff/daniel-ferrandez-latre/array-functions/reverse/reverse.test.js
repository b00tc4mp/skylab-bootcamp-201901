suite('reverse', function () {
    test('should return a reversed array', function () {
        var array = [1, 2, 3, 4];

        reverse(array);
        var arrayReversedExpected = [4, 3, 2, 1];

        for(var i in array) {
            expect(array[i], arrayReversedExpected[i]);
        }
    });

});
