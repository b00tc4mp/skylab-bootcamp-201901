/* eslint-disable no-console */
const numLines = 3;
const numColumns = 5;
const maxNumbers = 99;

function getRandom(goneNumbers) {
  const generateRandom = () => Math.ceil(Math.random() * maxNumbers);
  let newNumber = generateRandom();
  if (goneNumbers !== undefined) {
    while (goneNumbers.includes(newNumber)) {
      newNumber = generateRandom();
    }
    goneNumbers.push(newNumber);
  }
  return newNumber;
}

class BingoCard {
  constructor() {
    this.NUMBER_MATCHED = 'number_matched';
    this.LINE_COMPLETED = 'line_completed';
    this.CARD_COMPLETED = 'card_completed';
    this.columns = numColumns;
    this.lines = numLines;
    this.totalCardNumbers = this.columns * this.lines;
    this.maxNumbers = maxNumbers;
    this.tries = 0;
    this.cardNumbers = [];
    for (let i = 0; i < this.totalCardNumbers; i++) {
      let randomNumber = getRandom();
      while (this.exist(randomNumber)) {
        randomNumber = getRandom();
      }
      this.cardNumbers[i] = {
        number: randomNumber,
        matched: false,
        line: Math.floor(i / this.columns),
      };
    }
  }

  showPointSystem() {
    console.log('POINT SYSTEM');
    console.log('------------');
    console.log(`${this.totalCardNumbers} tries = 1000 points`);
    console.log(`${this.totalCardNumbers + 1} tries = 500 points`);
    console.log(`${this.totalCardNumbers + 2} tries = 300 points`);
    console.log(`${this.totalCardNumbers + 3} tries = 200 points`);
    console.log(`${this.totalCardNumbers + 4} tries = 150 points`);
    console.log(`>${this.totalCardNumbers + 5} tries = 100 points - 1 points extra try from ${this.totalCardNumbers + 6} No negative points.`);
    console.log('Every line: +150 point');
  }

  points() {
    const triesAboveMinimum = this.tries - this.totalCardNumbers;
    let result = 0;
    switch (triesAboveMinimum) {
      case 0:
        result = 1000;
        break;
      case 1:
        result = 500;
        break;
      case 2:
        result = 300;
        break;
      case 3:
        result = 200;
        break;
      case 4:
        result = 200;
        break;
      default:
        result = 100 - (triesAboveMinimum + 5);
        break;
    }
    return Math.max(result, 0) + this.linesCompleted().length * 150;
  }

  findIndex(number) {
    return this.cardNumbers.findIndex(cardNumber => cardNumber.number === number);
  }

  exist(number) {
    return this.cardNumbers.some(cardNumber => cardNumber.number === number);
  }

  linesCompleted() {
    const checkLines = [];
    for (let i = 0; i < this.totalCardNumbers; i++) {
      const { line, matched } = this.cardNumbers[i];
      if (checkLines[line] === undefined) {
        checkLines[line] = true;
      }
      checkLines[line] = checkLines[line] && matched;
    }
    return checkLines.filter(line => line);
  }

  cardCompleted() {
    return this.cardNumbers.every(cardNumber => cardNumber.matched);
  }

  mark(num) {
    const oldLinesCompleted = this.linesCompleted().length;
    this.tries++;
    if (this.exist(num)) {
      this.cardNumbers[this.findIndex(num)].matched = true;
      if (this.cardCompleted()) {
        return this.CARD_COMPLETED;
      }
      const newLinesCompleted = this.linesCompleted().length;
      if (oldLinesCompleted !== newLinesCompleted) {
        return this.LINE_COMPLETED;
      }
      return this.NUMBER_MATCHED;
    }
    return false;
  }

  toStr(lastNumber) {
    let str = '';
    for (let i = 0; i < this.totalCardNumbers; i++) {
      if (i === 0) {
        str += '|';
      } else if (i % this.columns === 0) {
        str += '\n|';
      }
      const cardNumber = this.cardNumbers[i];
      if (cardNumber.matched) {
        str += cardNumber.number === lastNumber ? '**' : 'XX';
      } else {
        str += cardNumber.number.toString().padStart(2, ' ');
      }
      str += '|';
    }
    return str;
  }

  show(lastNumber) {
    console.log(this.toStr(lastNumber));
  }
}

class BingoPlayer {
  constructor(name, cards) {
    this.name = name;
    this.cards = cards === undefined ? [] : cards;
    this.points = 0;

    this.NUMBER_MATCHED = 'number_matched';
    this.LINE_COMPLETED = 'line_completed';
    this.CARD_COMPLETED = 'card_completed';
  }

  mark(num) {
    const cardEvents = {};
    cardEvents[this.CARD_COMPLETED] = 0;
    cardEvents[this.LINE_COMPLETED] = 0;
    cardEvents[this.NUMBER_MATCHED] = 0;
    this.cards.forEach((card) => {
      const event = card.mark(num);
      if (event) {
        cardEvents[event]++;
      }
    });
    return cardEvents;
  }

  someCompleted() {
    return this.cards.some(card => card.cardCompleted());
  }

  totalizePointsAndReset() {
    this.cards.forEach((card) => {
      this.points += card.points();
    });
    this.cards = [];
  }
}

function chooseBingoCard() {
  let card = null;
  while (card === null) {
    card = new BingoCard();
    card.show();
    let okCard;
    do {
      okCard = prompt('Do you like this card? (y/n)');
    } while (!/^(y|n)$/i.test(okCard));
    if (okCard.toLowerCase() === 'n') {
      card = null;
    }
  }
  return card;
}

