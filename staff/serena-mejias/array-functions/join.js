var array = ["Wind", "Rain", "Fire"];

function join(array, separator) {
  if (arguments.length > 2) throw Error("too many arguments");

  if (!(array instanceof Array)) throw TypeError("Array is not an typeof Array");

  //if (!(separator instanceof String)) throw Error("Separator is not an String");

  var string = "";

  separator = separator === undefined ? "," : separator;

  for (var i = 0; i < array.length; i++) {
    if (i === array.length - 1) {
      string += array[i];
      return string;
    }
    string += array[i] + separator;
  }
  return string;
}
console.log(join(array));
