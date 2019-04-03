const colors = {
  primary: '#2780E3',
  secondary: '#373a3c',
  success: '#3FB618',
  info: '#9954BB',
  warning: '#FF7518',
  danger: '#FF0039',
  light: '#f8f9fa',
  dark: '#373a3c',
};

class PlayerWeb extends Player {
  constructor(name, secondsToComplete, baseQ, alterQ, excludeQ, idHTML, answering, colors) {
    super(name, secondsToComplete, baseQ, alterQ, excludeQ);
    this.idHTML = idHTML;
    this.answering = answering;
    this.colors = colors;
  }

  static convertLetter(letter) {
    return (letter !== 'ñ' ? letter : 'nh').toLowerCase();
  }

  activatePlayer() {
    const id = `letter-${this.idHTML}-${PlayerWeb.convertLetter(this.getLetter())}`;
    document.getElementById(id).style.animationIterationCount = 'infinite';
    document.getElementById(`timer-${this.idHTML}`).style = `background-color: ${this.colors.primary}; color: white;`;
    document.getElementById(`name-${this.idHTML}`).style = `background-color: ${this.colors.primary}; color: white;`;
  }

  changeTimer() {
    const remain = this.secondsRemaining().toString();
    document.getElementById(`timer-${this.idHTML}`).innerHTML = remain > 0 ? `${remain}"` : 'Fin tiempo';
    if (this.timeRemaining() < 0) {
      clearInterval(this.interval);
      this.answering(
        true, // timeout
      );
    }
  }

  startTimer() {
    super.startTimer();
    this.interval = setInterval(() => this.changeTimer(), 200);
  }

  stopTimer() {
    super.stopTimer();
    clearInterval(this.interval);
  }

  updateLetterColors() {
    document.getElementById(`timer-${this.idHTML}`).style = '';
    document.getElementById(`name-${this.idHTML}`).style = '';
    this.questions.forEach((item) => {
      const circle = document.getElementById(`letter-${this.idHTML}-${PlayerWeb.convertLetter(item.letter.toLowerCase())}`);
      switch (item.status) {
        case TIMEOUT:
        case NOT_ANSWERED:
        case PASAPALABRA:
          circle.style = `background-color: ${this.colors.primary}; animation-iteration: 0;`;
          break;
        case CORRECT:
          circle.style = `background-color: ${this.colors.success};`;
          break;
        case WRONG:
        case END:
          circle.style = `background-color: ${this.colors.danger};`;
          break;
        default:
          break;
      }
    });
  }
}

// HTML Tags
const tagQuestionContainer = document.getElementById('question-container');
const tagQuestionLetterText = document.getElementById('question-letter-text');
const tagQuestionText = document.getElementById('question-text');
const tagAnswerText = document.getElementById('answer-text');
const tagAnswerControlContainer = document.getElementById('answer-control-container');
const tagConfirmTitle = document.getElementById('confirm-title');
const tagConfirmText = document.getElementById('confirm-text');
const tagConfirmWait = document.getElementById('confirm-card');

// control variables and functions
let players = [];

let inTurn = Math.floor(Math.random() * 2);
const otherPlayerIndex = () => (inTurn === 0 ? 1 : 0);
const playerInTurn = () => players[inTurn];
const playerWaiting = () => players[otherPlayerIndex()];
const gameFinished = () => (playerInTurn().isConceded() && playerWaiting().isConceded())
|| (playerInTurn().isFinished() && playerWaiting().isFinished());


// auxiliary functions
function confirmWaitDisplay(timeout) {
  tagQuestionContainer.hidden = true;
  if (timeout === TIMEOUT) {
    tagConfirmTitle.innerHTML = 'Se acabó el tiempo';
  } else if (timeout === END) {
    tagConfirmTitle.innerHTML = `${playerWaiting().name} ha concedido la partida`;
  } else {
    tagConfirmTitle.innerHTML = 'Cambio de turno';
  }
  tagConfirmText.innerHTML = `¿${playerInTurn().name} preparado para continuar?`;
  tagConfirmWait.hidden = false;
  document.getElementById('confirm-wait-yes').focus();
}
function answeringDisplay() {
  tagQuestionContainer.hidden = false;
  tagAnswerControlContainer.hidden = false;
  tagConfirmWait.hidden = true;
}

function confirmContinue(concede) {
  if (!concede) {
    answeringDisplay();
    playerInTurn().startTimer();
    displayNextQuestion();
  } else {
    answering('end');
  }
}

function displayNextQuestion() {
  tagQuestionLetterText.innerHTML = playerInTurn().getLetter().toUpperCase();
  tagQuestionText.innerHTML = playerInTurn().getQuestion();
  tagAnswerText.value = '';
  playerInTurn().activatePlayer();
  tagAnswerText.focus();
}

