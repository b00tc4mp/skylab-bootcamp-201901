describe('pop', function () {
    it('Should return the array with the new index', function () {
        var answer = [1, 2];
        var a = [1, 2, 3];
        
        try {
            var result = pop(a);

        throw Error('should not reach this point');
    } catch (error) {

        expect(result, answer, true);
    }
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
