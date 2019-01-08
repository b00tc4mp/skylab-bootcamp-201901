var questions = [
  {
    letter: "a",
    answer: "abducir",
    status: 0,
    text:
      "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"
  },
  {
    letter: "b",
    answer: "bingo",
    status: 0,
    text:
      "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"
  },
  {
    letter: "c",
    answer: "churumbel",
    status: 0,
    text: "CON LA C. Niño, crío, bebé"
  },
  {
    letter: "d",
    answer: "diarrea",
    status: 0,
    text:
      "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"
  },
  {
    letter: "e",
    answer: "ectoplasma",
    status: 0,
    text:
      "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"
  },
  {
    letter: "f",
    answer: "facil",
    status: 0,
    text: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"
  },
  {
    letter: "g",
    answer: "galaxia",
    status: 0,
    text:
      "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"
  },
  {
    letter: "h",
    answer: "harakiri",
    status: 0,
    text: "CON LA H. Suicidio ritual japonés por desentrañamiento"
  },
  {
    letter: "i",
    answer: "iglesia",
    status: 0,
    text: "CON LA I. Templo cristiano"
  },
  {
    letter: "j",
    answer: "jabali",
    status: 0,
    text:
      "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"
  },
  {
    letter: "k",
    answer: "kamikaze",
    status: 0,
    text:
      "CON LA K. Persona que se juega la vida realizando una acción temeraria"
  },
  {
    letter: "l",
    answer: "licantropo",
    status: 0,
    text: "CON LA L. Hombre lobo"
  },
  {
    letter: "m",
    answer: "misantropo",
    status: 0,
    text:
      "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"
  },
  {
    letter: "n",
    answer: "necedad",
    status: 0,
    text: "CON LA N. Demostración de poca inteligencia"
  },
  {
    letter: "ñ",
    answer: "señal",
    status: 0,
    text:
      "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."
  },
  {
    letter: "o",
    answer: "orco",
    status: 0,
    text:
      "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"
  },
  {
    letter: "p",
    answer: "protoss",
    status: 0,
    text:
      "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"
  },
  {
    letter: "q",
    answer: "queso",
    status: 0,
    text:
      "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"
  },
  { letter: "r", answer: "raton", status: 0, text: "CON LA R. Roedor" },
  {
    letter: "s",
    answer: "stackoverflow",
    status: 0,
    text: "CON LA S. Comunidad salvadora de todo desarrollador informático"
  },
  {
    letter: "t",
    answer: "terminator",
    status: 0,
    text:
      "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"
  },
  {
    letter: "u",
    answer: "unamuno",
    status: 0,
    text:
      "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"
  },
  {
    letter: "v",
    answer: "vikingos",
    status: 0,
    text:
      "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"
  },
  {
    letter: "w",
    answer: "sandwich",
    status: 0,
    text:
      "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"
  },
  {
    letter: "x",
    answer: "botox",
    status: 0,
    text: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"
  },
  {
    letter: "y",
    answer: "peyote",
    status: 0,
    text:
      "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"
  },
  {
    letter: "z",
    answer: "zen",
    status: 0,
    text:
      "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"
  }
];

var player = "";
var questionNum = 0;
var succes = 0;
var failed = 0;
var turn = 0;

document.getElementById("play").onclick = pasapalabra;
document.getElementById("validation").onclick = validateQuestion;
document.getElementById("pass").onclick = nextQuestion;
document.getElementById("restartPlay").onclick = restartPlay;

function pasapalabra() {
  getPlayer();
  showQuestionsContainer();
  showQuestion();
}

function getPlayer() {
  player = prompt("Inserta tu usuario");
}

function showQuestionsContainer() {
  document.getElementById("play").classList.add("hidden");
  document.getElementById("question-container").classList.remove("hidden");
}

function showQuestion() {
  document.getElementById("answer").value = "";
  var question = questions[questionNum];
  if (question.status !== 0) {
    nextQuestion();
  } else {
    var text = question.text;
    document.getElementById("question").textContent = text;
  }
}

function validateQuestion() {
  var letter = questions[questionNum].letter;
  var correctAnswer = questions[questionNum].answer.toLowerCase();
  var userAnswer = document.getElementById("answer").value.toLowerCase();
  if (correctAnswer === userAnswer) {
    document.getElementById(letter).classList.add("correct");
    questions[questionNum].status = 1;
    succes++;
  } else {
    document.getElementById(letter).classList.add("incorrect");
    questions[questionNum].status = 2;
    failed++;
  }
  nextQuestion();
}

function nextQuestion() {
  var isFinished = getFinished();
  if (isFinished) {
    showResult();
  } else {
    questionNum++;
    if (questionNum >= questions.length) {
      questionNum = 0;
      turn++;
    }
    showQuestion();
  }
}

function getFinished() {
  var finished = true;
  if (turn < 3) {
    finished = false;
  }
  return finished;
}

function showResult() {
  document.getElementById("question-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");
  document.getElementById("result").textContent =
    "Hola " +
    player +
    " has acertado " +
    succes +
    " preguntas y has fallado " +
    failed +
    " preguntas";
  leaderBoard();
}

function restartPlay() {
  window.location.reload();
}

function leaderBoard() {
  document.getElementById("result-container").classList.remove("hidden");
  for (var i = 0; i < 4; i++)
    var usersGame = [
      { user: "PACO", puntos: 24 },
      { user: "JOSE", puntos: 12 },
      { user: "ANTONIO", puntos: 20 },
      { user: "JOSE MARI", puntos: 6 }
    ];

  function userList() {
    usersGame.push({ user: player.toUpperCase(), puntos: succes });
    var orderPoints = usersGame;
    orderPoints.sort(function(b, a) {
      return a.puntos - b.puntos;
    });
    orderPoints.forEach(user => {
      var participant = document.createElement("p");
      participant.innerHTML = user.user + ": " + user.puntos + " puntos";
      var result = document.getElementById("result-container");
      result.appendChild(participant);
    });
  }
  userList();
}
