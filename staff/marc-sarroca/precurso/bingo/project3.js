//Bingo
//Usuario bienvenida
var person = prompt("Inserta tu nombre de usuario");
if (person != null) {
  console.log("Bienvenido " + person);
} else {
  console.log("Inserta el nombre");
}

//Generador de carton

var carton = [];
var tempNum = 0;

function cartonGenerator() {
  while (carton.length < 15) {
    tempNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    if (carton.indexOf(tempNum) === -1) {
      carton.push(tempNum);
    }
  }
  confirm("Estos son tus numeros: " + carton);
  confirm("Comienza el Bingo!");
}
cartonGenerator();

//Generador de numero + buscador de numero en carton

var matched = 0;
var bomboRepeat = [];
var repeated = false;
var bomboNumber = 0;

function numBombo() {
  do {
    do {
      bomboNumber = Math.floor(Math.random() * 20) + 1;
      if (bomboRepeat.indexOf(bomboNumber) === -1) {
        repeated = false;
        bomboRepeat.push(bomboNumber);
      } else {
        repeated = true;
      }
    } while (repeated === true);

    if (carton.lastIndexOf(bomboNumber) === -1) {
      confirm("No esta en el carton " + bomboNumber + " => " + carton);
    } else {
      matched++;
      confirm("El numero " + bomboNumber + " esta en tu carton " + carton);
      carton[carton.lastIndexOf(bomboNumber)] = "X";
      confirm(
        "Ha salido el numero: " +
          bomboNumber +
          " => " +
          " Tu carton queda asi: " +
          carton
      );
    }
  } while (matched < carton.length);
  confirm("BINGOOOOOOOOOOOOOOO!!");
}

numBombo();








