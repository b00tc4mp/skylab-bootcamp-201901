'use strict';

describe('reduce', function(){
    it('should return 29', function(){
        var array = [1, 2, 5, 1, 20];

        var result = reduce(array, function(anterior, actual){ return anterior + actual});

        expect(result, 29);
    });

    it('should return Aabcde', function(){
        var array = ['a', 'b', 'c', 'd', 'e'];

        var result = reduce(array, function(anterior, actual){ return anterior + actual});

        expect(result, 'abcde');
    });
    it('should break on undefined is not an array', function(){
        var array = undefined;

        try {
            reduce(array, function(){});

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined is not a function', function(){
        var array = [];

        try {
            reduce(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });

    it('should break on a is not a number', function(){
        var array = [];

        try {
            reduce(array, function(){}, 'a');

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'a is not a number');
        }
    });

});