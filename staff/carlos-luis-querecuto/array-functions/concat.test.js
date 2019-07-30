'use strict';

describe('concat', function () {
    it('should break on undefined array1', function () {
        var array1;
        var array2 = ['a', 'b', 'c'];
        
        try {
            concat(array1,array2);
            
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined array2', function () {
        var array1 = ['a', 'b', 'c'];
        var array2;
        
        try {
            concat(array1,array2);
            
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});



