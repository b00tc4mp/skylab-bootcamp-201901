describe('map', function () {
    it('should break on undefined callback', function () {
        var a = [1, 2, 3, 4, 5, 6];

        try {
            every(a);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });

    it('should multiply every element for three', function () {
        var answer = [3, 6, 9, 12, 15, 18];
        var a = [1, 2, 3, 4, 5, 6];

        var result = map(a, function(v){return v * 3});

        expect(result, answer, true);
    });

    it('should add 5 to each element', function () {
        var answer = [6, 7, 8, 9, 10, 11];
        var a = [1, 2, 3, 4, 5, 6];

        var result = map(a, function(v){return v + 5});

        expect(result, answer, true);
    });

});  
