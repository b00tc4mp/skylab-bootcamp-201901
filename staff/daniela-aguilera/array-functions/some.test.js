'use strict';

describe("Some", function(){
    it("should return true or false", function(){

        var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
        var result;
        var expectedResult = true;
        result = some(words, function (element, index){
            if(element.length > 6){
              return true 
            } else {
              return false
            }
          })
          expect(result, expectedResult);
    });

    it("should break on undefined array", function(){
        try {
            some();
            throw Error("should not reach this point");
        } catch (error){
            expect(error.message, 'undefined is not an array');
        }
    });

    it("should break when dont receive a callback", function(){
        try{
            some(["hola", "como", "estas"], 5)
            throw Error ("should not reach this point");
        } catch (error){
            expect(error.message, "5 is not a function")
        }
    });
});