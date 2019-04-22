'use strict';

describe("Slice", function(){
    it("should returns it as a new string, without modifying the original string.", function(){
        var numbers = [1,2,3,4,5,6];
        var expectedResult = [3, 4, 5]
        var result = slice(numbers, 2, 4)

        expect(result, expectedResult, true);
    });

    it("should break if valorinicial is not a number", function(){
        try{
            slice([1,2,3,4], "a", 4);
            throw Error("should not reach this point");
        } catch(error){
            expect(error.message, "a is not a number");
        }
    });
    it("should break if valorfinal is not a number", function(){
        try{
            slice([1,2,3,4], 4, "b");
            throw Error("should not reach this point");
        } catch(error){
            expect(error.message, "b is not a number");
        }
    });
});