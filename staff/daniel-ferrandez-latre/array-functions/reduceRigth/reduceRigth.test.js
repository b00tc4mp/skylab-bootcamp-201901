suite('reduceRigth', function () {
    test('should return the combine all elements into an Array in one string the iteration from the end', function () {
        var array = [1, 2, 5, 9, 10 ,3];

        var result = reduceRigth(array, function(initVal, endVal) {
            return initVal + endVal;
        });
        var indexExpected = 30;
        expect(result, indexExpected);
        
    });

});
