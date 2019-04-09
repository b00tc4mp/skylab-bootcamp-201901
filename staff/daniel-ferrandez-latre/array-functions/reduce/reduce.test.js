suite('reduce', function () {
    test('should return the combine all elements into an Array in one', function () {
        var array = [1, 2, 5, 9, 10 ,3];

        var result = reduce(array, function(initVal, endVal) {
            return initVal + endVal;
        });
        var indexExpected = 30;
        expect(result, indexExpected);
        
    });

});
