suite("TEST find");

test("Finds element that exists", function() {
  var error;

  var arr = [5, 12, 8, 130, 44];

    var expected = 12;

  var found = find(arr, function(v){
      return v > 10;
  });

  if(found !== 12) throw new Error('Found value does not match expected');
});


