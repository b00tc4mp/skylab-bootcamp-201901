describe('shift', function () {
    it('should return the value of the first possion of the given array, and then delete this possition and rearrange', function () {
        var array = [1, 2, 3, 4];

        shift(array);
        var arrayShiftedExpected = [2, 3, 4];

        for(var i in array) {
            expect(array[i], arrayShiftedExpected[i]);
        }
    });

    it('should break when no arguments are passed', function () {
        try{ 
            shift();
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' no arguments are passed.');
        }
    });
  
    it('should break when arrgument is not an array', function () {
        try{ 
            var badArgument = 325.5
            shift(badArgument);
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' is not an array.');
        }
    });
});
