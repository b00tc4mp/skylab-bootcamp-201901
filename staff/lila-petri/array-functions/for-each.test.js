"use strict";

describe("forEach", function() {
  it("should itearate an array without altering it", function() {
    var array = [1, 2, 3];
    var result = [];
    forEach(array, function(v, i) {
      result[i] = v;
    });

    expect(result, array, true);

    var check = [1, 2, 3];

    expect(check, array, true);
  });

  it("should fail on undefined array", function() {
    try {
      forEach();

      throw Error("should not reach this point");
    } catch (error) {
      expect(error.message, "undefined is not an array", false);
    }
  });

  it("should fail on undefined callback", function() {
    var array = [1, 2, 3];

    try {
      forEach(array);

      throw Error("should not reach this point");
    } catch (error) {
      expect(error.message, "undefined is not a function", false);
    }
  });
});
