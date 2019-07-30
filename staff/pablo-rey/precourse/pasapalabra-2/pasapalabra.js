const NOT_ANSWERED = 0;
const CORRECT = 1;
const WRONG = 2;
const PASAPALABRA = 3;
const END = 4;
const TIMEOUT = 5;

class Player {
  constructor(name, secondsToComplete, baseQ, alterQ, excludeQ) {
    this.name = name;
    this.secondsToComplete = secondsToComplete;
    this.questions = Player.mixQuestions(baseQ, alterQ, excludeQ);
    this.timeEnd = null;
    this.timeStop = null;
    this.indexNextQuestion = 0;
  }

  static mixQuestions(base, alter, exclude) {
    const result = [...base];
    for (let i = 0; i < result.length; i++) {
      const currentLetter = result[i].letter;
      const letterAlternatives = alter.filter(
        item => item.letter.toLowerCase() === currentLetter.toLowerCase(),
      );
      if (letterAlternatives !== 0) {
        do {
          const choose = Math.floor(Math.random() * (letterAlternatives.length + 1));
          if (choose !== 0) {
            result[i] = letterAlternatives[choose - 1];
          }
        } while (exclude[i] !== undefined && exclude[i].question === result[i].question);
      }
    }
    return result;
  }

  static whoWins(player1, player2) {
    const compare = (p1, p2, gt, lt, eq) => (p1 > p2 ? gt : p1 < p2 ? lt : eq);
    if (player1.isConceded() && player2.isConceded()) {
      return null;
    }
    let winner = player1.isConceded() ? player2 : null;
    winner = winner || (player2.isConceded() ? player1 : null);
    winner = winner || compare(player1.countCorrect(), player2.countCorrect(), player1, player2, null);
    winner = winner || compare(player1.countWrong(), player2.countWrong(), player2, player1, null);
    winner = winner || compare(player1.timeRemaining(), player2.timeRemaining(), player1, player2, null);
    return winner;
  }

  static whoLose(player1, player2) {
    const playerWhoWon = Player.whoWins(player1, player2);
    if (playerWhoWon === null) {
      return null;
    }
    return playerWhoWon === player1 ? player2 : player1;
  }

  startTimer() {
    const timeToAdd = this.timeRemaining();
    this.timeEnd = new Date(new Date().getTime() + timeToAdd);
    this.timeStop = null;
  }

  stopTimer() {
    this.timeStop = new Date();
  }

  timeRemaining() {
    // In milliseconds
    if (this.timeEnd === null && this.timeStop === null) {
      return this.secondsToComplete * 1000;
    }
    let result;
    if (this.timeStop === null) {
      result = this.timeEnd.getTime() - new Date().getTime();
    } else {
      result = this.timeEnd.getTime() - this.timeStop.getTime();
    }
    return result < 0 ? -1 : result;
  }

  secondsRemaining() {
    return Math.floor(this.timeRemaining() / 1000);
  }

  checkAnswer(answer) {
    const index = this.indexNextQuestion;
    if (this.timeRemaining() < 0) {
      this.questions[index].status = TIMEOUT;
      return this.questions[index].status;
    }
    if (answer.toLowerCase() === 'pasapalabra') {
      this.questions[index].status = PASAPALABRA;
    } else if (answer.toLowerCase() === 'end') {
      this.questions[index].status = END;
    } else if (answer.toLowerCase() === this.questions[index].answer.toLowerCase()) {
      this.questions[index].status = CORRECT;
    } else {
      this.questions[index].status = WRONG;
    }
    return this.questions[index].status;
  }

  isCompleted() {
    return this.questions.every(({ status }) => status === CORRECT || status === WRONG);
  }

  showStatistics() {
    console.log('RESULTADO FINAL');
    console.log('---------------');
    console.log(this.getDisplay());
    console.log(`Número de acertadas: ${this.countCorrect()}`);
    console.log(`Número de falladas: ${this.countWrong()}`);
  }

  countCorrect() {
    return this.countStatus(CORRECT);
  }

  countWrong() {
    return this.countStatus(WRONG);
  }

  countNotAnswered() {
    return this.countStatus(NOT_ANSWERED) + this.countStatus(PASAPALABRA);
  }

  isTimeOut() {
    return this.countStatus(TIMEOUT) > 0;
  }

  isConceded() {
    return this.countStatus(END) > 0;
  }

  isFinished() {
    return this.isTimeOut() || this.isConceded() || this.isCompleted();
  }

  countStatus(statusToCount) {
    return this.questions.filter(({ status }) => status === statusToCount).length;
  }

  nextQuestion() {
    if (this.isCompleted()) {
      return null;
    }
    let i = this.indexNextQuestion;
    do {
      i++;
      if (i >= this.questions.length) {
        i = 0;
      }
    } while (this.questions[i].status === CORRECT || this.questions[i].status === WRONG);
    this.indexNextQuestion = i;
    return this.indexNextQuestion;
  }

  getLetter() {
    return this.questions[this.indexNextQuestion].letter;
  }

  getQuestion() {
    return this.questions[this.indexNextQuestion].question;
  }

  getStatus() {
    return this.questions[this.indexNextQuestion].status;
  }

  getAnswer() {
    return this.questions[this.indexNextQuestion].answer;
  }

  getDisplay() {
    const index = this.indexNextQuestion;
    let result = '';
    if (index !== undefined) {
      for (let i = 0; i < index; i++) {
        result += '| ';
      }
      result += '|*';
      for (let i = index + 1; i < this.questions.length; i++) {
        result += '| ';
      }
      result += '\n';
    }
    for (let i = 0; i < this.questions.length; i++) {
      switch (this.questions[i].status) {
        case CORRECT:
          result += '|+';
          break;
        case WRONG:
          result += '|-';
          break;
        default:
          result += `|${this.questions[i].letter.toUpperCase()}`;
          break;
      }
    }
    if (this.timeRemaining() === -1) {
      result = `Rosco de ${this.name} al que se le ha acabado el tiempo\n${result}`;
    } else {
      result = `Rosco de ${this.name} con ${this.secondsRemaining()} segundo todavía\n${result}`;
    }
    return result;
  }
}
