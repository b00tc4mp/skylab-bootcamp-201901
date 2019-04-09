
suite('fill', function () {
    test('should fill the array with the value given', function () {
        var answer = [4, 4, 4, 4, 4, 4, 4];
        var array = [1, 2, 3, 4, 5, 6, 7];

        var result = fill(array, 4);

        expect(result.toString, answer.toString);
    });

    test('should fill the array with the value given starting on the given index', function () {
        var answer = [1, 2, 3, 4, 4, 4, 4];
        var array = [1, 2, 3, 4, 5, 6, 7];

        var result = fill(array, 4, 3);

        expect(result.toString, answer.toString);
    });
});
