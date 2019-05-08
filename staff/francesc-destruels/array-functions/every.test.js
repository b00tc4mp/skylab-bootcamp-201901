
describe('every', function () {
    it('should return true on all items matching condition', function () {
        var array =  [5, 2, 6];

        var result = every(array, function (v) { return v > 0; });
        
        try {
            every();

            throw Error('should not reach this point');
        } catch (error) {
            expect(result, true);
        }
    });


    it('should return false on any of the items not matching the condition', function () {
        var array =  [5, 2, 6];

        var result = every(array, function (v) { return v < 2;});

        try {
            every();

            throw Error('should not reach this point');
        } catch (error) {
            expect(result, false);
        }
    });

    it('should break on undefined array', function () {
        try {
            every();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined callback', function () {
        var array = [5, 2, 6];

        try {
            every(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});