//var array = ["one", "two", "three","four","five"];
var array = [{a:1,b:2},{a:2,b:3},{a:4,b:5}]

function reverse(array) {
  for (var i = 0; i < Math.floor(array.length/2); i++) {
    var n = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = n;
    
  }
  return array;
}
reverse(array);
