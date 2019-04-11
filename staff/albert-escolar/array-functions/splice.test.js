'use strict'


describe('splice', function () {
    it('should return the erased items', function () {

        var array = ['Jan','Feb','March'];
        var expected = ['Feb', 'March']
        var expected2 =['Jan']
        var result = splice(array,1);

        expect(result, expected, true);
        expect(array, expected2, true);
    })

    it('should return the erased items', function () {

        var array = ['Jan','Feb','March'];
        var expected = ['March']
        var expected2 =['Jan','Feb']
        var result = splice(array,-1);

        expect(result, expected, true);
        expect(array, expected2, true);
    })



})