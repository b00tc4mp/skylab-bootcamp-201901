const idScreen = document.getElementById("screen")
var operation = ''
var number1 = ''
var number2 =''



function insert(num) {
  
  if ((num === '-' && idScreen.value === "0") || (num === "/" && idScreen.value === "0") || (num === "*" && idScreen.value === "0") || (num === "+" && idScreen.value === "0")) {
    return idScreen.value = "0"
  }
  idScreen.value === "0" ? idScreen.value = num : idScreen.value += num
}

function equal() {
  idScreen.value = eval(idScreen.value);
}

function cleanScreen() {
  document.getElementById("screen").value = 0;
}

function square() {
  var x = idScreen.value;
  idScreen.value = idScreen.value = Math.pow(x, 2);
}


// function decimal() {
//   if(idScreen.value.split('').filter(point => point == '.').length == 2){
//     idScreen.value.slice(0, idScreen.value.length -1)
//   }
// }