var questions = [
    { letter: "a", answer: "abducir", status: 0, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
    { letter: "b", answer: "bingo", status: 0, question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso") },
    { letter: "c", answer: "churumbel", status: 0, question: ("CON LA C. Niño, crío, bebé") },
    { letter: "d", answer: "diarrea", status: 0, question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida") },
    { letter: "e", answer: "ectoplasma", status: 0, question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación") },
    { letter: "f", answer: "facil", status: 0, question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad") },
    { letter: "g", answer: "galaxia", status: 0, question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas") },
    { letter: "h", answer: "harakiri", status: 0, question: ("CON LA H. Suicidio ritual japonés por desentrañamiento") },
    { letter: "i", answer: "iglesia", status: 0, question: ("CON LA I. Templo cristiano") },
    { letter: "j", answer: "jabali", status: 0, question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba") },
    { letter: "k", answer: "kamikaze", status: 0, question: ("CON LA K. Persona que se juega la vida realizando una acción temeraria") },
    { letter: "l", answer: "licantropo", status: 0, question: ("CON LA L. Hombre lobo") },
    { letter: "m", answer: "misantropo", status: 0, question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas") },
    { letter: "n", answer: "necedad", status: 0, question: ("CON LA N. Demostración de poca inteligencia") },
    { letter: "ñ", answer: "señal", status: 0, question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
    { letter: "o", answer: "orco", status: 0, question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien") },
    { letter: "p", answer: "protoss", status: 0, question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft") },
    { letter: "q", answer: "queso", status: 0, question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche") },
    { letter: "r", answer: "raton", status: 0, question: ("CON LA R. Roedor") },
    { letter: "s", answer: "stackoverflow", status: 0, question: ("CON LA S. Comunidad salvadora de todo desarrollador informático") },
    { letter: "t", answer: "terminator", status: 0, question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984") },
    { letter: "u", answer: "unamuno", status: 0, question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
    { letter: "v", answer: "vikingos", status: 0, question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
    { letter: "w", answer: "sandwich", status: 0, question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso") },
    { letter: "x", answer: "botox", status: 0, question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética") },
    { letter: "y", answer: "peyote", status: 0, question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
    { letter: "z", answer: "zen", status: 0, question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") },
];
var ranking = [];
var responses = [];
var timerGlobal = {}
var TEMPO = 120 // seconds to play

function getTime(){
  return parseInt(document.getElementById("tempo").innerHTML)
}

function calculateOffset(letter){
  var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z']
  var indexLetter = letters.findIndex((l) => l === letter)
  return {index: indexLetter, deg: 13.33 * indexLetter}
}

function rotateRosco(el){
  var offset = calculateOffset(el.letter)
  var offsetString = "moon" + (offset.index + 1).toString()
  //var letterRosco = document.getElementsByClassName(offsetString)[1].childNodes[0]
  document.getElementsByClassName(offsetString)[1].childNodes[0].classList.add("letteractive")
}

function updateProgressBar(s){
  var display = document.getElementById("tempo");
  var progressBar = document.getElementById("progressBar");
  display.innerHTML = s;
  var percentage = parseFloat((s/TEMPO)*100)
  progressBar.style.width = `${percentage}%`
}

function startTimer(seconds, oncomplete) {
    var timer;
    var s = seconds
    var obj = {}
    obj.resume = function() {
        timer = setInterval(obj.step,1000);
    };

    obj.pause = function() {
        ms = obj.step();
        clearInterval(timer);
    };

    obj.step = function() {
        s--
        updateProgressBar(s)
        if( s == 0) {
            clearInterval(timer);
            obj.resume = function() {};
            if(oncomplete) endGame();
        }
        return s;
    };

    obj.resume();
    return obj;
}

function endGame(){
  timerGlobal.pause()
  var finalResults = document.getElementById('finalResults')
  var finalResultAlert = document.getElementById('finalResultAlert')
  finalResults.classList.remove("invisible")
  finalResultAlert.classList.add("alert-primary")
  document.getElementById("resultsArea").remove()
  document.getElementById('endgame').remove()
  var hits = questions.filter((resp) => resp.status === 1).length
  var errors = questions.filter((resp) => resp.status === -1).length
  var rankingPosition = ranking.filter((person) => person.hits >= hits).length
  var msg = `5 ha terminado. Has conseguido ${hits} aciertos y ${errors} errores. Has quedado en posición ${rankingPosition}`
  finalResultAlert.innerHTML = msg
}

function startGame(){
  document.getElementById("progressTempo").classList.remove("invisible")
  document.getElementById("rankingTable").remove("invisible")
  timerGlobal = startTimer(TEMPO, endGame);
  if (ranking.length === 0) {createRanking()}
  $("#header").hide("slow")
  nextQuestion('start')
}

function nextQuestion(momentum = 'next'){
  if (momentum !== 'start'){timerGlobal.resume()}
  document.getElementById("pasapalabraButton").disabled = false
  document.getElementById("response").value = ""

  var indexQ = questions.findIndex((q) => q.status === 0)
  if (indexQ !== -1){
    var q = questions.splice(indexQ, 1).pop()
    showHtmlquestion(q)
    responses.push(q)
    var letterActive = document.getElementsByClassName("letteractive")[0]
    if (letterActive) {
      letterActive.classList.remove("letteractive")
    }
    rotateRosco(q)
    questions.push(q)
  } else {
    endGame()
  }
}

function hideResultsArea(){
  var questionsArea = document.getElementById('questionsArea')
  questionsArea.classList.remove("invisible")
}

function showHtmlquestion(q){
  hideResultsArea()
  var withThe = q.question.slice(0, q.question.indexOf('.')-2)
  var question = q.question.slice(q.question.indexOf('.')+1)
  document.getElementById("withThe").innerHTML = withThe
  document.getElementById("question").innerHTML = question
  document.getElementById("response").placeholder = q.letter.toUpperCase() + "..."
  document.getElementById("letter").innerHTML = q.letter.toUpperCase()
  document.getElementById("resultsArea").classList.add("invisible")
}

function showResult(q){
    var msg = ''
    var resultsArea = document.getElementById("resultsArea")
    var resultsAlert = document.getElementById('resultAlert')
    resultsArea.classList.remove("invisible")
    resultsAlert.classList.remove("alert-success")
    resultsAlert.classList.remove("alert-danger")
    document.getElementById("nextQuestion").classList.add("invisible")
    resultsArea.removeAttribute("style")
    if (q!== null){
        document.getElementById("responderButton").disabled = true
        document.getElementById("pasapalabraButton").disabled = true
        if (q.status === 1){
          resultsAlert.classList.add("alert-success")
          msg = '¡Respuesta correcta!'
          resultsAlert.innerHTML = msg
          $('#resultsArea').fadeOut(2000, function(){ nextQuestion() });
        } else if (q.status === -1) {
          document.getElementById("nextQuestion").classList.remove("invisible")
          resultsAlert.classList.add("alert-danger")
          msg = 'Incorrecto'
          msg += `\nRespuesta correcta: ${q.answer}`
          resultsAlert.innerHTML = msg
        }
    }
}

function checkResponse(){
  timerGlobal.pause()
  var resp = getResponse()
  if (resp === null){
    showResult(resp)
  } else {
    var q = responses.pop()
    var offset = calculateOffset(q.letter)
    var offsetString = "moon" + (offset.index + 1).toString()
    var letterRosco = document.getElementsByClassName(offsetString)[1].childNodes[0]
    if (resp === q.answer){
      q.status = 1
      letterRosco.classList.add("bg-success")
    } else {
      q.status = -1
      letterRosco.classList.add("bg-danger")
    }
    showResult(q)
    responses.push(q)
  }
  document.getElementById("responderButton").disabled = true
}

function getResponse(){
  var resp = document.getElementById("response").value
  if ((resp) == ""){
    return null
  } else {
    resp = resp.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }
  return resp
}

function pasapalabra(){
  nextQuestion('start')
}

function createRanking(){
  if (ranking.length === 0){
      var names = ['Latisha','Alpha','Pei','Asuncion','Oma','Tisa','Patty','Jackelyn','Samuel','Renee'];
      for (var i = 0; i < names.length; i++) {
        var random = randomNumber(questions.length+1);
        ranking.push({name: names[i], hits: random});
      }
      sortRanking();
  }
}

function sortRanking(){
  ranking.sort(function (a, b) {
      if (a.hits > b.hits) {
        return -1;
      }
      if (a.hits < b.hits) {
        return 1;
      }
      return 0;
  });
}

function changeHtmlRanking(){
  var msg = ''
  for (var i = 0; i < ranking.length; i++) {
    msg += '<tr>'
    msg += `<th scope="row">${i+1}</th>`
    msg += `<td>${ranking[i].hits}</td>`
    msg += `<td>${ranking[i].name}</td>`
    msg += '</tr>'
  }
  document.getElementById('bodyRanking').innerHTML = msg
}

function toggleRanking(){
  createRanking()
  changeHtmlRanking()
}

function randomNumber(max, min=1){
  return Math.floor(Math.random() * (max - min)) + min;
}

function disableResponderButton(){
  document.getElementById("responderButton").disabled = true
  checkResponse()
}

document.getElementById("formPasapalabra").addEventListener("submit", function(event){
    event.preventDefault()
    document.getElementById("responderButton").disabled = true
});

document.getElementById("response").addEventListener("keyup", function(event){
    if ((this.value.length > 0) && (event.keyCode !== 13)) {
      document.getElementById("responderButton").disabled = false
    } else {
      document.getElementById("responderButton").disabled = true
    }
});
