suite('Filter');


test('correct functionality', function(){
    var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

    var res = filter(words, function(word){return word.length > 6});
    var expected = ["exuberant", "destruction", "present"];

    assert(res.toString() === expected.toString(), 'res should be equal to expected');
});

test('boolean passed instead of array', function () {
    
    var error;

    try {
        filter(true, function(word){return word.length > 6});
    } catch (err) {
        error = err;
    }

    if(!error) throw Error('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error('should have thrown TypeError');
});

test('Filtering out all small values', function(){
    function isBigEnough(value) {
        return value >= 10;
      }
      
      var array = [12, 5, 8, 130, 44];
      
      var res = filter(array, isBigEnough);
      var expected = [12, 130, 44];

      assert(res.toString() === expected.toString(), 'res should be equal to expected');
});

test('object passed instead of a function', function () {
    
    var error;

    try {
        filter([], {});
    } catch (err) {
        error = err;
    }

    if(!error) throw Error('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error('should have thrown TypeError');
});