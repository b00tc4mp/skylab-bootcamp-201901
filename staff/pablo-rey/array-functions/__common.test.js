'use strict';

function common_throwError_array(functionToTest) {
  test("should break when you not pass an array", function() {
    try {
      functionToTest();
      throw Error("not error thrown");
    } catch (error) {
      expect(error.message, "array param is not an array");
    }
  });
  
  test("should break when you not pass a valid array", function() {
    try {
      functionToTest(1);
      throw Error("not error thrown");
    } catch (error) {
      expect(error.message, "array param is not an array");
    }
  });
}

function common_throwError_callback(functionToTest, array) {
  test("should break when you not pass a callback function", function() {
    try {
      functionToTest(array);
      throw Error("not error thrown");
    } catch (error) {
      expect(error.message, "undefined is not a function");
    }
  });  

  test("should break when you pass a callback that is not function", function() {
    try {
      functionToTest(array);
      throw Error("not error thrown");
    } catch (error) {
      expect(error.message, "undefined is not a function");
    }
  });     
}

