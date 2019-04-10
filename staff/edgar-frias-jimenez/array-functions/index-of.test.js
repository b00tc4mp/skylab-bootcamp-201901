'use strict';

describe('indexOf', function() {
  it('returns the first index of the desired element', function(){
    var array = [2, 9, 9, 12, 33, 19];
    var item = 2;

    var expected = 0;

    var results = indexOf(array, item);

    expect(results, expected);
  });
});