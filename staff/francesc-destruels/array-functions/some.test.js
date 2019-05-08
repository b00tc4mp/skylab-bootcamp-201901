
describe('some', function () {
    it('Should return true', function () {
        var a = [1, 2, 3, 4, 5, 6];

        var result = some(a, function(v){return v === 1});

        expect(result, true);
    });


    it('should return false', function () {
        var answer = [1, 5, 6];
        var a = [1, 2, 3, 4, 5, 6];

        var result = some(a, function(v){return v > 7});

        expect(result, false);
    });


    it('should break because of undefined array', function () {
        try {
          some();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});  
