
suite('sort', function () {

    test('Should return true', function () {
        var answer = [1, 2, 3, 4, 5];
        var a = [1, 2, 3, 4, 5];

        try {
            var result = sort(a);

            throw Error('should not reach this point');
        } catch (error) {
            expect(result.toString, answer.toString);
        }
    });


    test('should return false', function () {
        try {
            sort();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });


    test('Should return true', function () {
        var answer = [1, 3, 4, 5, 6];
        var a = [1, 3, 5, 4, 6];

        try {
            var result = sort(a);

            throw Error('should not reach this point');
        } catch (error) {
            expect(result.toString, answer.toString);
        }
    });

});  