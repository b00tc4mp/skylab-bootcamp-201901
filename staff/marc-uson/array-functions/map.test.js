'use strict';

describe('map', function(){
    it('should return the given array transformed with the function operation', function(){
        var array = [1, 2, 5, 1, 20];

        var result = map(array, function(value){return value * 2});

        expect(String(result), '2,4,10,2,40');
    });

    it('should return the given array transformed with the function operation', function(){
        var array = [1, 2, 5, 1, 20];

        var result = map(array, function(value){return value / 2});

        expect(String(result), '0.5,1,2.5,0.5,10');
    });

    it('should break on undefined is not an array', function(){
        var array = undefined;

        try {
            map(array, function(){});

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined is not a function', function(){
        var array = [];

        try {
            map(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});
