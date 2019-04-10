describe('join', function () {
    it('should join every value directly', function () {
        var answer = "666"
        var a = [6, 6, 6];

        var result = join(a, "");

        expect(result, answer);
    });

    it('shouldjoin values with an space', function () {
        var answer = "calle 2 puerta 4"
        var a = ["calle", 2, "puerta", 4];

        var result = join(a, " ");

        expect(result, answer);
    });

    it('should join with backslashes', function () {
        var answer = "solo/2/3"
        var a =  ["solo", 2, 3];

        var result = join(a, "/");

        expect(result, answer);
    });
});  
