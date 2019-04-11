'use strict';

describe('slice', function() {
    it('should return an sliced array', function() {
        var array = ['ant', 'bison', 'camel', 'duck', 'elephant'];

        var result = slice(array, 1, 3);

        var expected = ['bison', 'camel'];
        
        expect(result, expected,true);
    });

    it('should return an sliced array with start index negative', function() {
        var array = ['ant', 'bison', 'camel', 'duck', 'elephant'];

        var result = slice(array, -2);

        var expected = ['duck', 'elephant'];
        
        expect(result, expected, true);
    });

    it('should return an sliced array with end index negative', function() {
        var array = ['ant', 'bison', 'camel', 'duck', 'elephant'];

        var result = slice(array, 2, -1);

        var expected = ['camel', 'duck'];
       
        expect(result, expected, true);
    });
    
    it('should return an empty array', function() {
        var array = ['ant', 'bison', 'camel', 'duck', 'elephant'];

        var result = slice(array, 9);

        expect(result.length, 0);
    });

    it('should break on undefined array', function() {
        try {
            slice();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array')
        }
    });

    it('should break when start index is not a number and undefined', function() {
        try {
            var array = ['cat', 'dog', 'dino'];
            slice(array, 'a');
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'a is not a number');
        }
    });

    it('should break when end index is not a number and undefined', function() {
        try {
            var array = ['cat', 'dog'];
            slice(array, 2, 'a');
            throw Error('should not reach hits point');
        } catch (error){
            expect(error.message, 'a is not a number');
        }
    });
}); 