'use strict';

describe('splice', function () {
    it('should return the delate elements', function () {
        var array = ['Jan', 'Feb', 'Mar'];
        var result = splice(array, 1)
        var expected = ['Feb', 'Mar']
        var expected2 = ['Jan']

        expect(result, expected, true);
        expect(array, expected2, true);
    });
    it('should return the delate elements with a negative number', function () {
        var array = ['Jan', 'Feb', 'Mar'];
        var result = splice(array, -1)
        var expected = ['Mar']
        var expected2 = ['Jan', 'Feb']

        expect(result, expected, true);
        // expect(result,expected2,true);
    });
    it('should fail when not pass an array', function(){
        try{
            splice();
            throw Error('should not reach this point');
        }catch(error){
            expect(error.message, 'undefined is not an array');
        }
    });
});