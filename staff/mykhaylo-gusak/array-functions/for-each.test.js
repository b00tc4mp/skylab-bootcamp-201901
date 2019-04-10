'use strict';

describe('_forEach', function () {
    it('should itearate an array without altering it', function () {
        var array = [1, 2, 3];

        var result = [] // [1,2,3]
        
        var check = [1, 2, 3];

        forEach(array, function (v, i) { result[i] = v; });
        //  1
        //  2
        //  3
    
        expect(result, check);

    });

    it('should break on undefined array', function () {
        try {
            forEach();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined callback', function () {
        var array = [1, 2, 3];

        try {
            forEach(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });

});