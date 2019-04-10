describe('reduceright', function () {
    it('should add each element starting by the last index', function () {
        var answer = [21];
        var a = [1, 2, 3, 4, 5, 6];

        var result = reduceright(a, function(acc, value){return acc + value});

        expect(result.toString, answer.toString);
    });

    it('should add each element starting by the last index', function () {
        var answer = [30];
        var a = [1, 2, 3, 4, 5, 6];

        var result = reduceright(a, function(acc, value){return acc + value}, 2);

        expect(result.toString, answer.toString);
    });

    it('should break on undefined callback', function () {
        var a = [1, 2, 3, 4, 5, 6];

        try {
            every(a);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});  
