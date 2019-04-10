describe('shift', function () {
    it('Should return the substracted element from the original array', function () {
        var answer = 1;
        var a = [1, 2, 3];

        var result = shift(a);

        expect(result, answer);
    });


    it('should add each element starting by the last index', function () {
        var answer = [2, 3];
        var a = [1, 2, 3];

        var result = shift(a);

        expect(result, answer, true);
    });


    it('should break because of undefined array', function () {
        var a = [1, 2, 3, 4, 5, 6];

        try {
          shift();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});  
