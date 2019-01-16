let questionTextContainer = document.getElementById('question-text');
let currentQuestion = -1;
let questions = [
    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    /*{ letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"},
    { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
    { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
    { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
    { letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
    { letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"},
    { letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
    { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},
    { letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo"},
    { letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
    { letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia"},
    { letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
    { letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
    { letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
    { letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},
    { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor"},
    { letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},
    { letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
    { letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
    { letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
    { letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
    { letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"},
    { letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
    { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},*/
];
let ranking = [];
let user = null;
let correctAnswers = null;
let wrongAnswers = null;
let play = null;

function getUnansweredQuestions(questions) {
  return questions.filter(function(question) {
    return question.status === 0;
  });
}

function resetQuestionsStatus(questions) {
  questions = questions.map(function(question) {
    question.status = 0;
    return question;
  });
}

// function askQuestions(questions) {
//   do {
//     play = confirm("Do you want to play?");
//     if (play === true) {
//       user = prompt("Whats your name?");
//       while (getUnansweredQuestions(questions).length > 0) {
//         let unansweredQuestions = getUnansweredQuestions(questions);
//         for (let i = 0; i < unansweredQuestions.length; i++) {
//           let questionsContainer = document.getElementById('question-text');
//           questionsContainer.innerHTML="hola";
//           let answer = prompt(unansweredQuestions[i].question);
//           unansweredQuestions[i].status = checkAnswer(
//             answer,
//             unansweredQuestions[i].answer
//           );
//         }
//       }
//       saveRanking(user, questions);
//       resetQuestionsStatus(questions);
//     }
//   } while (play === true);
// }

function checkAnswer(userAnswer, correctAnswer) {
  if (userAnswer === correctAnswer) {
    userAnswer = "correct";
    console.log('Correct Answer!');
    
    return 1;
  }
  if (userAnswer === "pasapalabra") {
    userAnswer = "next letter";
    console.log('Do it later');
    
    return 0;
  }
  if (userAnswer !== correctAnswer) {
    userAnswer = "wrong";
    console.log('Wrong answer');
    
    return -1;
  }
}

function getResult(answers) {

  return `Number of correct answers => ${getCorrectAnswers(answers)} - Number of wrong answers => ${getWrongAnswers(answers)}.`;
}

function getCorrectAnswers(answers){
    return answers.filter(function(answer) {
        return answer.status === 1;
      }).length;
}

function getWrongAnswers(answers){
    return answers.filter(function(answer) {
        return answer.status === -1;
      }).length;
}

function getRanking(user, correctAnswers) {
  return ranking.sort(function(a,b){
      if(a.points<b.points){
          return 1; 
      } else {
          return -1;
      }
      return 0;
});
}

function saveRanking(user,answers){
    ranking.push({
        name: user, points: getCorrectAnswers(answers)
      });
}

/*console.log(askQuestions(questions));
console.log(getResult(questions));
console.log(getRanking(user, correctAnswers));*/
function askQuestion() {
  if(currentQuestion === -1) {
    questionTextContainer.innerHTML = 'What is your name?';
   } else {
    questionTextContainer.innerHTML = questions[currentQuestion].question;
   }
}

function showUserName(name) {
  let user = document.getElementById('userName');
  user.innerHTML = name;
}

function answerQuestion() {
  if (currentQuestion === -1) {
    showUserName(document.getElementById('answer').value)
  }
  currentQuestion++;
  askQuestion();
}

function startGame(){
  askQuestion();  

}