suite("shift", function () {
  function initialArray() {
    return [1, 2, 3];
  }

  test("should return the element deleted and change original array", function () {
    var array = initialArray();
    var expectedReturn = 1;
    var expectedArray = [2, 3];
        
    expect(shift(array), expectedReturn);
    expect(array, expectedArray);
  })

  common_throwError_array(shift);
});
