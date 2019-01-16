window.onload = function () {
     //document.getElementById("ranking").style.display = "none";
    // document.getElementById("msg-results").style.display = "none";
}

/* Work In Progress
1. El formulario cuando se envía con enter deja de funcionar. He eliminado la forma de enviar el formulario a través de ENTER para que sea más fácil
ya que no encontrado la forma de deshabilitar el botón tanto para el click de enviar como para enviar con ENTER
2.
**/

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
var TEMPO = 30; //seconds every turn

function pasapalabra(){
  //document.getElementById("start").style.display = "none";
  var stop = false;
  var hits = 0;
  //var name = sayHi();
  createRanking();            //[{name: 'Latisha', hits: 8},{name: 'Latisha', hits: 8}...]
  showRankingConsole();
  showInstructions();
  var questions2 = questions;
  questions = [];
  var answered = 0;
  while ((!stop) && (questions2.length > 0)) {
      var element = questions2.shift(); //  { letter: "c", answer: "churumbel", status: 0, question: "..." },
      var resp = getResponse(element);

      switch (resp) {
        case 'pasapalabra':
          questions2.push(element);
          break;
        case 'end':
          stop = true;
          break;
        case null:
          questions2.push(element);
          break;
        default:
          if (element.answer === resp) {
            element.status = 1;
            console.log('Respuesta correcta! :)');
            hits++;
            console.log(`Aciertos: ${hits}`);
          } else {
            element.status = -1;
            console.log('Respuesta incorrecta :(');
            console.log(element.question);
            console.log(`Respuesta Correcta: ${element.answer}`);
          }
          questions.push(element);
          break;
      }
      answered = questions.length;
  }
  ranking.push({name, hits});
  console.log(`Has acertado ${hits} preguntas`);
  var yourRanking = getRanking();
  if ((stop) || (yourRanking >= ranking.length)) {
    console.log(`Tu partida no entra en el Ranking`);
  } else {
    console.log(`Entras en el Ranking. Has quedado en posición ${yourRanking}`);
  }
}

function getResponse(element){
    do {
      var resp = prompt(element.question);
      if (resp === ''){ console.log('Introduce una respuesta válida') }
    } while (resp === '');
    if (resp !== null){resp = resp.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");}
    return resp;
}

function showInstructions(){
  console.log('********* ********* ********* ********* ********* JUEGO DE PASAPALABRA ********** ********* ********* ********* ********* ********* ');
  console.log('1. Responde en cualquier momento con "END" o pulsa sobre CANCELAR para salir del juego (no entrarás en el Ranking)');
  console.log('2. Responde con "PASAPALABRA" para dejar una pregunta para la siguiente ronda');
  console.log('********* ******* ******* ******* ******* ********* ******* ******* ******* ******* ********* ******* ******* ******* ******* *****');
}

/* Pregunta el Nombre da la bienvenida y devuelve el nombre*/
function sayHi(){
  var exit = false;
  do {
    name = prompt('¿Cuál es tu nombre?');
  } while (name === '');
  console.log(`Bienvenido ${name}`);
  return name;
}

/* Función que crea un Ranking ficticio utiliza un nº de aciertos
   random entre 0 y el nº max de aciertos = questions.length
   al llamar a sortRanking también ordena el ranking por Nº de aciertos*/

function createRanking(){
  var names = ['Latisha','Alpha','Pei','Asuncion','Oma','Tisa','Patty','Jackelyn','Samuel','Renee'];
  for (var i = 0; i < names.length; i++) {
    var random = randomNumber(questions.length+1);
    ranking.push({name: names[i], hits: random});
  }
  sortRanking();
}

/* Ordena el Array Ranking de objetivos por el número de aciertos*/
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

/*Función que devuelve un número del 1 al 10 que representa la
  posición en la que se encontraría el usuario tras jugar*/
function getRanking(){
  var stop = false;
  var userObject = ranking.pop();
  var i = 0;
  while ((!stop) && (i < ranking.length)) {
    if (userObject.hits > ranking[i].hits) {
        return i+1;
    }
    i++;
  }
  return ranking.length;
}

/* Imprime el Ranking de Usuarios */
function showRankingConsole(){
  showRanking();
  console.log('***************** TOP 10 ****************');
  for (var i = 0; i < ranking.length; i++) {
    console.log(`${i+1}. ${ranking[i].name} (${ranking[i].hits} aciertos)`);
  }
  console.log('********* ******* ******* ******* *******');
}

/* Imprime el Ranking de Usuarios */
function showRanking(){
  var rankingEl = document.getElementById("ranking")
  document.getElementById("rankingButton").value = "Ocultar Ranking"

  // rankingEl.classList.remove("invisible")
  // rankingEl.classList.add("visible")

  // createRanking()
  // var msg = ''
  // for (var i = 0; i < ranking.length; i++) {
  //   msg += '<tr>'
  //   msg += `<th scope="row">${i+1}</th>`
  //   msg += `<td>${ranking[i].hits}</td>`
  //   msg += `<td>${ranking[i].name}</td>`
  //   msg += '</tr>'
  // }
  // document.getElementById('bodyRanking').innerHTML = msg
}

/* Genera un Nº aleatorio entero entre mínimo y máximo (sin incluirlo) */
function randomNumber(max, min=1){
  return Math.floor(Math.random() * (max - min)) + min;
}
