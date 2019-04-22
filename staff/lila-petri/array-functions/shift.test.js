'use strict'

describe('shift', function(){
    it('Should return the first element form the array', function(){
        var array=[1,2,3];
        var result;
        var expected=1;
        var expectedArray=[2,3];
        result=shift(array);
        expect(expected,result)
        expect(expectedArray,array, true)
    });

    it('Should return undefine in case of empty array', function(){
        var array=[];
        var result;
        var expected=undefined;
       
        result=shift(array);

        expect(expected,result)
        

    });

    it("should fail on undefined array", function() {
        try {
            shift();
    
          throw Error("should not reach this point");
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
      });

});