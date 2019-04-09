suite("map", function () {
  function initialValue () {
    return [1, 4, 9, 16];
  }
  test("should return elements value doubled", function () {
    var array = initialValue();
    var expected = [2, 8, 18, 32];

    expect(map(array, function (v) { return v * 2; }), expected);
    expect(array, initialValue());
  })

  common_throwError_array(map);
  common_throwError_callback(map, initialValue());
});
