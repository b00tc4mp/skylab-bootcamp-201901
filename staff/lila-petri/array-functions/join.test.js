'use strict'

describe('join', function(){
    it('Should return all elements of the array as a string separated by the separator', function(){
        var array=[1,2,3];
        var separator= '*_'
        var result;
        var expected='1*_2*_3'
        result=join(array, separator);

        expect(expected,result)

    });

    it('Should return all elements of the array as a string separated by commas', function(){
        var array=[1,2,3];
        var result;
        var expected='1,2,3'
        result=join(array);

        expect(expected,result)

    });

    it("should fail on undefined array", function() {
        try {
            join();
    
          throw Error("should not reach this point");
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
      });

});