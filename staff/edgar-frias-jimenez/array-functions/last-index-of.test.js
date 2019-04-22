'use strict';

describe('lastIndexOf', function() {
  it('should returns the last index of an element inside the array.', function() {
    var array = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];
    var result = lastIndexOf(array, 'Dodo');
    var expected = 3;

    expect(result, expected);
  });

  it('should return -1 if the element is not inside the given array.', function() {
    var array = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];
    var result = lastIndexOf(array, 'Panda');
    var expected = -1;

    expect(result, expected);
  });

  it('will break if the array provided is undefined', function(){
    try {
      lastIndexOf();

      throw Error('should not arrive here');
    } catch(error) {
      expect(error.message, 'undefined is not an array');
    }
  });

  it('will break if the element provided is undefined', function(){
    try {
      var array = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];
      var element;

      lastIndexOf(array, element);

      throw Error('should not arrive here');
    } catch(error) {
      expect(error.message, 'undefined is not a valid element');
    }
  });
});
