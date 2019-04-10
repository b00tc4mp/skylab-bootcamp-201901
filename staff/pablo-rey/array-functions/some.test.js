'use strict';

describe("some", function() {
  function initialArray() {
    return [1, 2, 3, 4, 5];
  }

  it("should return true when all fulfill the condition", function() {
    var array = initialArray();

    expect(some(array, function(element) { return element % 2 === 0; }), true);
    expect(array, initialArray(), true);
  });

  it("should return false when all elements not fulfills the condition", function() {
    var array = initialArray();

    expect(some(array, function (value) { return value > 10; }), false);
    expect(array, initialArray(), true);
  });

  common_throwError_array(some);
  common_throwError_callback(some, initialArray());

});


// console.log("Case 2");
// console.log(some(array, function (value) { return value > 10; }));
// // false
