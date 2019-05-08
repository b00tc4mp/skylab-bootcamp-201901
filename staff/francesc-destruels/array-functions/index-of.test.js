
describe('indexof', function () {
    it('should return the first index for maching element', function () {
        var answer = 0;
        var a = [1, 2, 1, 3, 1];

        var result = indexof(a, 1);

        expect(result, answer);
    });

    it('should should return the first element for matching element looking from given index', function () {
        var answer = 4;
        var a = [1, 2, 1, 3, 1];

        var result = indexof(a, 1, 3);

        expect(result, answer);
    });

    it('should give -1 because there is no match', function () {
        var answer = -1;
        var a = [1, 2, 1, 3, 1];

        var result = indexof(a, 6);

        expect(result, answer);
    });
});  