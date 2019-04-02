var questions1 = [
  { letter: "a", answer: "abducir", status: 0, question: ("Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
  { letter: "b", answer: "bingo", status: 0, question: ("Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso") },
  { letter: "c", answer: "churumbel", status: 0, question: ("Niño, crío, bebé") },
  { letter: "d", answer: "diarrea", status: 0, question: ("Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida") },
  { letter: "e", answer: "ectoplasma", status: 0, question: ("Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación") },
  { letter: "f", answer: "facil", status: 0, question: ("Que no requiere gran esfuerzo, capacidad o dificultad") },
  { letter: "g", answer: "galaxia", status: 0, question: ("Conjunto enorme de estrellas, polvo interestelar, gases y partículas") },
  { letter: "h", answer: "harakiri", status: 0, question: ("Suicidio ritual japonés por desentrañamiento") },
  { letter: "i", answer: "iglesia", status: 0, question: ("Templo cristiano") },
  { letter: "j", answer: "jabali", status: 0, question: ("Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba") },
  { letter: "k", answer: "kamikaze", status: 0, question: ("Persona que se juega la vida realizando una acción temeraria") },
  { letter: "l", answer: "licantropo", status: 0, question: ("Hombre lobo") },
  { letter: "m", answer: "misantropo", status: 0, question: ("Persona que huye del trato con otras personas o siente gran aversión hacia ellas") },
  { letter: "n", answer: "necedad", status: 0, question: ("Demostración de poca inteligencia") },
  { letter: "ñ", answer: "señal", status: 0, question: ("Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
  { letter: "o", answer: "orco", status: 0, question: ("Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien") },
  { letter: "p", answer: "protoss", status: 0, question: ("Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft") },
  { letter: "q", answer: "queso", status: 0, question: ("Producto obtenido por la maduración de la cuajada de la leche") },
  { letter: "r", answer: "raton", status: 0, question: ("Roedor") },
  { letter: "s", answer: "stackoverflow", status: 0, question: ("Comunidad salvadora de todo desarrollador informático") },
  { letter: "t", answer: "terminator", status: 0, question: ("Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984") },
  { letter: "u", answer: "unamuno", status: 0, question: ("Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
  { letter: "v", answer: "vikingos", status: 0, question: ("Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
  { letter: "w", answer: "sandwich", status: 0, question: ("Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso") },
  { letter: "x", answer: "botox", status: 0, question: ("Toxina bacteriana utilizada en cirujía estética") },
  { letter: "y", answer: "peyote", status: 0, question: ("Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
  { letter: "z", answer: "zen", status: 0, question: ("Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") },
]

function instructionsGame() {
  clearRegisters()
  document.getElementById('display-0').classList.remove('hide')
  document.getElementById('display-1').classList.add('hide')
  document.getElementById('display-2').classList.add('hide')
}

function endGame() {
  if (document.getElementById('timer').innerHTML == 180) {
    instructionsGame()
    return
  }
  // ocultar pantalla 1
  document.getElementById('display-1').classList.add('hide')
  // mostrar pantalla 2 
  document.getElementById('display-2').classList.remove('hide')
  time = document.getElementById('timer').innerHTML 
  clearInterval(id)
  showRanking()
  // ranking.push({name, hits, next, fail, totalTime})
  // document.getElementById('ranking-p').innerHTML = showRanking()
  // mostrar estadisticasl
}

var questions = questions1
var name = ''
function showGame() {
  name = document.getElementById('nameInput').value
  if (name !== "") {
    user.name = name
    clearRegisters()
    // ocultamos pantalla 0
    document.getElementById('display-0').classList.add('hide')
    // mostrar pantalla 1
    document.getElementById('display-1').classList.remove('hide')
    // ocultar pantalla 2
    document.getElementById('display-2').classList.add('hide')

    document.getElementById('activeQuestion').innerHTML = ''
    document.getElementById('timer').innerHTML = second
    document.getElementById('hits').innerHTML = 0
    document.getElementById('fail').innerHTML = 0
  } else {
    document.getElementById('error').innerHTML = "El nombre no puede estar vacio!!!"
  }
}

function clearRegisters() {
  hits = 0
  next = 0
  fail = 0
  second = 180
  questions.filter(question => document.getElementById('activeLetter-' + question.letter).classList.remove('activeLetter'))
  questions.filter(question => document.getElementById('activeLetter-' + question.letter).classList.remove('correctAnswer'))
  questions.filter(question => document.getElementById('activeLetter-' + question.letter).classList.remove('incorrectAnswer'))
  questions.filter(question => question.status = 0)
  document.getElementById('error').innerHTML = ''
  document.getElementById('nameInput').value = ''
  questions = questions1

}

var time = 0
var id = 0
var second = 180
function startGame() {
  if (second < 180){ return }
  clearRegisters()
  showQuestion()
  id = setInterval(function () {
    document.getElementById('timer').innerHTML = second
    if (second == 0) {
      endGame()
      clearInterval(id)
    }
    second--
  }, 1000)
  return true
}

function showQuestion() {
  var letterHTML = document.getElementById("activeLetter-a")
  letterHTML.classList.add('activeLetter') 
  document.getElementById('activeQuestion').innerHTML = questions[0].question
}

function initTimer(){
    var questionActive = document.getElementById('activeQuestion').innerHTML
      if (questionActive == ''){
        alert('Para iniciar el juego presiona el boton Start Game')
        document.getElementById('answerInput').value = ''
        return true
      }
}

function answerInput() {
  if ( initTimer() ) { return }
  if (document.getElementById('answerInput').value !== "") {
    var numberQuestions = questions.filter(question => question.status == 0).length
    questions = questions.filter(question => question.status == 0)
    if (numberQuestions !== 0) {
      var answerQuestion = questions[0].answer
      var letter = questions[0].letter
      var answerIn = document.getElementById('answerInput').value.toLowerCase().trim()
      if (answerIn == answerQuestion) {
        hits++
        questions[0].status = 1
        document.getElementById('hits').innerHTML = hits;
        document.getElementById('activeLetter-' + letter).classList.add('correctAnswer')
        document.getElementById('activeLetter-' + letter).classList.remove('activeLetter')
        questions.push(questions.shift())
        } else {
          fail++
          questions[0].status = 2
          document.getElementById('fail').innerHTML = fail;
          document.getElementById('activeLetter-' + letter).classList.remove('activeLetter')
          document.getElementById('activeLetter-' + letter).classList.add('incorrectAnswer')

          questions.push(questions.shift())
        }
        if (questions.filter(question => question.status === 0).length === 0) { endGame() }
      document.getElementById('answerInput').value = ""
      document.getElementById('activeQuestion').innerHTML = questions[0].question
      letter = questions[0].letter
      document.getElementById('activeLetter-' + letter).classList.add('activeLetter')
    }
  }
}

function nextPasapalabra() {
  if ( initTimer() ) { return }
  next++
  var letter = questions[0].letter
  document.getElementById('activeLetter-' + letter).classList.remove('activeLetter')
  questions.push(questions.shift())
  questions = questions.filter(question => question.status == 0) 
  document.getElementById('activeQuestion').innerHTML = questions[0].question
  letter = questions[0].letter
  document.getElementById('activeLetter-' + letter).classList.add('activeLetter')
  document.getElementById('answerInput').value = ""
}

let hits = 0
let next = 0
let fail = 0

function showRanking() {
  document.getElementById('_name').innerHTML = name;
  document.getElementById('_hits').innerHTML = hits
  document.getElementById('_fail').innerHTML = fail
  document.getElementById('_next').innerHTML = next;
  document.getElementById('_time').innerHTML = time;
  player.push(user)
}

var user = {
	name: name,
	hits: hits,
	fail: fail,
	next: next,
	time: time
}

var player = []
//player.push(user)

