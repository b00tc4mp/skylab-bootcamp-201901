# Bingo

## Introduction

Pequeño similudod del famoso juego del Bingo hecho en Javascript

## Functional description

Se ha realizado un programa que simula un Bingo. Cuando se ejecute, pedirá el nombre del jugador y se guardará. Durante el primer turno se muestra un cartón con 15 números (excluyendo el 0 siempre), para pasar al siguiente turno el usuario deberá confirmar mediante confirm() visualizándose otro número, si coincide con alguno de los existentes en el cartón, cambiará por una "X" o un 0. El cartón se mostrará, al final de cada turno, con los cambios efectuados, indicándole al usuario qué número se ha encontrado. El programa preguntará al usuario al inicio de cada turno si desea continuar, en caso de que se continúe, seguirá el mismo patrón que hasta el momento.

Cuando todos los números de una misma linea estén en "X", mostrará un mensaje "LINEA!", pero la ejecución seguirá, el juego solo acabará cuando todos los números estén a "X".

## Technical Description

En este aprtado se muestra por partes el funcionamiento del codigo.

- Función que genera el cartón sin números repetidos.

```javascript
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
```

- Función que genera el número de bombo sin repetirse y busca en el carton si está o no.

```javascript
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
```
