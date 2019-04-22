'use strict';

describe('splice', function() {
    it('should delete the elements on the passed array and return the erased elements', function() {
        var array = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

        var result = splice(array, 2);

        var expected = ['Mar', 'Apr', 'May'];
        expect(result, expected, true);
        
        var expected = ['Jan', 'Feb'];
        expect(array, expected, true);
    });

    it('should delete the array\'s elements and add the given elements', function() {
        var array = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

        var result = splice(array, 2, 3, 'DINO');

        var expected = ['Mar', 'Apr', 'May'];
        expect(result, expected, true);

        var expected = ['Jan', 'Feb', 'DINO'];
        expect(array, expected, true);        
    });

    it('should delete the array\'s elements and add the given elements', function() {
        var array = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

        var result = splice(array, -1, 3, 'DINO');

        var expected = ['May'];
        expect(result, expected, true);

        var expected = ['Jan', 'Feb', 'Mar', 'Apr', 'DINO'];
        expect(array, expected, true);        
    });

    it('should delete the array\'s elements and add the given elements', function() {
        var array = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

        var result = splice(array, 1, -2, 'DINO');

        var expected = [];
        expect(result, expected, true);

        var expected = ['Jan', 'DINO', 'Feb', 'Mar', 'Apr', 'May'];
        expect(array, expected, true);        
    });

    it('should break with on undefined array', function() {
        try {
            splice();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break if index is not a number', function() {
        try {
            splice([1, 2, 3], 'a');
        } catch (error) {
            expect(error.message, 'a is not a number');
        }
    });
});