function answering(response) {
  let answer;
  switch (response) {
    case 'timeout':
    case 'pasapalabra':
    case 'end':
      answer = response;
      break;
    default:
      answer = document.getElementById('answer-text').value;
      break;
  }
  let changePlayer = false;
  playerInTurn().checkAnswer(answer);
  switch (playerInTurn().getStatus()) {
    case WRONG:
      tagQuestionText.innerHTML = `No! la respuesta correcta es ${playerInTurn().getAnswer()}`;
      playerInTurn().nextQuestion();
      playerInTurn().updateLetterColors();
      if (!playerWaiting().isFinished()) {
        changePlayer = true;
      } else {
        displayNextQuestion();
      }
      break;
    case CORRECT:
      if (playerInTurn().isCompleted()) {
        changePlayer = true;
      }
      playerInTurn().nextQuestion();
      playerInTurn().updateLetterColors();
      displayNextQuestion();
      break;
    case PASAPALABRA:
      tagQuestionText.innerHTML = `${playerInTurn().name} pasapalabra`;
      playerInTurn().nextQuestion();
      playerInTurn().updateLetterColors();
      if (!playerWaiting().isFinished()) {
        changePlayer = true;
      } else {
        displayNextQuestion();
      }

      break;
    case TIMEOUT:
    case END:
      changePlayer = true;
      playerInTurn().updateLetterColors();
      break;
    default:
      break;
  }
  if (changePlayer) {
    playerInTurn().stopTimer();
    tagAnswerControlContainer.hidden = true;    
    if (gameFinished()) {
      const whoWon = Player.whoWins(players[0], players[1]);
      const whoLost = Player.whoLose(players[0], players[1]);
      if (whoWon !== null) {
        document.getElementById("end-game-header").innerHTML = "Ha ganado " + whoWon.name;
      } else {
        document.getElementById("end-game-header").innerHTML = "¡¡Empate!!";
        whoWon = players[0];
        whoLost = players[1];
      }
      let results = `<p>${whoWon.name} acertó ${whoWon.countCorrect()} y falló ${whoWon.countWrong()}${whoWon.isConceded() ? '. Se retiró' : ''}</p>`;
      results += `<p>${whoLost.name} acertó ${whoLost.countCorrect()} y falló ${whoLost.countWrong()}${whoLost.isConceded() ? '. Se retiró' : ''}</p>`;
      document.getElementById("end-game-text").innerHTML = results;
      $("#modal-end-game").modal('show');
    } else {
      switch (playerInTurn().getStatus()) {
        case TIMEOUT:
        case END:
          inTurn = otherPlayerIndex();
          confirmWaitDisplay(playerWaiting().getStatus());
          break;
        default:
          setTimeout(confirmWaitDisplay, 3000);
          inTurn = otherPlayerIndex();
          break;
      }

    }
  }
}

function onKeyPress(e) {
  if (event.charCode === 13 && !tagAnswerControlContainer.hidden) {
    answering();
  }
}

function startGame() {
  const validateName = (id) => {
    const tagName = document.getElementById(id);
    tagName.classList.remove('is-valid', 'is-invalid');
    const name = tagName.value;
    tagName.classList.add(name !== '' ? 'is-valid' : 'is-invalid');
    return name;  
  }
  const validateSeconds = (id) => {
    const tagTime = document.getElementById(id);
    tagTime.classList.remove('is-valid', 'is-invalid');
    const seconds = parseInt(tagTime.value);
    tagTime.classList.add(Number.isNaN(seconds) || (seconds < 10) ? 'is-invalid' : 'is-valid');
    return seconds;
  }
  const allValid = (...args) => {
    return args.every((id) => document.getElementById(id).classList.contains('is-valid'));
  }

  const namePlayer1 = validateName('intro-name-player1');
  const namePlayer2 = validateName('intro-name-player2');
  const secondsPlayer1 = validateSeconds('intro-time-player1');
  const secondsPlayer2 = validateSeconds('intro-time-player2');
  if (!allValid('intro-name-player1','intro-name-player2','intro-time-player1','intro-time-player1')) {
    return;
  }
  $("#modal-init-setup").modal('hide');
  const includePhilosophyQuestions = document.getElementById('includePhilosophyQuestions').checked;

  let allAlterQuestions;
  if (includePhilosophyQuestions) {
    allAlterQuestions = [...alterQuestions, ...philosophyQuestions];
  } else {
    allAlterQuestions = [...alterQuestions];
  }
  const player1 = new PlayerWeb(
    namePlayer1,
    secondsPlayer1,
    baseQuestions,
    allAlterQuestions,
    [], // Exclude questions
    'player1', // idHTML
    answering, // answering function
    colors, // color squema
  );
  const player2 = new PlayerWeb(
    namePlayer2,
    secondsPlayer2,
    baseQuestions,
    allAlterQuestions,
    player1.questions, // Exclude questions
    'player2', // idHTML
    answering, // answering function
    colors, // color squema
  );
  players = [player1, player2];

  document.getElementById('name-player1').innerHTML = player1.name;
  document.getElementById('timer-player1').innerHTML = `${player1.secondsRemaining()}"`;
  document.getElementById('name-player2').innerHTML = player2.name;
  document.getElementById('timer-player2').innerHTML = `${player2.secondsRemaining()}"`;

  document.getElementById('intro').hidden = true;
  document.getElementById('main-screen').hidden = false;
  document.getElementById('confirm-card').hidden = false;

  confirmWaitDisplay();
  tagConfirmTitle.innerHTML = 'EMPIEZA PASAPALABRA';

  let text = `<p>Bienvenidos ${players[0].name} y ${players[1].name}</p>`;
  text += `<p>En el sorteo ha salido que empiece ${playerInTurn().name}</p>`;
  text += '<p>¿Estás listo?</p>';
  tagConfirmText.innerHTML = text;

  player1.updateLetterColors();
}
