suite("lastIndexOf", function() {
  function initialArray () {
    return ['Dodo', 'Tiger', 'Penguin', 'Dodo'];    
  }

  test("should return last element equal", function () {
    var array = initialArray();

    expect(lastIndexOf(array, 'Dodo'), 3);
    expect(array, initialArray());
  })

  test("should return last element equal behind position given", function () {
    var array = initialArray();

    expect(lastIndexOf(array, 'Dodo', 2), 0);
    expect(array, initialArray());
  })

  common_throwError_array(lastIndexOf);

})
