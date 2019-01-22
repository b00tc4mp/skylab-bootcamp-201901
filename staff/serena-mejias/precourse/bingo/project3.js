const BALLOT_LINES = 3;
const BALLOT_NUMBERS_PER_LINE = 5;
const DRAWN_NUMBERS = [];
let winnerLines = [];
let isBingo = false;
let user = new createUser(prompt('What\'s your name?'));

function createUser(name){
    this.name = name;
    this.points = 0;
    this.setScore = function(score){
        this.points = score;
    }
}

function generateBallot() {
  let ballot = [];
  let repeatedNumbers = [];
  for (let i = 0; i < BALLOT_LINES; i++) {
    let newLine = [];
    for (let j = 0; j < BALLOT_NUMBERS_PER_LINE; j++) {
      const newRandomNumber = newRandomNumberNotRepeated(
        1,
        20,
        repeatedNumbers
      );
      newLine.push(newRandomNumber);
      repeatedNumbers.push(newRandomNumber);
    }
    ballot.push(newLine);
  }
  return ballot;
}
function newRandomNumberNotRepeated(min, max, arrayRep) {
  let randomNumber = Math.floor(Math.random() * (max - min) + min);
  while (arrayRep.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * (max - min) + min);
  }
  return randomNumber;
}
function match(num) {
  console.log(`Number ${num} has been drawn.`);
  for (let i = 0; i < BALLOT_LINES; i++) {
    for (let j = 0; j < BALLOT_NUMBERS_PER_LINE; j++) {
      if (ballot[i][j] === num) {
        ballot[i][j] = "X";
      }
    }
  }
  console.table(ballot);
}
function checkLine(ballotLine, lineIndex) {
  for (j = 0; j < ballotLine.length; j++) {
    if (ballotLine[j] !== "X") {
      return false;
    }
  }
  winnerLines.push(lineIndex);
  console.log("Linea!");
  return true;
}
function checkBingo(ballot) {
  for (let k = 0; k < ballot.length; k++) {
    if (!winnerLines.includes(k)) {
      checkLine(ballot[k], k);
    }
  }
  if (winnerLines.length < BALLOT_LINES) {
      return false;
  } else {
      return true;
  }

}

let ballot = null;
do {
  ballot = generateBallot();
  console.table(ballot);
  
} while (confirm('Do you like this ballot?') === false);

do {
  const drawnNumber = newRandomNumberNotRepeated(1, 20, DRAWN_NUMBERS); // 4
  DRAWN_NUMBERS.push(drawnNumber);
  match(drawnNumber);
  isBingo = checkBingo(ballot);
} while (isBingo === false && confirm("Do you want to continue playing?"));
user.setScore(100-DRAWN_NUMBERS.length);
console.log(`The bingo has drawn a ball ${DRAWN_NUMBERS.length} times`);
console.log(`${user.name} has ${user.points} points.`);
console.log("Ciao!");
