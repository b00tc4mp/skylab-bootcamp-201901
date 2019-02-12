var months = ["Jan", "March", "April", "May"];

function splice(array, index, elemdel, value) {
  var newArray = [];

  /*!index ? 0 : index;
  !elemdel ? 0 : elemdel;
  !value ? "" : value;*/

  if (elemdel !== 0) {
    for (var j = index; j < index + elemdel; j++) {
      newArray = array[j];
      delete array[j];
      console.log(array);
      
    }

    for (var i = index; i < array.length; i++) {
      array[i] = array[i + 1];
      if (!array[i]) {
        delete array[i];
        console.log(array);
        
      }
    }
  }

  if (!!value) {
    var temp = [];
    for (var i = 0; i < index; i++) {
      temp[i] = array[i];
    }
    for (var j = index; j < array.length; j++) {
      if (j === index) {
        temp[j] = value;
        temp[j + 1] = array[j];
      } else {
        temp[j + 1] = array[j];
      }
    }
    for (var k = 0; k < temp.length; k++) {
      array[k] = temp[k];
    }
  }

  return array;
}
console.log(splice(months, 1, 2));
