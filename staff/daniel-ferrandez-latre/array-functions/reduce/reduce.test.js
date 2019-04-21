describe('reduce', function () {
    it('should return the combine all elements into an Array in one', function () {
        var array = [1, 2, 5, 9, 10 ,3];

        var result = reduce(array, function(initVal, endVal) {
            return initVal + endVal;
        });
        var indexExpected = 30;
        expect(result, indexExpected);
    });

   it('should break when no arguments are passed', function () {
        try{ 
            reduce();
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' no arguments are passed.');
        }
    });

    it('should break on undefined array', function () {
        try{
            var f = function (v) { return v > 5}; 
            reduce(function (v) { return v > 5});
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message, f + ' is not an array.');
        }
    });

    it('should break on undefined callback', function () {
        try{
            var array = [1, 2, 3];
            var num = 5;
            reduce(array, num);
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message, num + ' is not a function');
        }
    });
});
