suite("slice", function () {
  function initialValue () {
    return ['ant', 'bison', 'camel', 'duck', 'elephant'];
  }

  test("should return a copy of same array, not the original one ", function () {
    var array = initialValue();

    var result = slice(array);
    expect(result, initialValue());
    expect(array, initialValue());
    expect(array === result, false);
  })

  test("should return all elements behind the position given", function () {
    var array = initialValue();
    var expected = ["camel", "duck", "elephant"];

    expect(slice(array, 2), expected);
    expect(array, initialValue());
  })

  common_throwError_array(slice);

});


// console.log('DEMO', 'slice');

// var animals = ;

// console.log("Case 1");
// console.log(slice(animals, 2));
// // expected output: Array ["camel", "duck", "elephant"]

// console.log("Case 2");
// console.log(slice(animals, 2, 4));
// // expected output: Array ["camel", "duck"]

// console.log("Case 3");
// console.log(slice(animals, 1, 5));
// // expected output: Array ["bison", "camel", "duck", "elephant"]
