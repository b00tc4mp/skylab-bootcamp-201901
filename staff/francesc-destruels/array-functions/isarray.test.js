suite('isarray', function () {
    test('should return true because it is an array', function () {
        var a = [1, 2, 1, 3, 1];

        var result = isarray(a);

        expect(result, true);
    });

    test('should return false because it is not an array', function () {
        var a = 3;

        var result = isarray(a);

        expect(result, false);
    });
});  
