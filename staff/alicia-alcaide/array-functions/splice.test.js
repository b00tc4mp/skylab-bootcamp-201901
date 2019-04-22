'use strict';

describe('splice', function () {

    it('Remov or replace existing elements and/or adding new elements ', function () {
        var array = ['Jan', 'March', 'April', 'June'];
        var expected = ['Jan', 'Feb', 'March', 'April', 'June']

        var result = splice(array,1, 0, 'Feb');
        
        expect(result, expected, true);
    });


 
    it('should break on undefined array', function () {
        try {
            splice();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });


});