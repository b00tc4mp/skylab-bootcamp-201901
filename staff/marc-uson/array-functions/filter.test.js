'use strict';

suite('filter', function(){
    test('should return the given array without elements biger than 3', function(){
        var array = [1, 2, 3, 1, 2];

        var result = filter(array, function(v){return v < 3 ? true : false});

        expect(String(result), '1,2,1,2');
    });

    test('should return teh values of the given array biger than 2', function(){
        var array = [1, 2, 3, 1, 2];
        
        var result = filter(array, function(v){return v > 2 ? true : false});

        expect(String(result), '3');
    });

    test('shoud break cause no array is passed', function(){
        var array = undefined;
        try {
            filter(array, function(){});

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    test('shoud break cause no function is passed', function(){
        var array = [];
        try {
            filter(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });

});