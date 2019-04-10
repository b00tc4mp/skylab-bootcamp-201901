'use strict';
describe('splice', function () {
    it('should delate some elements and add anothers', function () {
        var numbers = [1, 2, 3, 4, 5, 6];
        var result = splice(numbers, 2, 1, 'a', 'b');  // [1, 2, "a", "b", 4, 5, 6];     
        var expected = [1, 2, "a", "b", 4, 5, 6];
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
    it('should break on undefined callback', function () {
        var numbers = [1, 2, 3, 4, 5, 6];
        try {
            splice(numbers, 'string');
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'string is not a number');
        }
    });
});