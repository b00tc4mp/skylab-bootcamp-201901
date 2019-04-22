describe('sort', function() {
    it('should return an sliced array', function() {
        var array = ['camel', 'bison', 'duck', 9, 'elephant', 'ant', 1];

        var result = sort(array);

        var expected = [1, 9, 'ant', 'bison', 'camel', 'duck', 'elephant'];
        expect(result, expected, true)
    });

    it('should break on undefined array', function() {
        try {
            sort();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array')
        }
    });
});  