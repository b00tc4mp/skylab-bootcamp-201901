'use strict';

suite("some", function() {
  function initialArray() {
    return [1, 2, 3, 4, 5];
  }

  test("should return true when all fulfill the condition", function() {
    var array = initialArray();

    expect(some(array, function(element) { return element % 2 === 0; }), true);
    expect(array, initialArray());
  });

  test("should return false when all elements not fulfills the condition", function() {
    var array = initialArray();

    expect(some(array, function (value) { return value > 10; }), false);
    expect(array, initialArray());
  });

  common_throwError_array(some);
  common_throwError_callback(some, initialArray());

});


// console.log("Case 2");
// console.log(some(array, function (value) { return value > 10; }));
// // false
