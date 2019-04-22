'use strict';

describe('splice', function(){
  it('changes the content of an array by adding new content.', function(){
    var array = ['Jan', 'March', 'April', 'June'];
    var result = splice(array, 0, 0, 'Feb');
    var expected = [];

    expect(result, expected, true);

    // The array given should had a new item at the start
    var expected2 = ['Feb', 'Jan', 'March', 'April', 'June'];
    expect(array, expected2, true);
  });

  it('should break if startCount is not a number', function() {
    try {
      var array = ['Jan', 'March', 'April', 'June'];
      splice(array, 'hola', 0);

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'hola is not a number');
    }
  });

  it('does nothing if only startCount is given and has the same length of the array.', function(){
    var array = ['Jan', 'March', 'April', 'June'];
    var result = splice(array, 4);
    var expected = [];

    expect(result, expected, true);
  });

  it('start counting from the end of the array if only startCount is given and is negative.', function(){
    var array = ['Jan', 'March', 'April', 'June'];
    var result = splice(array, -2);
    var expected = ['April', 'June'];

    expect(result, expected, true);
  });

  it('erase the entire array if only startCount is given, is negative and has the same length or more than the array.', function(){
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var result = splice(array, -10);
    var expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    expect(result, expected, true);
  });

  it('should consider deleteCount 0 if is not a number', function() {
    var array = ['Jan', 'March', 'April', 'June'];
    var result = splice(array, 0, 'hola');
    var expected = [];

    expect(result, expected, true);
  });

  it('has to return empty array, and do nothing to the original array, if deleteCount is <= 0.', function(){
    var array = ['Jan', 'March', 'April', 'June'];
    var result = splice(array, 0, 0);
    var expected = [];

    expect(result, expected, true);
  });

  it('has to erase the elements corresponding with the number passed, and return the erased content.', function(){
    var array = ['Jan', 'March', 'April', 'June'];
    var result = splice(array, 0, 2);
    var expected = ['Jan', 'March'];

    expect(result, expected, true);
  });

  it('should erase the entire array if deleteCount is the same amount of array.length and has to return the array of all the content erased.', function(){
    var array = ['Jan', 'March', 'April', 'June'];
    var result = splice(array, 0, 4);
    var expected = ['Jan', 'March', 'April', 'June'];

    expect(result, expected, true);
  });

});
