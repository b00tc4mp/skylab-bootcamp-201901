
function challenge(question){
    var message="|| "+question.letter.toUpperCase()+" || :    "+question.question;
    return message;
}
function play(answer,letter){
    if(letter.answer.toUpperCase()===answer.toUpperCase()){
        score++;
        (score===1)?alert("Correcto +1!, Tienes "+score+" punto en el marcador!") : alert("Correcto +1!, Tienes "+score+" puntos en el marcador!")
        return true;
    }else{
        alert("Incorrecto!, Vamos no te rindas!")
        return false;
    }
}

function rankingorder(){ // to order rank an returns scores to screen
    function compare(a,b){ //condition for sort funtion ***
        var comparison=0;
        const scorea=a.points;
        const scoreb=b.points;
        if(scoreb > scorea){
            comparison=1;
        }else{
            comparison=-1;
        }
        return comparison
    }
    var scoretext="Puntuaciones: \n\n";
    if(globalscores.length>0){
        globalscores.sort(compare); //sort function ***
        for(var i=0; i<globalscores.length;i++){
            scoretext+=(i+1).toString()+"- "+globalscores[i].player+" Acertó "+globalscores[i].points.toString()+" palabras del juego\n";
        }
        return scoretext;
    }else{
        return "NO SCORES"
    }
    
}


function game(){
    score=0;
    var name=prompt("Por favor introduce tu nombre: ")
    var finish=randomquest=0;
    var questions = [ //Multiples preguntas por letra, se pueden añadir al grupo y el programa escoge una al azar
        [
            { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
            { letter: "a", answer: "atraer", status: 0, question: "CON LA A. Hacer que algo o alguien se mueva/interese en algun sujeto u objeto"}
        ],
        [
            { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"}
        ],
        [
            { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"}
        ],
        [
            { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"}
        ],
        [
            { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"}
        ],
        [{ letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"}],
        [{ letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"}],
        [{ letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"}],
        [{ letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"}],
        [{ letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"}],
        [{ letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"}],
        [{ letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo"}],
        [{ letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"}],
        [{ letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia"}],
        [{ letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."}],
        [{ letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"}],
        [{ letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"}],
        [{ letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"}],
        [{ letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor"}],
        [{ letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático"}],
        [{ letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"}],
        [{ letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"}],
        [{ letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"}],
        [{ letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"}],
        [{ letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"}],
        [{ letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"}],
        [{ letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"}],
    ]
    do{
        for(var i=0;i<questions.length;i++){
            if(questions[i][0].status===0){
                randomquest=Math.floor(Math.random() * questions[i].length);
                answer=prompt(challenge(questions[i][randomquest]));
                if(answer==="END"){
                    return false;
                }else{
                    if(!(answer.toUpperCase()==="PASAPALABRA")){
                        play(answer,questions[i][randomquest])
                        for(var y=0;y<questions[i].length;y++){
                            questions[i][y].status=1;
                        }
                        finish++;
                    }else{
                        alert("PASAPALABRA! ---->")
                    }
                }
            }
        }
    }while(finish!==questions.length)
    "GENIAL! Completaste el pasapalabra!!"
    globalscores.push({ points: score, player: name })
    return true;
}

function pasapalabra(){
    var finished
    alert("Bienvenidos al Pasapalabra, Podras superarlo?")
    do{
        finished=game();
        if(finished === false){
            alert("Tu puntuacion es "+score+" del pasalabra sin terminar!");
        }else{
            alert(rankingorder())
        }
    }while(confirm("Quieres jugar otra vez?"))

}

var globalscores = [];
var score;
pasapalabra();
