'use strict';

describe('filter', function(){
  it('returns a new array with the content filtered', function(){
    var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

    var result = filter(words, word => word.length > 6);
    var desired = ["exuberant", "destruction", "present"];

    expect(result.toString(), desired.toString());
  });

  it('will break if the entered element is not a valid array', function(){
    var element = 'hola';
    var callback = function isBigEnough(elemento) {
      return elemento >= 10;
    }

    try {
      filter(element, callback);
      console.log("You shouldn't get to this point");
    } catch(error) {
      expect(error.message, element + ' is not an array');
    }
  });

  it('will break if the callback entered is not a function', function(){
    var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
    var callback = 'hola';

    try {
      filter(words, callback);
    } catch(error) {
      expect(error.message, callback + ' is not a function');
    }

  });
});