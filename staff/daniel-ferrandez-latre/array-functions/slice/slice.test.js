describe('slice', function () {
    it('should return a sliced Array by the possition is passed by', function () {
        var array = [1, 2, 3, 4];

        var arraySliceResult = slice(array, 1);
        var arraySliceExpected = [2, 3, 4];

      
        expect(arraySliceResult, arraySliceExpected, true);
        
    });

    it('should iterate an array without altering it', function () {
        var array1 = [1, 2, 3, 4];
        var check = [1, 2, 3, 4];
        
        slice(array1, 1);
        expect(array1, check, true);
    });

    it('should break when no arguments are passed', function () {

        try{ 
            slice();
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' no arguments are passed.');
        }
    });


});
