'use strict';
describe('Lastindexof', function () {
    it('should break on undefined array', function () {
        
        try {
            lastindexOf();
            
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
    it('should break on undefined object', function () {
        var array = ['a', 'b', 'c'];

        try {
            lastindexOf(array);
            
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an object');
        }
    });
    it('should break on undefined element', function () {
        var array = ['a', 'b', 'c'];

        try {
            lastindexOf(array,'b');
            
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a number');
        }
    });
});
