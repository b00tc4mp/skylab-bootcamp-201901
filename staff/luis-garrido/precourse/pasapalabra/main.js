

var nombre = "";
var ranking = [];

function Usuario(nombreUsuario, puntuacion) {
    this.nombreUsuario = nombreUsuario;
    this.puntuacion = puntuacion;
    ranking.push(this);
}

var cactus = new Usuario ('Cactus',5);
var ficus = new Usuario ('Ficus',15);
var enjuto = new Usuario ('Enjuto',22);
var hulk = new Usuario ('Hulk Hogan',26);
var chuck = new Usuario ('Chuck Norris',28);

function mostrarRanking() {
    ranking.sort(function (a, b) {return (b.puntuacion - a.puntuacion)});
    var position = 1;
    var rankingString = "";
    ranking.forEach(function(user) {
        rankingString += position+" - "+user.nombreUsuario+" - "+user.puntuacion+" puntos.<br />";
        position++;
    });
    document.getElementById("ranking").innerHTML = rankingString;
}

mostrarRanking(); 

document.getElementById("botonDeJugar").addEventListener("click", function(){
    if (document.getElementById("pedirNombreInput").value === "") {
        nombre = "John Snow";
    }

    else {
        nombre = document.getElementById("pedirNombreInput").value;
    }
    pasapalabra();
});




function pasapalabra() {
    var correctas=0;
    var incorrectas=0;
    var respuesta = "";
    
    var aQuestions = [
        { letter: "a", answer: "abducir", question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
        { letter: "a", answer: "andorra", question: "CON LA A. País situado entre España y Francia"},
        { letter: "a", answer: "alquimia", question: "CON LA A. Protociencia que buscaba la piedra filosofal"},
    ];

    var bQuestions = [
       { letter: "b", answer: "bingo", question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
       { letter: "b", answer: "babilonia", question: "CON LA B. Fue gobernada por Nabucodonosor II"},
       { letter: "b", answer: "batman", question: "CON LA B. Multimillonario que se disfraza de murciélago para zurrarle a los villanos"},
    ];

    var cQuestions = [
       { letter: "c", answer: "churumbel", question: "CON LA C. Niño, crío, bebé"},
       { letter: "c", answer: "castlevania", question: "CON LA C. Saga de videojuegos protagonizada por la familia Belmont y sus cruzadas contra Drácula."},
       { letter: "c", answer: "castillo", question: "CON LA C. Lugar fuerte, cercado de murallas, baluartes, fosos y otras fortificaciones"},
    ];

    var questions = [
       aQuestions[Math.floor(Math.random()*3)],
       bQuestions[Math.floor(Math.random()*3)],
       cQuestions[Math.floor(Math.random()*3)],
       { letter: "d", answer: "diarrea", question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
       { letter: "e", answer: "ectoplasma", question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
        { letter: "f", answer: "facil", question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
        { letter: "g", answer: "galaxia", question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
        { letter: "h", answer: "harakiri", question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
        { letter: "i", answer: "iglesia", question: "CON LA I. Templo cristiano"},
        { letter: "j", answer: "jabali", question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
        { letter: "k", answer: "kamikaze", question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},
        { letter: "l", answer: "licantropo", question: "CON LA L. Hombre lobo"},
        { letter: "m", answer: "misantropo", question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
        { letter: "n", answer: "necedad", question: "CON LA N. Demostración de poca inteligencia"},
        { letter: "ñ", answer: "señal", question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
        { letter: "o", answer: "orco", question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
        { letter: "p", answer: "protoss", question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
        { letter: "q", answer: "queso", question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},
        { letter: "r", answer: "raton", question: "CON LA R. Roedor"},
        { letter: "s", answer: "stackoverflow", question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},
        { letter: "t", answer: "terminator", question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
        { letter: "u", answer: "unamuno", question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
        { letter: "v", answer: "vikingos", question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
        { letter: "w", answer: "sandwich", question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
        { letter: "x", answer: "botox", question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"},
        { letter: "y", answer: "peyote", question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
        { letter: "z", answer: "zen", question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
    ];

    indicePregunta = 0;

    function nuevaPregunta() {

        document.getElementById("pregunta").innerHTML = questions[indicePregunta].question;
        
    };
    
    nuevaPregunta();

    document.getElementById("botonDeResponder").addEventListener("click", function(){
        respuesta = document.getElementById("pedirRespuestaInput").value.toLowerCase();
        comprobarRespuesta();
    });

    endGame = false;

    function comprobarRespuesta(){
        if(respuesta===questions[indicePregunta].answer) {
            document.getElementById("feedback").innerHTML = "Respuesta correcta! 1 punto!";
            correctas++;
            questions.splice(indicePregunta, 1);
        }
        else if(respuesta==='pasapalabra') {
            document.getElementById("feedback").innerHTML = 'Pasamos palabra.';
            indicePregunta++;
        }
        else if(respuesta==='end') {
            endGame===true;
        }
        else if(respuesta!==questions[indicePregunta].answer) {
            document.getElementById("feedback").innerHTML = 'Respuesta incorrecta... ouch!';
            incorrectas++;
            questions.splice(indicePregunta, 1);
        }
        if(indicePregunta===questions.length-1) {
            indicePregunta=0;
        }

        if(questions.length===0) {
            document.getElementById("feedback").innerHTML = correctas+' preguntas acertadas y '+incorrectas+' falladas.';
            var player = new Usuario (nombre,correctas);
            mostrarRanking();
        }
        else if (endGame===true){
            document.getElementById("feedback").innerHTML = correctas+' preguntas acertadas y '+incorrectas+' falladas. '+questions.length+' por responder. No entras en el ranking.';
        }
        else {
            nuevaPregunta();
        }
    }
}



