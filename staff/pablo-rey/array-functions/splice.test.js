suite("splice", function () {
  function initialArray1() {
    return ['Jan', 'March', 'April', 'June'];
  }

  function initialArray2() {
    return ['Jan', 'Feb', 'March', 'April', 'June'];
  }  

  test("should inserts at 1st index position", function() {
    var array = initialArray1();
    var expected = ['Jan', 'Feb', 'March', 'April', 'June'];

    splice(array, 1, 0, 'Feb');
    expect(array, expected);
  });

  test("should replaces 1 element at 4th index", function() {
    var array = initialArray2();
    var expected = ['Jan', 'Feb', 'March', 'April', 'May'];

    splice(array, 4, 1, 'May');
    expect(array, expected);
  });

  common_throwError_array(splice);

})


// console.log('DEMO', 'splice');

// var months = ;

// console.log("Case 1");
// 
// // inserts at 1st index position
// console.log(months);
// // expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

// console.log("Case 2");
// 
// // 
// console.log(months);
// // expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']
