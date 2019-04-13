describe('isArray', function () {
    it('should return return true in case the given element is an Array', function () {
        var array = [1, 2, 5, 9, 10 ,3];

        var result = isArray(array);
        var booleanExpected = true;

        expect(result, booleanExpected);
    });

    it('should break when no arguments are passed', function () {

        try{ 
            isArray();
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' no arguments are passed.');
        }

    });

    it('should break when more than one argument is passed', function () {
        var arg1 = 2;
        var arg2 = 5;
        try{ 
            isArray(arg1, arg2);
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' to many arguments passed.');
        }

    });

});
