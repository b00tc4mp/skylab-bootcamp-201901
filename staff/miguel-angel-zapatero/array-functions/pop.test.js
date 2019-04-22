'use strict';

describe('pop', function() {
    it('should removes the last element and return it', function() {
        var array = ['camel', 'bison', 'dino'];

        var result = pop(array);

        expect(result, 'dino');
        expect(array.length, 2);
    });

    it('should break on undefined array', function() {
        try {
            pop();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array')
        }
    });
}); 