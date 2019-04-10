'use strict';

suite("reverse", function(){
    test("reverse the direction of the elements, GOOD implementation", function(){
        let array = ["Aguilera", "Daniela"]
        let expectedResult = ["Daniela", "Aguilera"]
        let result = [];

       result = reverse(array)
    
       for (var i in expectedResult){
           expect(result[i], expectedResult[i]);
       }        
    })
    test("Should break on undefined array", function(){
        try {
            let notArray = 8;
            reverse(notArray)
            throw Error("Should not reach this point")
        } catch (error){
            expect(error.message, "8 is not an array")
        }
    })
});