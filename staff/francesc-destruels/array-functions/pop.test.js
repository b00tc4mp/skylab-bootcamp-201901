describe('pop', function () {
    it('should return undefined on empty array', function() {
        var array = [];

        var value = pop(array);

        expect(array.length, 0);

        expect(value, undefined);
    });

    it('should break because of undefined array', function () {
        try {
            pop();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});  
