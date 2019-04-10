'use strict';

describe('sort', function () {

    it('should sort original array', function () {
        var array = ['March', 'Jan', 'Feb', 'Dec'];
        var expected = ["Dec", "Feb", "Jan", "March"]

        var result = sort(array);
        
        expect(result, expected, true);
    });





 
    it('should break on undefined array', function () {
        try {
            sort();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });


});