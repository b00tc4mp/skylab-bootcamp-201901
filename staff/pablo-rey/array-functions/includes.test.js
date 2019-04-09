suite("includes", function () {
  function initialArray1() {
    return [1, 2, 3];
  }
  function initialArrayPets() {
    return ['cat', 'dog', 'bat'];
  }

  test("should return true if includes a present element", function () {
    var array = initialArray1();
    expect(includes(array, 2), true);
    expect(array, initialArray1());
  })

  test("should return true if includes a present element", function () {
    var array = initialArrayPets();
    expect(includes(array, 'cat'), true);
    expect(array, initialArrayPets());
  });

  test("should return false if not includes a exact coincidence", function () {
    var array = initialArrayPets();
    expect(includes(array, 'at'), false);
    expect(array, initialArrayPets());
  });

  common_throwError_array(includes);

});


