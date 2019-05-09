describe('slice', function () {
    it('Should return an array without the given id', function () {
        var answer = ["camel", "duck", "elephant"];
        var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

        var result = slice(animals, 2);


        expect(result, answer, true);
    });


    it('should add each element starting by the last index', function () {
        var answer = [2, 3, 4];
        var a = [1, 2, 3, 4, 5, 6];

        var result = slice(a, 1, 3);


        expect(result, answer, true);
    });


    it('should break because of undefined array', function () {
        try {
          slice();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});  
