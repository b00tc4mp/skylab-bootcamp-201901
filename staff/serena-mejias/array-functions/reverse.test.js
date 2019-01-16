suite("reverse");

test("change the order of an array", function() {
  var array = ["one", "two", "three"];

  var reversed = array.reverse();
  var expected = ['three', 'two', 'one']

  if(reversed !== expected) return 'reverse should be the same as expected.' 
});
