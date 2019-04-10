describe('lastindexof', function () {
    it('should return the last index for matching elements', function () {
        var answer = 9;
        var a = [1, 2, 3, 4, 3, 6, 7, 8, 4, 3];;

        var result = lastindexof(a, 3);

        expect(result, answer);
    });

    it('should return the last index for matching elements', function () {
        var answer = -1;
        var a = ["hola", "adios", "perro"];

        var result = lastindexof(a, "gato");

        expect(result, answer);
    });
});  
