'use strict'

describe('slice', function(){
    it('Should a copy of the array form index to the end index', function(){
        var array=[1,2,3,4,5,6];
        var index=2;
        var indexEnd=4;
        var result;
        var expected=[3,4];
        var expectedArray=[1,2,3,4,5,6];
        result=slice(array, index, indexEnd);
        expect(expected,result,true)
        expect(expectedArray,array, true)
    });

    it("should fail on undefined arguments", function() {
        try {
            slice();
    
          throw Error("should not reach this point");
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
      });

});