function showMultipleCards(bingoPlayers, newNumber) {
  let result = '';
  for (let p = 0; p < bingoPlayers.length; p++) { // Players
    const { name, cards } = bingoPlayers[p];
    result += `${name.padEnd(22, '*')}\n`;
    for (let strLine = 0; strLine < numLines; strLine++) {
      for (let c = 0; c < cards.length; c++) { // Every card in each player
        const linesCard = cards[c].toStr(newNumber).split('\n');
        result += linesCard[strLine].padEnd(22, ' ');
      }
      result += '\n';
    }
    result += '\n';
  }
  return result;
}

function registerPlayersAndChooseCards(players, addNewPlayers) {
  let numNewPlayers = 0;
  if (addNewPlayers) {
    numNewPlayers = Number.parseInt(prompt('How many players to add? '));
  }
  for (let i = 0; i < numNewPlayers; i++) {
    const name = prompt(`What's your name (Player ${players.length + 1})? `);
    players.push(new BingoPlayer(name));
  }

  for (let p = 0; p < players.length; p++) {
    const { name, cards } = players[p];
    let numCards;
    do {
      numCards = Number.parseInt(prompt(`Hi, ${name}. How many cards do you want? `));
    } while (Number.isNaN(numCards));
    for (let c = 0; c < numCards; c++) {
      cards.push(chooseBingoCard());
    }
  }
}

function singleCardGame() {
  // First dev approach
  const name = prompt('What\'s your name ? ');
  const bingoCard = chooseBingoCard();
  bingoCard.showPointSystem();
  console.log("Let's play...");

  const goneNumbers = [];
  let linesCompleted = [];

  let confirm;
  while (!bingoCard.cardCompleted() || confirm === 'quit') {
    let newNumber = getRandom();
    while (goneNumbers.includes(newNumber)) {
      newNumber = getRandom();
    }
    goneNumbers.push(newNumber);
    bingoCard.mark(newNumber);
    if (bingoCard.exist(newNumber)) {
      console.log(`${newNumber} --> Matched!!`);
      bingoCard.show(newNumber);
      if (bingoCard.cardCompleted()) {
        console.log('B-I-N-G-O!!!!!!!');
      } else {
        const statusLines = bingoCard.linesCompleted();
        if (statusLines.length !== linesCompleted.length) {
          // NEW LINE
          console.log('NEW L-I-N-E!!!!!!');
          linesCompleted = [...statusLines];
        }
      }
    } else {
      console.log(`${newNumber} --> Not matched`);
    }
    confirm = prompt('Confirm to continue (quit to exit): ');
  }

  console.log(`>>> total turns: ${goneNumbers.length}`);
  console.log(`>>> Points for ${name}: ${bingoCard.points()}`);
  console.log(`Bye ${name}`);
}
function multiplePlayersGame(players) {
  const goneNumbers = [];

  if (players.length === 0) {
    alert('Upps, no players! You need to add players before play.');
    return;
  }

  players[0].cards[0].showPointSystem();
  console.log('Players and final cards');
  console.log(showMultipleCards(players));
  console.log("Let's play...");

  const COMPLETED = 'completed';
  let confirm = '';
  while (confirm !== COMPLETED && confirm !== 'quit') {
    const newNumber = getRandom(goneNumbers);
    let matched = false;
    console.log(`New number: ${newNumber}`);
    for (let p = 0; p < players.length; p++) {
      const player = players[p];
      const playerEvents = player.mark(newNumber);
      if (playerEvents[player.CARD_COMPLETED] !== 0) {
        console.log(`${player.name} BINGO!!!! `);
        confirm = COMPLETED;
        matched = true;
      } else if (playerEvents[player.LINE_COMPLETED] !== 0) {
        console.log(`${player.name} ${playerEvents[player.LINE_COMPLETED]} NEW LINE${playerEvents[player.LINE_COMPLETED] > 1 ? 'S' : ''}!! `);
        matched = true;
      } else if (playerEvents[player.NUMBER_MATCHED] !== 0) {
        console.log(`${player.name} ${playerEvents[player.NUMBER_MATCHED]} card(s) with number matched`);
        matched = true;
      }
    }
    if (matched) {
      console.log(showMultipleCards(players, newNumber));
    } else {
      console.log(`${newNumber} not matched`);
    }

    if (confirm !== COMPLETED) {
      confirm = prompt('Confirm to continue (quit to exit): ').toLowerCase();
    }
  }

  const playersWon = [];
  console.log('POINT RESULTS AFTER THIS ROUND');
  let table = [];
  players.forEach((player) => {
    if (player.someCompleted()) {
      playersWon.push(player.name);
    }
    player.totalizePointsAndReset();
    table.push({
      name: player.name,
      points: player.points,
    });
  });
  console.log(`>>> total turns: ${goneNumbers.length}`);
  if (playersWon.length === 1) {
    console.log(`${playersWon[0]} won this turn`);
  } else {
    console.log(`ohhh, DRAW!!!!! ${playersWon.toString()} won this turn`);
  }
  table.sort((player1, player2) => player2.points - player1.points);
  table = table.map((player, index) => {
    return { ranking: index + 1, ...player };
  });
  console.table(table);
}


function bingoCasino() {
  const players = [];

  let newGame = 'add';
  do {
    registerPlayersAndChooseCards(players, newGame.toLowerCase() === 'add');
    multiplePlayersGame(players);
    do {
      newGame = prompt('New game (y/n/add[ new players]) ');
    } while (!/^(y|n|add)$/i.test(newGame));
  } while (/^(y|add)$/i.test(newGame));
  console.log('Ciao.');
}

bingoCasino();

// dev****

// multiplePlayersGame([
//   new BingoPlayer('Pablo', [new BingoCard(), new BingoCard()]),
//   new BingoPlayer('Paquito', [new BingoCard(), new BingoCard(), new BingoCard()]),
// ]);

// singleCardGame();
