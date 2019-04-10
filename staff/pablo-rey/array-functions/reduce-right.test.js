'use strict';

suite("reduceRight", function () {
  function initialArray () {
    return [[0, 1], [2, 3], [4, 5]];    
  }

  test("should plain an array in reverse order", function () {
    var array = initialArray();
    var expected = [4, 5, 2, 3, 0, 1];

    expect(reduceRight(array, function (acc, value) { return acc.concat(value); }), expected);
    expect(array, initialArray());
  })

  common_throwError_array(reduceRight);
  common_throwError_callback(reduceRight, initialArray());

});
