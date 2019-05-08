'use strict';

describe('join', function() {
  it('should create an output with all the items within the array', function(){
    var array = ['Fire', 'Wind', 'Rain'];

    var result = join(array);
    var expected = "Fire,Wind,Rain";

    expect(result, expected);
  });

  it('should create an output with the items separated by the provided element', function(){
    var array = ['Fire', 'Wind', 'Rain'];

    var result = join(array, '-');
    var expected = "Fire-Wind-Rain";

    expect(result, expected);
  });

  it('will break if the array provided is undefined', function(){
    try {
      join();

      throw Error('should not arrive here');
    } catch(error) {
      expect(error.message, 'undefined is not an array');
    }
  });
});