var pasapalabrasGame = [
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

function getName (){
    return prompt('¡Bienvenido! ¿cúal es tu nombre?')
}


function showRanking(playersRanking){
    console.log('El ranking de jugadores es: ')
    // organizar el ranking de mayor a menor con sort 
    playersRanking.sort(function(a,b){
        return b.score - a.score
    }) 
    // iterar el ranking para mostrarlo
    for (let ranking in playersRanking){
        console.log(playersRanking[ranking].player + ' ' + playersRanking[ranking].score)
    }
}

let playersRanking = [];

function pasapalabras (pasapalabrasGame){
    let userName = getName()
    let keepPlaying = true;
    let rightAnswers = 0;
    let wrongAnswers = 0;
    while (keepPlaying){
        for (let question in pasapalabrasGame){
            //console.log('Con la letra ' + "'" + pasapalabrasGame[question].letter + "'" + ' la pregunta es:')
        let areThereAnyQuestionNotAnswered =  pasapalabrasGame.some(fullQuestion => {
            return fullQuestion.status === 0
        })  
        
       // console.log(areThereAnyQuestionNotAnswered)

            if (!areThereAnyQuestionNotAnswered) {    
                playersRanking.push({player: userName, score: rightAnswers})
                console.log('Hemos llegado al final del juego. Has acertado:  ' + rightAnswers + ' Has fallado ' + wrongAnswers)
                //ranking de jugadores
                showRanking(playersRanking)

                keepPlaying = confirm('¿Quieres jugar una nueva partida?')
                // ¿quieres a jugar? E iniciar el juego otra vez con otro nombre
                if (keepPlaying){
                    rightAnswers = 0; 
                    wrongAnswers = 0;
                    pasapalabrasGame.forEach(fullQuestion => {
                        fullQuestion.status = 0 //poner en 0 todos los status
                    })  
                    //Reiniciar preguntas
                    return pasapalabras (pasapalabrasGame)
                } else {
                    return 'Gracias por jugar'
                }
                
            } else if (pasapalabrasGame[question].status === 0) {            
                console.log(pasapalabrasGame[question].question)
                let userAnswer = prompt('¿Cuál es la respuesta? Si no lo sabes, puedes escribir "pasapalabra". Luego repetiremos la pregunta')

                // si el usuario pasapalabra... 
                if (userAnswer === 'pasapalabra'){

                } else if (userAnswer === pasapalabrasGame[question].answer) { // si el usuario acierta...  
                    rightAnswers++
                    pasapalabrasGame[question].status = 1
                    keepPlaying = confirm('¡Correcto! ¿vamos por la siguiente pregunta?')
                    
                    if (!keepPlaying){
                        return 'Gracias por jugar'
                    }  
                } else { // si el usuario no acierta... 
                    wrongAnswers++
                    pasapalabrasGame[question].status = -1
                    keepPlaying = confirm('Incorrecto :( ¿vamos por la siguiente pregunta?')

                    if (!keepPlaying){
                        return 'Gracias por jugar'
                    }
                }    
            }
        } 
    }
}

pasapalabras(pasapalabrasGame)