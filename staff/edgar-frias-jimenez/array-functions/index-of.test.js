'use strict';

describe('indexOf', function() {
  it('returns the first index of the desired element', function(){
    var array = [2, 9, 9, 12, 33, 19];
    var item = 12;
    var expected = 3;

    var results = indexOf(array, item);
    expect(results, expected);
  });

  it('returns -1 if the element to find in the array doesn\'t exists', function(){
    var array = [2, 9, 9, 12, 33, 19];
    var item = 16;
    var expected = -1;

    var results = indexOf(array, item);
    expect(results, expected);
  });

  it('will break if the array passed is undefined', function(){
    try {
      var array = undefined;
      var item = 16;

      indexOf(array, item);

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'undefined is not an array');
    }
  });

  it('will break if the element passed is undefined', function(){
    try {
      var array = [2, 9, 9, 12, 33, 19];
      var item = undefined;

      indexOf(array, item);

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'undefined is not a valid element');
    }
  });

  it('will break if the element passed is not a valid element', function(){
    try {
      var array = [2, 9, 9, 12, 33, 19];
      var item = 'hola';

      indexOf(array, item);

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'hola is not a valid element');
    }
  });
});