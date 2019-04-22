'use strict';

describe('some', function(){
    it('shoud return true cause some element in the array matches the function call', function(){
        var array = [1, 2, 5, 1, 20];
        
        var result = some(array, function(element){return (element===5);});

        expect(result, true);
    });

    it('shoud return false cause some element in the array matches the function call', function(){
        var array = ['a', 'b', 'c', 'd', 'e'];
        
        var result = some(array, function(element){return (element===5);});

        expect(result, false);
    });

    it('should break on undefined is not an array', function(){
        var array = undefined;

        try {
            var result = some(array, function(){});
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }

    });

    it('should break on undefined is not a function', function(){
        var array = [];

        try {
            var result = some(array);
            
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }

    });
});
