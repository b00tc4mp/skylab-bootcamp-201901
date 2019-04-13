'use strict';

describe('forEach', function () {
    it('should iterate an array without altering it', function () {

        var array = [1, 2, 3];
        var resultAux = [];

        forEach(array, function (v, i) { resultAux[i] = v;});
        var check = [1, 2, 3];
        expect(check, array, true);
        
    });

    it('should break when no arguments are passed', function () {

        try{ 
            forEach();
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' no arguments are passed.');
        }
    });

    it('should break on undefined array', function () {
        try{
            var checkFunction = function (v) { return v > 5};
            forEach(function (v) { return v > 5});
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message, checkFunction + ' is not an array.');
        }
    });

    it('should break on undefined callback', function () {
        try{
            var array = [1, 2, 3];
            var num = 5;
            forEach(array, num);
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message, num + ' is not a function');
        }
    });


});