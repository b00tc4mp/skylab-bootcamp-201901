let usuarios = [];
let ranking = [];
function pasapalabra(){
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
    ];
    const regla1 = '1) Por cada letra del abecedario se te realizará una pregunta';
    const regla2 = '2) Si contestas de manera correcta se te otorgará un punto por cada pregunta acertada';
    const regla3 = '3) Si no deseas contestar aún una pregunta, puedes dejarla pasar para la siguiente ronda copiando la palabra "pasapalabra"';
    const regla4 = '4) Si deseas abandonar el juego en algún momento presiona "cancelar" pero no se registrará tu record'
    let correctLetters = [];
    let incorrectLetters = [];
    let pasaLetters = [];
    let newGame = false;
    let user = '';

    function bienvenidos(){
        user = '';
        user = prompt('Bienvenidos al juego Pasapalabra\nPor favor introduce tu nombre');
            if(!user){
                if(ranking.length){
                    alert('Chao');
                    alert('Ranking\n' + ranking.join('\n'));
                    return
                };
                alert('Chao');
                return
            } else {
                alert(`Hola ${user}, las reglas del juego son las siguientes:\n${regla1}\n${regla2}\n${regla3}\n${regla4}`)
            };
            correctLetters = [];
            incorrectLetters = [];
            pasaLetters = [];
            for(let i = 0; i < questions.length; i++){
                questions[i].status = 0
            };
            juego();
    };

    function insertUser(usuario, puntos){
        let r = [];
        r.push(usuario, puntos);
        usuarios.push(r);
        sortUser(usuarios);
    };

    function listUser(arr){
        ranking = [];
        for(let i = 0; i < arr.length; i++){
            if(arr[i][1] === 1){
                ranking.push(`${arr[i][0]}: ${arr[i][1]} punto`)
            } else {
                ranking.push(`${arr[i][0]}: ${arr[i][1]} puntos`)
            }
        };
    }

    function sortUser(arr){
        let ordenados = [];
        for(let i = questions.length; i > -1; i--){
            for(j = 0; j < arr.length; j++){
                if(arr[j][1] === i){
                    ordenados.push(arr[j])
                }
            }
        };
        listUser(ordenados)
    }

    function estatus(){
        if(correctLetters.length){
            alert('Letras acertadas\n' + correctLetters);
        };
        if(incorrectLetters.length){
            alert('Letras no acertadas\n' + incorrectLetters);
        };
        if(pasaLetters.length){
            alert('Letras pasadas\n' + pasaLetters);
        };
        if(pasaLetters.length){
            juego();
            return
        };
        insertUser(user, correctLetters.length);
        if(correctLetters.length === 1){
            newGame = confirm(`${user} has respondido acertadamente ${correctLetters.length} pregunta y de manera incorrecta ${incorrectLetters.length} preguntas\nTu puntuación final es ${correctLetters.length}\n¿Volver  a jugar?`)
        } else if (incorrectLetters.length === 1){
            newGame = confirm(`${user} has respondido acertadamente ${correctLetters.length} preguntas y de manera incorrecta ${incorrectLetters.length} pregunta\nTu puntuación final es ${correctLetters.length}\n¿Volver  a jugar?`)
        } else {
            newGame = confirm(`${user} has respondido acertadamente ${correctLetters.length} preguntas y de manera incorrecta ${incorrectLetters.length} preguntas\nTu puntuación final es ${correctLetters.length}\n¿Volver  a jugar?`)
        };
        if(newGame){
            bienvenidos();
        } else{
            alert('Chao');
            alert('Ranking\n' + ranking.join('\n'));
            return
        };
    }
    function juego(){
        for(let i = 0; i < questions.length; i++){
            if(questions[i].status === 0){
                let q = prompt(questions[i].question);
                if(q === null){
                    alert('Chao');
                    if(ranking.length){
                        alert('Ranking\n' + ranking.join('\n'))
                    };
                    return
                }
                if(!(q.toUpperCase() === 'PASAPALABRA')){
                    questions[i].status = 1;
                    if(q.toUpperCase() === questions[i].answer.toUpperCase()){
                        alert(questions[i].answer + '\nCorrecto, has ganado 1 punto!');
                        correctLetters.push(questions[i].letter);
                        if(pasaLetters.indexOf(questions[i].letter) !== -1){
                            pasaLetters.splice(pasaLetters.indexOf(questions[i].letter),1)
                        }
                    } else {
                        alert('Respuesta incorrecta');
                        incorrectLetters.push(questions[i].letter);
                        if(pasaLetters.indexOf(questions[i].letter) !== -1){
                            pasaLetters.splice(pasaLetters.indexOf(questions[i].letter),1)
                        }
                    }
                } else {
                    if(pasaLetters.indexOf(questions[i].letter) === -1){
                        pasaLetters.push(questions[i].letter);
                    }                  
                }
            }
        };
        estatus()
    };
    bienvenidos();
};
pasapalabra();
