
suite('some', function () {
    test('Should return true', function () {
        var a = [1, 2, 3, 4, 5, 6];

        var result = some(a, function(v){return v === 1});

        expect(result, true);
    });


    test('should return false', function () {
        var answer = [1, 5, 6];
        var a = [1, 2, 3, 4, 5, 6];

        var result = some(a, function(v){return v > 7});

        expect(result, false);
    });


    test('should break because of undefined array', function () {
        try {
          some();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});  
