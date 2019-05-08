describe('reduce', function () {
    it('should add all the elements', function () {
        var answer = [21];
        var a = [1, 2, 3, 4, 5, 6];

        var result = reduce(a, function(acc, value){return acc + value});

        expect(result, answer, true);
    });

    it('should add add all elements plus 2', function () {
        var answer = [23];
        var a = [1, 2, 3, 4, 5, 6];

        var result = reduce(a, function(acc, value){return acc + value}, 2);

        expect(result, answer, true);
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
