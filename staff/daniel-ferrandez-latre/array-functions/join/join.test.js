'use strict'

describe('join', function () {
    it('should return a String joined by the passed String', function () {
        var array = [1, 2, 8, 9];
        var result = join(array, '-');
        var strExpected = '1-2-8-9';

        expect(result, strExpected);
    });

    it('should return an String joined in the defaul format', function () {
        var array = [1, 2, 8, 9];
        var result = join(array);
        var strExpected = '1,2,8,9';
        expect(result, strExpected);
    });

    it('should break when no arguments are passed', function () {
        try{ 
            join();
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' no arguments are passed.');
        }
    });

    it('should break more than 2 arguments are passed', function () {
        var array1 = [1, 2, 8, 9];
        var array2 = [1, 2, 8, 9];
        var array3 = [1, 2, 8, 9];
        try{ 
            join(array1, array2, array3);
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' to many arguments passed');
        }
    });

});

