'use strict';

describe('sort', function(){
  it('Sort method will sort elements and then return the resulting array.', function() {
    var array = [12, 10, 15, 11, 14, 13, 16];
    var result = sort(array);
    var expected = [ 10, 11, 12, 13, 14, 15, 16 ];

    expect(result, expected, true);
  });

  it('will break if the array provided is undefined', function(){
    try {
      sort();

      throw Error('should not arrive here');
    } catch(error) {
      expect(error.message, 'undefined is not an array');
    }
  });

  it('will break if the callback entered is not a function', function(){
    var array = [12, 10, 15, 11, 14, 13, 16];
    var callback = 'hola';

    try {
      sort(array, callback);
    } catch(error) {
      expect(error.message, callback + ' is not a function');
    }
  });
});