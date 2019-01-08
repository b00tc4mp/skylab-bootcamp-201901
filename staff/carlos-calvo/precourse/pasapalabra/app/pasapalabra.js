function showPalabra(){
    document.getElementById("EspacioPreguntas").innerHTML = questions[indice].question;
    //Resaltar current
    Resaltar();
    document.getElementById("respuesta").value = "";//Ponemos en blanco para la siguiente pregunta
    document.getElementById("respuesta").focus(); //ponemos focus sobre el campo.
}

function Resaltar(){
    paint("#FFA500");
    document.createElement
    document.getElementById(questions[indice].letter).style.height = "50px"
    document.getElementById(questions[indice].letter).style.width = "50px"


}




/*Dudas
Primer Layout banda de la izquierda
Herencia en cascada (como saber los att que se heredan)
Timer
Mostrar el resultat 
Dejar los tags con el css por defecto, es decir tal com está en el css ---> REcorrer i deixar-ho tal qual està
*/

function checkRespuesta(){

    var answer = document.getElementById("respuesta").value; //Recollim valor resposta
    answer = answer.toLowerCase() //Mayúsculas y minúsculas
    if(answer == "pasapalabra"){
        console.log("pasamos!")
        questions[indice].status = 0;
        paint("#0000ff");
        //Pintamos la bola de azul
    } else if (answer == questions[indice].answer){
        console.log("Acierto!!")
        questions[indice].status = 1;
        paint("#00ff00");
        //Pintamos la bola de verde.
    } else{
        console.log("Ohhh fallo!!")
        questions[indice].status = 2;
        paint("#ff0000");
        //Pintamos la bola de rojo
    }
    //Debería poner el código de colores para las bolas.
    var final = setNextindex();
    if(final){
        return;
    }
    showPalabra();
}

function checkRespuestaPasapalabra(){

    console.log("pasamos!")
    questions[indice].status = 0;
    paint("#0000ff");
    //Pintamos la bola de azul
    setNextindex();
    showPalabra();
}

function setNextindex(){
    
    allAnswered = checkFinal();
    console.log("allAnswered = " + allAnswered)
    if(allAnswered){
        displayResultadoFinal(); //Display y habilitar empezar de nuevo.
        return true;
    }
    indice ++;
    if(indice == questions.length){ //Donem la volta si arribem a l'última lletra.
            indice = 0;
    }

    
    console.log(allAnswered)
    while(!allAnswered){
        if(questions[indice].status == 0){
            return false;
        } else {
            indice ++;
        }    
    }

    
}


function checkFinal(){
    var endgame = true;
    for (var i = 0; i < questions.length && endgame; i++){
        endgame = (questions[i].status != 0);
    }
    return endgame;

}

function paint(colorpaint){
    var id = questions[indice].letter;
    document.getElementById(questions[indice].letter).style.height = "40px"
    document.getElementById(questions[indice].letter).style.width = "40px"
    document.getElementById(id).style.backgroundColor = colorpaint;
}



function displayResultadoFinal(){
    document.getElementById("botonRespuesta").style.display= "none"
    document.getElementById("botonPasapalabra").style.display= "none"
    document.getElementById("botonReset").style.display="inline"
    document.getElementById("respuesta").style.display="none"
    var aciertos = 0;
    questions.forEach(function(element){
        if(element.status == 1){
            aciertos ++
        }
    })
    var fallos = 0;
    questions.forEach(function(element){
        if(element.status == 2){
            fallos ++
        }
    })
    var sincontestar = questions.length - aciertos - fallos;
    var str = "Felicidades! Has acertado " + aciertos + " y has fallado " + fallos + " y " + sincontestar + " sin contestar";
    document.getElementById("EspacioPreguntas").innerHTML = str;

}


function functionTimer(){
    /*var dataActual = new Date()
    var datafinal = new Date(dataActual.getMilliseconds() + 100000)
    i=100
    i=100;
    while (i>0){
        setInterval(function(){
            document.getElementById("clockdiv").innerHTML = i;
        }, 1000);
        i--;
    }
    
*/   
var TIME = 100
var myVar = setInterval(myTimer, 1000);
function myTimer() {
TIME--
    document.getElementById("clockdiv").innerHTML = TIME
}
}






var indice = 0;
var questions = [
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