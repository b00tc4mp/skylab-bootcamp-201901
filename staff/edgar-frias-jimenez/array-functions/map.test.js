'use strict';

describe('map', function() {
  it('should create a new array transformed by the passed callback', function(){
    var array = [1, 5, 10, 15];
    var result = map(array, function(x) { return x * 2; });

    var expected = [2, 10, 20, 30];

    expect(result, expected, true);
  });

  it('should break if the array provided is undefined', function(){
    try {
      map();

      throw Error('should not arrive here');
    } catch(error) {
      expect(error.message, 'undefined is not an array');
    }
  });

  it('should break on undefined callback', function () {
      var array = [1, 2, 3];
      var callback;

      try {
          map(array, callback);

          throw Error('should not reach this point');
      } catch (error) {
          expect(error.message, 'undefined is not a function');
      }
  });
});