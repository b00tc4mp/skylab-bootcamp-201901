suite('slice', function () {
    test('Should return an array without the given id', function () {
        var answer = ["camel", "duck", "elephant"];
        var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

        var result = slice(animals, 2);

        expect(result.toString, answer.toString);
    });


    test('should add each element starting by the last index', function () {
        var answer = [1, 5, 6];
        var a = [1, 2, 3, 4, 5, 6];

        var result = slice(a, 1, 3);

        expect(result.toString, answer.toString);
    });


    test('should break because of undefined array', function () {
        try {
          slice();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});  
