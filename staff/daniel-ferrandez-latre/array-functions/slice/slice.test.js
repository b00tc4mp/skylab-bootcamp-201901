suite('slice', function () {
    test('should return a sliced Array by the possition is passed by', function () {
        var array = [1, 2, 3, 4];

        var arraySliceResult = slice(array, 1);
        var arraySliceExpected = [2, 3, 4];

        for(var i in array) {
            expect(arraySliceResult[i], arraySliceExpected[i]);
        }
    });

});
