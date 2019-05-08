'use strict'

describe('map', function () {

    it('should succeed to make an array with numbers multiplied by 2', function () {

        var array = [1, 2, 3, 4, 5];
        var expectedResult = [2,4,6,8,10];

        var newArray = map(array, function (element) {
            return element*2;
        })

        expect(newArray.toString(), expectedResult.toString());
    })
    
})