describe('isarray', function () {
    it('should return true because it is an array', function () {
        var a = [1, 2, 1, 3, 1];

        var result = isarray(a);

        expect(result, true);
    });

    it('should return false because it is not an array', function () {
        var a = 3;

        var result = isarray(a);

        expect(result, false);
    });
});  
