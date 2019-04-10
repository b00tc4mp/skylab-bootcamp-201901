suite('shift', function () {
    test('should return the value of the first possion of the given array, and then delete this possition and rearrange', function () {
        var array = [1, 2, 3, 4];

        shift(array);
        var arrayShiftedExpected = [2, 3, 4];

        for(var i in array) {
            expect(array[i], arrayShiftedExpected[i]);
        }
    });

});
