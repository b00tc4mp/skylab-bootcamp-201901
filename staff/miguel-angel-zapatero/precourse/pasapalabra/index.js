/* Haz el juego del Pasapalabra, el programa deberá lanzar la definición de una palabra y el usuario deberá adivinar que palabra estamos tratando, por ejemplo:

'>>>'With the letter "M", Capital of Spain, located in the center of the country.
'>>>' "Madrid"
'>>>'Correct, you have 1 Point!

Tu juego debería hacer una pregunta por cada letra del alfabeto, al final del juego, y habiendo respondido todas las letras, deberá indicarle al usuario cuantas letras ha fallado y cuantas ha acertado. Si el usuario responde con "pasapalabra" el juego deberá estar preparado para entender que en ese momento, el usuario no responderá esa pregunta, y no estará acertada ni fallada, la dejará para la siguiente ronda. El juego deberá, cuando finalize, mostrar un ranking de usuarios con el nombre y ordenados por cantidad de letras acertadas.
 */

let ranking;
let questions = [
    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
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
    { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
]

function showQuestion(data, ronda) {
    let result = prompt('Ronda ' + ronda + ':\n' + data.question);
    return result;
}

function goodAnswers(data) {
    return data.filter(elem => elem.status == 1).length;
}

function badAnswers(data) {
    return data.filter(elem => elem.status == -1).length;
}

function passQuestions(data) {
    return data.filter(elem => elem.status == 0);
}

// Función para crear ranking
function makeRanking(name, num) {
    return {playerName: name, points: num};
}

// Función para mostrar ranking
function showRanking(data) {
    let msg = '';
    orderRanking(data);
    data.forEach(function(elem, i){
        msg += `${i+1}: ${elem.playerName} ------> ${elem.points} POINTS\n`;
    });
    return msg;
}

// Función para ordenar el ranking por puntos
function orderRanking(data) {
    return data.sort((a, b) => b.points - a.points);
}

//Función para pedir el nombre del jugador.
function playerName() {
    let name;
    do {
        name = prompt("Nombre del jugador?");
    } while (!name);
    console.log(`Hola ${name}, comienza el juego!`);
    return name;
}

function pasapalabra(data) {
    let player = playerName();
    let ronda = 1;
    //Para inicializar el status de las preguntas
    data.forEach(elem => elem.status = 0);

    //Asignamos un valor a la variable ranking(global) sólo si no esta definida. 
    if (typeof ranking === 'undefined') {
        ranking = []; // no estás definiendo la variable ranking en nigún lado, tienes que definirla como variable.
    }

    while (passQuestions(data).length > 0) {
        passQuestions(data).forEach(function(elem){
            let q = showQuestion(elem, ronda);
            let letter = elem.letter;
            let index = data.findIndex(elem => elem.letter == letter);
            if (q == elem.answer) {
                data[index].status = 1;
                console.log('CORRECTO! +1 PUNTO');
            } else if (q != 'pasapalabra') {
                data[index].status = -1;
                console.log('ERROR!');
            } else {
                console.log('PASAPALABRA');
            }
        });
        ronda++;
    }
    console.log(`${player}: ${goodAnswers(data)} correcta/s - ${badAnswers(data)} fallada/s`);
    ranking.push(makeRanking(player, goodAnswers(data)));
    console.log(showRanking(ranking));

    if (confirm('Play again?')) {
        return pasapalabra(questions);
    } else {
        return 'Goodbye, see you again!';
    }
}

pasapalabra(questions);