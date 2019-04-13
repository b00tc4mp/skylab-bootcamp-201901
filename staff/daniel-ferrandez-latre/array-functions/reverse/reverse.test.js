describe('reverse', function () {
    it('should return a reversed array', function () {
        var array = [1, 2, 3, 4];

        reverse(array);
        var arrayReversedExpected = [4, 3, 2, 1];
        for(var i in array) {
            expect(array[i], arrayReversedExpected[i]);
        }
    });

    it('should break when no arguments are passed', function () {
        try{ 
            reverse();
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' no arguments are passed.');
        }
    });
  
    it('should break when arrgument is not an array', function () {
        try{ 
            var badArgument = 325.5
            reverse(badArgument);
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' is not an array.');
        }
    });
});
