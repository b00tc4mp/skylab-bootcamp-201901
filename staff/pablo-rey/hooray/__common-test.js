'use strict';

function common_throwError_callback(functionToTest) {
  it("should break when you not pass a callback function", function() {
    try {
      functionToTest.call(new Hooray());
      throw Error("not error thrown");
    } catch (error) {
      expect(error.message, "undefined is not a function");
    }
  });  

  it("should break when you pass a callback that is not function", function() {
    try {
      functionToTest.call(new Hooray());
      throw Error("not error thrown");
    } catch (error) {
      expect(error.message, "undefined is not a function");
    }
  });     
}

