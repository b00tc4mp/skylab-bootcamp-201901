describe('reverse', function () {
    it('should add each element starting by the last index', function () {
        var answer = [3, 2, 1];
        var a = [1, 2, 3];

        var result = reverse(a);

        expect(result, answer, true);
    });

    it('should break because of undefined array', function () {
        var a = [1, 2, 3, 4, 5, 6];

        try {
           reverse();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});  
