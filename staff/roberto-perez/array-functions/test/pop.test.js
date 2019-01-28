suite("pop");

test('Pop element from array', function () {
  var arr = ['angel', 'clown', 'mandarin', 'sturgeon'];

  var popped = pop(arr);

  var expected = 'sturgeon';
  
  if (popped !== expected) throw Error('Joined value ' + popped + ' does not match expected ' + expected);
});

test("First argument is not array", function() {
  var error;

  var obj = "qwerty";

  var popElement;

  try {
    popElement = pop(obj);
  } catch (err) {
    error = err;
  }

  if (!error) throw Error("should have thrown an error");
  if (!(error instanceof Error)) throw Error("should have thrown TypeError");
});

test("Empty arguments return undefined", function() {
  var error;

  var arr = [];

  var popElement;

  try {
    popElement = pop(arr);
  } catch (err) {
    error = err;
  }

  if(popElement) throw Error("Empty arguments should be return undefined");
});
