suite("reduce", function () {
  function initialArray() {
    return [1, 2, 3, 4];
  }

  function reducer (acc, value) { 
    return acc + value; 
  }

  test("should sum all items in the array", function () {
    var array = initialArray();
    
    expect(reduce(array, reducer), 10);
    expect(array, initialArray());    
  })

  test("should sum all items in the array with initial value", function () {
    var array = initialArray();
    
    expect(reduce(array, reducer, 5), 10);
    expect(array, initialArray());    
  })

  common_throwError_array(reduce);
  common_throwError_callback(reduce, initialArray());

})
