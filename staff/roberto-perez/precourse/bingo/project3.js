const bingo = function() {

  // Generar números aleatorios desde min a max
  const generateRandomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Generar un array con los 99 números del bombo
  const bingoNumbersGenerator = function() {
    return Array.from({length: 100}, (v, k) => k+1);
  }

  // Existe el item dentro del array multidimensioanl?
  const isItemInArray = function(item, arr) {
    return arr.some(x => x.some(y => y.number === item));
  }

  // Remplazar item por 'X' en array multidimensioanl
  const itemInArrayReplace = function(item, arr) {
    return arr.map(x => {
      return x.map(y => {
        if(y.number === item) {
          y.number = 'X';
          y.matched = true;
        }
        return y;
      })
    });
  }

  // Generar cartón
  const bingoCardGenerator = function() {
    let bingoCard = [];
    for(let i = 0; i < 3; i++) {
      bingoCard[i] = [];
      for(let j = 0; j < 5; j++) {
        do {
          let randomNumber = generateRandomNumber(1, 100);
          if(!isItemInArray(randomNumber, bingoCard)){
            bingoCard[i][j] = {
              number: randomNumber,
              matched: false
            };
          }
        } while(typeof bingoCard[i][j] === 'undefined');
      }
    }
    return bingoCard;
  };

  // Mostrar cartón por consola
  const showBingoCard = function() {
    let i = 1;
    console.log('Tu puntuación: ' + points);
    for(row of bingoCard) {
      let elementPrint = '[' + i + ']';
      for(element of row) {
        elementPrint += '\t' + element.number;
      }
      i++;
      console.log(elementPrint);
    }
  }

  // Comprobar BINGO
  const bingoCardCompleted = function() {
    return bingoCard.every(x => x.every(y => y.matched));
  }

  // Comprobar LÍNEA
  const bingoCardLine = function() {
    return bingoCard.some(x => x.every(y => y.matched));
  }

  // Preguntar turno
  const askTurn = function() {
    window.confirm('¿Quiere continuar jugando?') ? newTurn() : endGame();
  }

  // Nuevo turno
  const newTurn = function() {
    let randomIndex = generateRandomNumber(0, (bingoNumbers.length - 1));
    console.log('El ' + bingoNumbers[randomIndex] + '!');

    if(isItemInArray(bingoNumbers[randomIndex], bingoCard)){
      bingoCard = itemInArrayReplace(bingoNumbers[randomIndex], bingoCard);
      console.log('ACIERTO!');
      if(bingoCardCompleted()) {
        bingo = true;
        endGame('BINGO!');
        showBingoCard();
        return;
      }
      if(!line && bingoCardLine()) {
        line = true;
        console.log('LINEA!');
      }
      showBingoCard();
    }
    points--;
    bingoNumbers.splice(randomIndex, 1);
    askTurn();
  }

  // Fin del juego
  const endGame = function(msg = 'Ciao!') {
    console.log(msg);
  }

  let points = 100;
  let line = false;
  let bingo = false;
  let bingoNumbers = bingoNumbersGenerator();
  let bingoCard;
  let like;


  do {
      bingoCard = bingoCardGenerator();
      showBingoCard();
      like = prompt('¿Quieres este cartón? [yes|no]')
  }while(like !== 'yes');

  askTurn();

  return (bingo) ? points : 0;
}


let user;
let nextGame;
let ranking = [];

do {
  do {
    user = prompt('¿Cual es tu nombre?');
  } while(user === '');
  if(user === null) break;

  ranking.push({
    user: user,
    points: bingo(user)
  });
  nextGame = prompt('¿Nueva partida? [yes|no]');

} while(nextGame === 'yes' || nextGame === '');



for(userRank of ranking.sort((a, b) => b.points - a.points)) {
  console.log(`${userRank.user} => ${userRank.points} puntos`);
}
