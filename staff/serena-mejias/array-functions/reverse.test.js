suite("reverse");

test("change the order of an array", function() {
  var array = ["one", "two", "three"];

  var reversed = array.reverse();
  var expected = ['three', 'two', 'one']

  if(reversed !== expected) return 'reverse should be the same as expected.' 
});

test("change the order of an array of objects", function() {
  var array = [{a:1,b:2},{a:2,b:3},{a:4,b:5}];

  var reversed = reverse(array);
  var expected = [{a:4,b:5},{a:2,b:3},{a:1,b:2}] ;

  if(reversed !== expected) return 'reverse should be the same as expected.' 
});

test("the argument is not an array", function(){
  var error;
  try {
    reverse('serena');
  } catch (err){
    error=err;
  }
  if(error) "it should be an error"; 
})

