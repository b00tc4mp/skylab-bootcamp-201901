suite("indexOf", function () {
  function initialArray() {
    return ['ant', 'bison', 'camel', 'duck', 'bison'];
  }

  test("should return the index of first ocurrence", function () {
    var array = initialArray();
    
    expect(indexOf(array, 'bison'), 1);
    expect(array, initialArray());
  })

  test("should return the index of ocurrence behind fromIndex", function () {
    var array = initialArray();
    
    expect(indexOf(array, 'bison', 2), 4);
    expect(array, initialArray());
  })

  test("should return -1 if no coincidence", function () {
    var array = initialArray();
    
    expect(indexOf(array, 'giraffe'), -1);
    expect(array, initialArray());
  })

  common_throwError_array(indexOf);

});
