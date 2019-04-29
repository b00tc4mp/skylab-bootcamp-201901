/* 
CONECTA 4
---------

El programa arrancará con un panel de 6x7 (7 columnas y 6 filas) vacío, 
informando que es el turno de las piezas rojas. Cuando tire el primer jugador 
(clicando con el ratón en la columna que quiera) se colocará la ficha de su color 
en la columna correspondiente y dará el turno al segundo jugador (piezas azules). 
En cualquier momento se podrá reiniciar la partida 
(clicando al botón "Reiniciar partida") o salir (clicando al botón "Salir"). 
El programa controlará que no se tira sobre una columna llena y también 
comprobará tras cada jugada si ha ganado alguno de los jugadores o han quedado empates. 
Cuando algún jugador gane o queden en tablas se informará al usuario y 
se le pedirá si quiere volver a jugar, en ese caso la partida se reiniciará 
(borraremos el tablero y será el turno de las rojas de nuevo). 
En esta versión el usuario tendrá que hacer las tiradas del jugador 1 y del 2 
(como si fueran dos personas jugando desde el mismo ordenador). 

PRO: Se tiene que añadirla opción de jugar contra la máquina. 
Antes de iniciar la partida se le pedirá al jugador si tiene un compañero con quien jugar
o quiere jugar contra la máquina.
*/

var player = 1;//rojas
var sum = 0;
var fichas=0;
var winner=false;
var tablero = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

function selectColumn(col) {

  var row = 5;
  if(winner==false){
  if ((tablero[0][col] % 2 + tablero[1][col] % 2 + tablero[2][col] % 2 + tablero[3][col] % 2 + tablero[4][col] % 2 + tablero[5][col] % 2) < 6) {
    for (var i = 5; i >= 0; i--) {
      if (tablero[row][col] != 0 && row >= 0) {
        row--;
      }
      else {
        break;
      }
    }
    if (player == 1) {
      tablero[row][col] = 1;
      checkWinner(row, col);
      player = 3;
      document.getElementById("colorTurn").innerHTML = "Turno Azules";
    } else {
      tablero[row][col] = 3;
      checkWinner(row, col);
      player = 1;
      document.getElementById("colorTurn").innerHTML = "Turno Rojas";
    }
    fichas++;
  }
  else {
    if (player == 1) {
      player = 1;
      document.getElementById("colorTurn").innerHTML = "Turno Rojas - Columna Completa";
    } else {
      player = 3;
      document.getElementById("colorTurn").innerHTML = "Turno Azules - Columna Completa";
    }
  }
  refrescar();
  empate();
  }
  else{
    document.getElementById("colorTurn").innerHTML = "PULSA RESET PARA EMPEZAR";
  }

  

}

function checkWinner(row, col) {
  checkWinV(row, col);
  checkWinH(row, col);
  checkWinD0();
  checkWinD6();

}

function checkWinV(row, col) {

  var rowa = row;
  var rowb = row;

  sum = 0;

  for (rowa; rowa >= 0; rowa--) {
    if (tablero[rowa][col] == player) {
      sum++;
    }
    else {
      break;
    }
  }

  for (rowb; rowb < 6; rowb++) {
    if (tablero[rowb][col] == player) {
      sum++;
    }
    else {
      break;
    }
  }
  if (sum > 4) {
    youWin(player);
  }

}

function checkWinH(row, col) {

  var cola = col;
  var colb = col;
  sum = 0;

  for (cola; cola >= 0; cola--) {
    if (tablero[row][cola] == player) {
      sum++;
    }
    else {
      break;
    }
  }

  for (colb; colb < 7; colb++) {
    if (tablero[row][colb] == player) {
      sum++;
    }
    else {
      break;
    }
  }
  if (sum > 4) {
    youWin(player);
  }
}

