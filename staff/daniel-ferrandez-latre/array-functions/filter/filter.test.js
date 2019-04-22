'use strict';

describe('filter', function () {

    it('should return a new array filled just by filtered number values', function () {
        var array = [1, 2, 5, 9, 10 ,3];

        var result = filter(array, function (v) { return v > 5; });
        var arrayExpected = [9, 10];

        for (var i in result) {
            expect(result[i], arrayExpected[i]);
        }
    });

    it('should return a new array filled just by filtered String values', function () {
        var array = ['a', 'd', 's', 'a', 'a' ,'s'];

        var result = filter(array, function (v) { return v === 'a'; });
        var arrayExpected = ['a', 'a', 'a'];

        for (var i in result) {
            expect(result[i], arrayExpected[i]);
        }
    });

    it('should break when no arguments are passed', function () {
        try{ 
            filter();
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' no arguments are passed.');
        }
    });

    it('should break on undefined array', function () {
        try{
            var f = function (v) { return v > 5}; 
            filter(function (v) { return v > 5});
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message, f + ' is not an array.');
        }
    });

    it('should break on undefined callback', function () {
        try{
            var array = [1, 2, 3];
            var num = 5;
            filter(array, num);
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message, num + ' is not a function');
        }
    });

    

});
