'use strict';

describe('push', function(){
  it('should add the given element/s to the array and return the longitude of the resulting array', function(){
    var array = [1, 2, 3, 4, 5];
    var result = push(array, 6, 5, 6);
    var expected = 8;

    expect(result, expected);
  });

  it('will break if the array provided is undefined', function(){
    try {
      push();

      throw Error('should not arrive here');
    } catch(error) {
      expect(error.message, 'undefined is not an array');
    }
  });

  it('will break if the element provided is undefined', function(){
    try {
      var array = [1, 2, 3, 4, 5];
      var element;

      push(array, element);

      throw Error('should not arrive here');
    } catch(error) {
      expect(error.message, 'undefined is not a valid element');
    }
  });


});