function checkWinD0() {

  sum = 0;

  for (var i = 0; i < 6; i++) {

    if (tablero[i][i] == player) {
      sum++;
      if (sum >= 4) {
        youWin(player);
      }
    }else{
      sum=0;
    }
  }
  sum = 0;
  for (var i = 1; i < 6; i++) {

    if (tablero[i][i - 1] == player) {
      sum++;
      if (sum >= 4) {
        youWin(player);
      }
    }else{
      sum=0;
    }
  }
  sum = 0;
  for (var i = 2; i < 6; i++) {

    if (tablero[i][i - 2] == player) {
      sum++;
      if (sum >= 4) {
        youWin(player);
      }
    }else{
      sum=0;
    }
  }
  sum = 0;
  for (var i = 0; i < 6; i++) {

    if (tablero[i][i + 1] == player) {
      sum++;
      if (sum >= 4) {
        youWin(player);
      }
    }else{
      sum=0;
    }
  }
  sum = 0;
  for (var i = 0; i < 5; i++) {

    if (tablero[i][i + 2] == player) {
      sum++;
      if (sum >= 4) {
        youWin(player);
      }
    }else{
      sum=0;
    }
  }
  sum = 0;
  for (var i = 0; i < 4; i++) {

    if (tablero[i][i + 3] == player) {
      sum++;
      if (sum >= 4) {
        youWin(player);
      }
    }else{
      sum=0;
    }
  }
  sum = 0;
}

function checkWinD6() {

  sum = 0;

  for (var i = 0; i < 6; i++) {

    if (tablero[i][6 - i] == player) {
      sum++;
      if (sum >= 4) {
        youWin(player);
      }
    }
    else{
      sum=0;
    }
    
  }
  sum = 0;
  for (var i = 1; i < 6; i++) {

    if (tablero[i][7 - i] == player) {
      sum++;
      if (sum >= 4) {
        youWin(player);
      }
    }else{
      sum=0;
    }
  }
  sum = 0;
  for (var i = 2; i < 6; i++) {

    if (tablero[i][8 - i] == player) {
      sum++;
      if (sum >= 4) {
        youWin(player);
      }
    }else{
      sum=0;
    }
  }
  sum = 0;
  for (var i = 0; i < 6; i++) {

    if (tablero[i][5 - i] == player) {
      sum++;
      if (sum >= 4) {
        youWin(player);
      }
    }else{
      sum=0;
    }
  }
  sum = 0;
  for (var i = 0; i < 5; i++) {

    if (tablero[i][4 - i] == player) {
      sum++;
      if (sum >= 4) {
        youWin(player);
      }
    }else{
      sum=0;
    }
  }
  sum = 0;
  for (var i = 0; i < 4; i++) {

    if (tablero[i][3 - i] == player) {
      sum++;
      if (sum >= 4) {
        youWin(player);
      }
    }else{
      sum=0;
    }
  }
  sum = 0;
}

function youWin(player) {
  player == 1 ? document.getElementById("winPlayer").innerHTML ="HAS GANADO JUGADOR ROJO" : document.getElementById("winPlayer").innerHTML ="HAS GANADO JUGADOR AZUL";
  visible('winPlayer');
  winner=true;
  refrescar();
}

function empate(){
  if(fichas >=42){ console.log("Has empatado!");
  }
}

function refrescar() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      if (tablero[row][col] == 0) {
        document.getElementById("cell" + row + col).style.backgroundImage = "url('wood_cl.jpg')";
      } else if (tablero[row][col] == 1) { //1 for yellow
        document.getElementById("cell" + row + col).style.backgroundImage= "url('metal_red.jpg')";
      } else if (tablero[row][col] == 3) { //1 for yellow
        document.getElementById("cell" + row + col).style.backgroundImage = "url('metal_blue.jpg')";
      }
    }
  }
}

function reset() {

  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      tablero[row][col] = 0;
    }
  }
  player=1;
  fichas=0;
  sum=0;
  winner=false;
  refrescar();
}

function visible(element)
	{
	 var elemento = document.getElementById(element);
	 elemento.style.display = 'block';
    } 

function invisible(element)
	{
	 var elemento = document.getElementById(element);
	 elemento.style.display = 'none';
	} 