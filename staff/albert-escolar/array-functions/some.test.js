'use strict'

describe('some', function () {
    it('should return true when any item inside the array matches the condition.', function () {

        var array = [1, 2, 3, 4];
        var result = some(array, function (element) {
            if (element > 2) {
                return true;
            } else {
                return false;
            }
        });

        expect(result, true);
    });

    it('should return false when no items inside the array doesnt match the condition.', function () {

        var array = [1, 2, 3, 4];
        var result = some(array, function (element) {
            if (element > 10) {
                return true;
            } else {
                return false;
            }
        });

        expect(result, false);
    });
    it('should fail when given an undefined array.', function () {
        try{
            some();
            throw Error('should not reach this point')
        }catch(error){
            expect(error.message, 'undefined is not an array')
        }
    });
    it('should fail when given an undefined callback.', function () {
        try{
            some([1,2,3]);
            throw Error('should not reach this point')
        }catch(error){
            expect(error.message, 'undefined is not a function')
        }
    });

});