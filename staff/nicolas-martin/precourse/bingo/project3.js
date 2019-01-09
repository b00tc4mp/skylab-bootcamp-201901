var rankingArray = [];
var MAX_NUMBERS = 90;
var MAX_NUMBERS_IN_CARD = 15;
var NUMBERS_IN_A_LINE = 5;
var bingoCard = [];
var NUMBER_OF_USERS = 10;

function startBingo(){
  for (var i = 0; i < NUMBER_OF_USERS; i++) {
    bingo(true);
  }
  sortCard();
  printRanking();
  bingo();
  var yourRanking = isInTop10();
  if (yourRanking <= NUMBER_OF_USERS) {
    console.log(`Felicidades! Has quedado en posición ${yourRanking}. ¡¡¡Entras en el TOP 10!!!`);
  } else {
    console.log('Lo siento :( no estás en el TOP 10');
  }
}

function isInTop10(){
  var stop = false;
  var userObject = rankingArray.pop();
  var i = 0;
  do {
    if (userObject.points > rankingArray[i].points) {
        stop = true;
    }
    i++;
  } while ((!stop) && (i < rankingArray.length));
  return i;
}

function printRanking(){
  console.log('******  RANKING - TOP 10  ******');
  for (var i = 0; i < NUMBER_OF_USERS; i++) {
      console.log(`Jugador ${i+1}. Puntos ${Math.floor(rankingArray[i].points)} `);
  }
}

function sortCard(){
  rankingArray.sort(function (a, b) {
      if (a.points > b.points) {
        return -1;
      }
      if (a.points < b.points) {
        return 1;
      }
      return 0;
  });
}

function bingo(ranking=false){
  var person = {};
  var hits = 0;
  var register = [];
  var bombo = generateBombo();
  var turn = 1;
  var lineValue = (MAX_NUMBERS*10);
  if (!ranking) {
    sayHi();
    saveCard();
    showInstructions();
  } else {
    generateCard();
  }

  person.lines = 0;
  person.points = 0;
  person.hits = 0;

  do{
    var points = 0;
    var turnValue = (MAX_NUMBERS/turn);
    var msg = '';
    person.turn = turn;
    var randomIndex = randomNumber(bombo.length, 0);
    var newBombo = bombo.splice(randomIndex, 1)[0];
    var turnObject = searchNumber(newBombo, !ranking);
    register.push(turnObject);
    if (turnObject.matched ) {
      msg += 'Encontrado el número';
      points = (turnValue * 10);
      person.points += (turnValue * 10);
      if (!ranking){console.log(`%c${msg} ${turnObject.number}`, 'color:green');}
    } else {
      msg += 'No se ha encontrado el número';
      if (!ranking){console.log(`${msg} ${turnObject.number}`);}
    }

    msg = '';

    var hits = register.filter(line => line.matched).length;
    person.hits = hits;

    var lines = checkLine();
    if (lines > person.lines){
      person.lines = lines;
      points += (turnValue * 10);
      person.points += (turnValue * lineValue);
      msg += hits !== (MAX_NUMBERS_IN_CARD) ? 'Línea!!!' : 'Bingo!!!!!!!' ;
      if (!ranking){console.log(msg);}
      msg = '';
    }
    if (!ranking){showCard();}

    msg += hits !== (MAX_NUMBERS_IN_CARD) ? `Turno ${person.turn} - Aciertos ${person.hits}` :
                    `Has conseguido BINGO en ${person.turn} turnos`;

    if (!ranking){
      console.log(msg);
      if (points !== 0){
        console.log(`PUNTOS: ${Math.floor(person.points-points)} %c+${Math.floor(points)} => %c${Math.floor(person.points)}`, "color:blue", "color:green;" );
      } else {
        console.log(`PUNTOS: ${Math.floor(person.points)}`);
      }
    }

    msg = '';
    if (!ranking){
      console.log('------------------------------------------');
      var newTurn = confirm('Siguiente turno?');
    } else {
      var newTurn = true;
    }
    turn++;
  }while ((newTurn) && (hits < MAX_NUMBERS_IN_CARD));
  rankingArray.push(person);
}

function saveCard(){
  do {
    generateCard();
    showCard();
    var continuar = confirm('¿Te gusta el cartón y deseas empezar el juego?\n\nPulsa cancelar para generar otro cartón');
  } while (!continuar);
}

function showInstructions(){
  console.log('%c========================================= SISTEMA DE PUNTOS ========================================== ', "color:#778899" );
  console.log('%cSe calculará tu puntuación media en base al nº de aciertos y líneas que consigas.', "color:#778899" );
  console.log('%cDependiendo del turno en el que te encuentres cada acierto y cada línea tendrán un valor diferente.', "color:#778899" );
  console.log('%cCuantos más turnos necesites para conseguir el BINGO menor será tu puntuación.', "color:#778899" );
  console.log('%c=================================== =================================== ============================== ', "color:#778899" );

}

function generateBombo(){
  var bombo = [];
  while (bombo.length < MAX_NUMBERS) {
    var random = randomNumber(MAX_NUMBERS+1);
    if ((bombo.length == 0) || (bombo.find(num => num === random) === undefined)){
      bombo.push(random);
    }
  }
  return bombo;
}

function checkLine(){
  var lines = 0;
  for (var i = 0; i < (MAX_NUMBERS_IN_CARD/NUMBERS_IN_A_LINE); i++) {
    var lineArray = bingoCard.slice(i*NUMBERS_IN_A_LINE, ((i*NUMBERS_IN_A_LINE)+NUMBERS_IN_A_LINE));
    if (lineArray.every(line => line.matched)){
      lines++;
    }
  }
  return lines;
}

function searchNumber(random, print = true){
    if (print){console.log(`%c${random}`, "font-weight: bold;font-size: 21px;");}
    var index = bingoCard.findIndex(line => line.number === random);
    if (index !== -1){
      bingoCard[index].matched = true;
      return bingoCard[index];
    } else {
      return {number: random, matched: false};
    }
}

function generateCard() {
   bingoCard = [];
   var random;
   do {
     random = randomNumber(MAX_NUMBERS+1);
     if ((bingoCard.length == 0) || ((bingoCard.find(line => line.number == random)) === undefined)) {
       bingoCard.push({number: random, matched: false});
     }
   }while (bingoCard.length < MAX_NUMBERS_IN_CARD);
   return bingoCard;
}

function sayHi(){
  var exit = false;
  do {
    name = prompt('¿Cuál es tu nombre?');
  } while (name === '');
  console.log(`Bienvenido ${name}`);
}

function randomNumber(max, min=1){
  return Math.floor(Math.random() * (max - min)) + min;
}

function showCard(){
  msg = '';
  bingoCard.forEach( (line, index) => {
    if (line.matched) {
      msg += 'X ';
    } else {
      msg += line.number < 10 ? `${line.number} ` : `${line.number}`;
    }

    if ((index+1) === bingoCard.length){
      msg += '';
    } else {
      msg += ((index+1) % 5 == 0) ? '\n' : ' - ';
    }
  });
  console.log('%c'+ msg, "font-size: 13px;border:1px dotted #778899;padding:10px",);
}