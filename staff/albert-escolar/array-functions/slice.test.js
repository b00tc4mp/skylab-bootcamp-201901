'use strict'

describe('slice',function(){

    it('should return an array with elements from 1 to 3, giving start: 1 and end:3 to the array', function(){

        var array = [1,2,3,4];
        var expected = [2,3];
        var result = slice(array, 1,3);


        expect(result, expected, true);
        
    })

    it('should return an array only giving it a start',function(){

        var array = [1,2,3,4];
        var expected = [2,3,4];
        var result = slice(array,1);

        expect(result, expected, true);

    })


    it('should return an array only giving it a negative start',function(){

        var array = [1,2,3,4];
        var expected = [1,2,3];
        var result = slice(array,-2);

        expect(result, expected, true);
        
    })



})