let countCorrect =0
let countIncorrect =0
let countUsers = 0
let saveRanking = 0
let saveRankingNeg = 0
let saveUsuario = ""
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
    { letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"},
    { letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
    { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
]

let users =[
    { position: 0, name:"", correctAnswers: 0, incorrectAnswers: 0},
]
let userAnswer = ""
let i=0
let saveLetters =[]
let segundaVuelta = false
let j=0
let user = ""
let inicio = false
let color=""
let botonSubmit = document.getElementById("vuelta");
botonSubmit.disabled=true
let totalTiempo = 0;


//Definimos la funcion que hara las preguntas y las guardara como correctas o incorrectas
function vuelta(){
    userAnswer = document.getElementById("respuesta").value.toLowerCase()
        if (questions[i].status === 0){
            if (userAnswer === questions[i].answer){
                alert("Correcto")
                questions[i].status = "correct"
                countCorrect ++
            }
            else if (userAnswer === "pasapalabra"){
                alert("Pasamos a la siguiente letra")
                if (segundaVuelta === false){
                    saveLetters.push(i)
                }
            }
            else if (userAnswer === "end"){
                alert("Gracias por participar al juego de Pasapalabra")
            }
            else {
                alert("Tu respuesta es incorrecta")
                questions[i].status = "incorrect"
                countIncorrect ++
            }
        cambiarColor(questions[i].letter);
        }
        // si el usuario introduce "end" se acaba la partida y se llama a la funcion "finalizar"
        if (userAnswer === "end" || countCorrect+countIncorrect === 25){
            i = questions.length
            finalizar();
        }
        //Se comprueba si ya ha acabado la primera vuelta o no
        else {
            document.getElementById("respuesta").value=""
            if (i===24 && segundaVuelta===false){
              segundaVuelta = true
              i=saveLetters[0]
              document.getElementById("preguntas").innerHTML = questions[i].question
            }
            // cuando se empieza la segunda vuelta cambiamos el valor de la i para que coja solo las "pasapalabras"
            else if(segundaVuelta === true){
                if(questions[saveLetters[j]].status === "incorrect" ||  questions[saveLetters[j]].status === "correct"){
                    saveLetters.splice(j,1)
                    if(saveLetters.length > 1 && saveLetters.length !== j){
                        i = saveLetters[j]
                    }
                    else{
                        i = saveLetters[0]
                        j=0
                    }
                }
                else{
                    if(saveLetters.length > 1 && saveLetters[saveLetters.length-1] !== i){
                        j++
                        i = saveLetters[j]
                    }
                    else{
                        i = saveLetters[0]
                        j=0    
                    }
                }
                document.getElementById("preguntas").innerHTML = questions[i].question
            }
            else{

                document.getElementById("preguntas").innerHTML = questions[i+1].question
                i++
            }
        }
}

// funcion que permite empezar a jugar. Además se borran los valores de la partida anterior
function pasapalabra(){
    for (let k =0; k<questions.length;k++){
        questions[k].status=0
    }
    reiniciarColores()
    countCorrect =0
    countIncorrect =0
    user = prompt("Por favor introduzca su nombre de usuario");
    botonSubmit.disabled = false
    document.getElementById("preguntas").innerHTML = questions[0].question
    inicio = true
    totalTiempo=180;
    updateReloj();
}

// funcion que finaliza el juego. Se ordena el ranking y se reinician algunos valores por si otro usuario quiere jugar
function finalizar (){
    document.getElementById("preguntas").innerHTML="Tu resultado es: "+ "<br>" + countCorrect + " letras acertadas" + "<br>" + countIncorrect + " letras falladas"

    if (userAnswer !== "end"){
        if (users[0].name === ""){
            users[0].position = 1
            users[0].name = user
            users[0].correctAnswers = countCorrect
            users[0].incorrectAnswers = countIncorrect
            countUsers ++
        }
        else{
            users[countUsers] = new Object()
            users[countUsers].position = countUsers+1
            users[countUsers].name = user
            users[countUsers].correctAnswers = countCorrect
            users[countUsers].incorrectAnswers = countIncorrect
            countUsers ++
        }

        for (let j=0; j<users.length; j++){
            for (let i =0; i<countUsers-1; i++){
                if (users[i+1].correctAnswers > users[i].correctAnswers){
                    saveRanking = users[i+1].correctAnswers
                    saveRankingNeg = users[i+1].incorrectAnswers
                    saveUsuario = users[i+1].name
                    users[i+1].correctAnswers = users[i].correctAnswers
                    users[i+1].incorrectAnswers = users[i].incorrectAnswers
                    users[i+1].name = users[i].name
                    users[i].correctAnswers = saveRanking
                    users[i].incorrectAnswers = saveRankingNeg
                    users[i].name = saveUsuario
                }
            }
        }
    }
    document.getElementById("respuesta").value=""
    i=0
    saveLetters =[]
    j=0
    segundaVuelta = false
    inicio = false
    botonSubmit.disabled = true
    totalTiempo =-1
    userAnswer=""
}

// funcion que permite ver el ranking siempre y cuando ya se haya registrado algun usuario o no se este en medio de una partida
function ranking(){
    if (inicio === false && user !== ""){
        document.getElementById("preguntas").innerHTML=""
        for (let i=0; i<users.length; i++){
        document.getElementById("preguntas").innerHTML+= users[i].position + ") " + users[i].name + " -> " + users[i].correctAnswers + " aciertos" + "<br>"    
        }
    }
    else if (inicio === true) {
        alert("Espere a terminar la partida")
    }
    else {
        alert("Todavia no tenemos nigun usuario registrado")
    }
}

// funcion que va cambiando de color las letras si se aciertan o fallan
function cambiarColor(letra) {
    color = document.getElementById(letra)
    if (questions[i].status === "incorrect"){
        color.style.backgroundColor ="red";
        color.style.borderColor = "#7b0407";
    }
    else if (questions[i].status === "correct"){
        color.style.backgroundColor ="#54fe00";
        color.style.borderColor = "#086332";
        color.style.color = "black";
    }
}

// Funcion que se llama desde la funcion "pasapalabra" para que cada vez que se inicie esten todas las letras de color azul
function reiniciarColores(){
    for (let i=0; i<questions.length; i++){
        color = document.getElementById(questions[i].letter)
        color.style.backgroundColor ="blue";
        color.style.borderColor = "rgb(7, 26, 131)";
        color.style.color = "white";
    }
}

// funcion donde se hace la cuenta atras
function updateReloj(){
    if (totalTiempo>-1 && userAnswer!== "end" && (countCorrect+countIncorrect)<25){
    document.getElementById("timer1").innerHTML = totalTiempo;
    totalTiempo-=1
    setTimeout("updateReloj()",1000);
    }
    else if (userAnswer==="" || userAnswer==="end"){

    }
    else {
        alert("Se ha acabado el tiempo...")
        finalizar();
    }
}