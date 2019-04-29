var questions = [
    { letter: "a", answer: ["abducir", "alcohol", "anarquia"], status: 0, question: ["CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien", "CON LA A. Compuesto de carbono, hidrógeno y oxígeno que deriva de los hidrocarburos y lleva en su molécula uno o varios hidroxilos (OH).", "CON LA A. Ausencia de poder público. Desconcierto, incoherencia, barullo."]},
    { letter: "b", answer: ["bingo", "bueno", "burocracia"], status: 0, question: ["CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso", "CON LA B. De valor positivo, acorde con las cualidades que cabe atribuirle por su naturaleza o destino.", "CON LA B. Organización regulada por normas que establecen un orden racional para distribuir y gestionar los asuntos que le son propios."]},
    { letter: "c", answer: ["churumbel", "cabron", "carajillo"], status: 0, question: ["CON LA C. Niño, crío, bebé", "CON LA C. de una persona, de un animal o de una cosa: Que hace malas pasadas o resulta molesto. ", "CON LA C. Bebida que se prepara generalmente añadiendo una bebida alcohólica fuerte al café caliente."]},
    { letter: "d", answer: ["diarrea", "delincuente", "dictadura"], status: 0, question: ["CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida", "CON LA D. Que delinque.", "CON LA D. Régimen político que, por la fuerza o violencia, concentra todo el poder en una persona o en un grupo u organización y reprime los derechos humanos y las libertades individuales."]},
    { letter: "e", answer: ["ectoplasma", "encallar", "etica"], status: 0, question: ["CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación", "CON LA E. Dicho de una embarcación: Dar en arena o piedra y quedar en ellas sin movimiento.", "CON LA E. Conjunto de normas morales que rigen la conducta de la persona en cualquier ámbito de la vida."]},
    { letter: "f", answer: ["facil", "follar", "facultad"], status: 0, question: ["CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad", "CON LA F. Soplar con el fuelle.", "CON LA F. Cada una de las divisiones académicas de una universidad, en la que se agrupan los estudios de una carrera determinada."]},
    { letter: "g", answer: ["galaxia", "giroscopio", "graduar"], status: 0, question: ["CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas", "CON LA G. Disco que, en movimiento de rotación, conserva su eje invariable aunque cambie la dirección de su soporte.", "CON LA G. Dar a algo el grado o calidad que le corresponde"]},
    { letter: "h", answer: ["harakiri", "hacienda", "habano"], status: 0, question: ["CON LA H. Suicidio ritual japonés por desentrañamiento", "CON LA H. Departamento de la Administración pública que elabora los presupuestos generales, recauda los ingresos establecidos y coordina y controla los gastos de los diversos departamentos.", "CON LA H. Cigarro puro elaborado en la isla de Cuba con hoja de la planta de aquel país."]},
    { letter: "i", answer: ["iglesia", "irrigar", "incontinencia"], status: 0, question: ["CON LA I. Templo cristiano", "CON LA I. Aplicar el riego a un terreno.", "CON LA I. Falta de continencia o de comedimiento."]},
    { letter: "j", answer: ["jabali", "jinete", "jade"], status: 0, question: ["CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba", "CON LA J. Persona diestra en la equitación.", "CON LA J. Piedra muy dura, tenaz, de aspecto jabonoso, blanquecina o verdosa con manchas rojizas o moradas, que suele hallarse formando nódulos entre las rocas estratificadas cristalinas"]},
    { letter: "k", answer: ["kamikaze", "kilogramo", "kafkiano"], status: 0, question: ["CON LA K. Persona que se juega la vida realizando una acción temeraria", "CON LA K. Unidad de masa del sistema internacional, equivalente a la de un cilindro de platino e iridio conservado en la Oficina Internacional de Pesas y Medidas, y aproximadamente igual a la masa de 1000 centímetros cúbicos de agua a la temperatura de su máxima densidad, cuatro grados Celsius.", "CON LA K. Que tiene rasgos característicos de la obra de Kafka."]},
    { letter: "l", answer: ["licantropo", "lineal", "lobezno"], status: 0, question: ["CON LA L. Hombre lobo", "CON LA L. Perteneciente o relativo a la línea.", "CON LA L. Apodo que recibe Logan"]},
    { letter: "m", answer: ["misantropo", "marciano", "mercancia"], status: 0, question: ["CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas", "CON LA M. Perteneciente o relativo al planeta Marte.", "CON LA M. Cosa mueble que se hace objeto de trato o venta."]},
    { letter: "n", answer: ["necedad", "negado", "nini"], status: 0, question: ["CON LA N. Demostración de poca inteligencia", "CON LA N. Incapaz o totalmente inepto para algo.", "CON LA N. neologismo procedente de la expresión «ni estudia ni trabaja»"]},
    { letter: "ñ", answer: ["señal", "niñato", "apaño"], status: 0, question: ["CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.", "CONTIENE LA Ñ. Persona joven presuntuosa e inmadura.", "CONTIENE LA Ñ. Compostura, reparo o remiendo hecho en alguna cosa."]},
    { letter: "o", answer: ["orco", "ocio", "obvio"], status: 0, question: ["CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien", "CON LA O. Tiempo libre de una persona.", "CON LA O. Muy claro o que no tiene dificultad."]},
    { letter: "p", answer: ["protoss", "perrear", "persistir"], status: 0, question: ["CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft", "CON LA P. Accion de bailar ritmos latinos frotandose los genitales o el trasero con otra persona", "CON LA P. Mantenerse firme o constante en algo."]},
    { letter: "q", answer: ["queso", "quidditch", "quilla"], status: 0, question: ["CON LA Q. Producto obtenido por la maduración de la cuajada de la leche", "CON LA Q. deporte en el que dos equipos de siete jugadores montan en palos de escoba basado en un juego descrito en la serie de libros de Harry Potter por J.K. Rowling.", "CON LA Q. Pieza de madera o hierro, que va de popa a proa por la parte inferior del barco y en que se asienta toda su armazón."]},
    { letter: "r", answer: ["raton", "religion", "radiacion"], status: 0, question: ["CON LA R. Roedor", "CON LA R. Conjunto de creencias o dogmas acerca de la divinidad, de sentimientos de veneración y temor hacia ella, de normas morales para la conducta individual y social y de prácticas rituales, principalmente la oración y el sacrificio para darle culto.", "CON LA R. Energía ondulatoria o partículas materiales que se propagan a través del espacio."]},
    { letter: "s", answer: ["stackoverflow", "saciar","sicario"], status: 0, question: ["CON LA S. Comunidad salvadora de todo desarrollador informático", "CON LA S. Calmar por completo el hambre o la sed de alguien.", "CON LA S. Asesino asalariado."]},
    { letter: "t", answer: ["terminator", "timbre","thanos"], status: 0, question: ["CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984", "CON LA T. Pequeño aparato empleado para llamar o avisar mediante la emisión rápida de sonidos intermitentes.", "CON LA T. supervillano del mundo ficticio marvel cuyo principal objetivo era equilibrar el universo, ya que creía que su población masiva inevitablemente acabaría con los recursos disponibles y eso condenaría a todas las especies."]},
    { letter: "u", answer: ["unamuno", "unguento", "uñero"], status: 0, question: ["CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914", "CON LA U. Medicamento que se aplica al exterior, compuesto de diversas sustancias, entre las cuales figuran la cera amarilla, el aceite de oliva y el sebo de carnero.", "CON LA U. Herida que produce la uña cuando, al crecer viciosamente, se introduce en la carne."]},
    { letter: "v", answer: ["vikingos", "vicio", "virtud"], status: 0, question: ["CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa", "CON LA V. Gusto especial o demasiado apetito de algo, que incita a usarlo frecuentemente y con exceso.", "CON LA V. Fuerza, vigor o valor."]},
    { letter: "w", answer: ["sandwich", "weka", "wanaka"], status: 0, question: ["CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso", "CON LA W. Especie de ave gruiforme de la familia Rallidae endémica de Nueva Zelanda", "con la W. Nombre del lago mas grande ubicado en la región de Otago de Nueva Zelanda."]},
    { letter: "x", answer: ["botox", "xilofono", "codex"], status: 0, question: ["CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética", "CON LA X. Instrumento musical de percusión formado por láminas generalmente de madera, ordenadas horizontalmente según su tamaño y sonido, que se hacen sonar golpeándolas con dos baquetas.", "CONTIENE LA X. Libro manuscrito de cierta antigüedad."]},
    { letter: "y", answer: ["peyote", "yelmo", "ayahuasca"], status: 0, question: ["CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos", "CON LA Y. Pieza de la armadura antigua que resguardaba la cabeza y el rostro, y se componía de morrión, visera y babera.", "CONTIENE LA Y. Liana de la selva de cuyas hojas se prepara un brebaje de efectos alucinógenos, empleado por chamanes con fines curativos."]},
    { letter: "z", answer: ["zen", "zarandear", "zasca"], status: 0, question: ["CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional", "CON LA Z. Agarrar a alguien por los hombros o los brazos moviéndolo con violencia.", "CON LA Z. interjección, asimilable a zas que se usa para imitar el sonido de un golpe o para denotar el carácter súbito o sorpresivo de un hecho"]},
];
var questionNumber = 0;
var playTime = 150;
var play = false;
var points = 0;
var userName = "";
var questionsAnswered = 0;
var randomNum = 0;
var pasapalabraCalled = [];
var ranking = [];
var newTimer;
var startButton = document.getElementById("start");
var questionBox = document.getElementById("question");
var answerInput = document.getElementById("answer");
var timer = document.getElementById("timer");
var pointsOutput = document.getElementById("points");
var rankingOutput = document.getElementById("usersRank");
var gameMessage = document.getElementById("message");


window.onload = function roscoConstruct(){
    var radius = 220;
    var elements = document.querySelectorAll('li'); 
    var numberOfElements = elements.length;
    var slice = 360 / numberOfElements;

    for (let i=0; i<numberOfElements;i++){
        var y = Math.sin((slice * i) * (Math.PI/180)) * radius; 
        var x = Math.cos((slice * i) * (Math.PI/180)) * radius;
        elements[i].style.transform = "translate(" + y.toString() + "px, " + x.toString() + "px)"; // ...style.transform = "translate(Xpx, Ypx)"
    }
}

function SetTimer(){
    newTimer = setInterval(function(){
        playTime -= 1;
        document.getElementById("timer").innerHTML = playTime;
        if(playTime ==0){
            endGame("<br>GAME OVER!<br>Se acabó el tiempo!");
        };
    }, 1000);
}

function startGame(){
    play = !play;
    var playTime = 150;

    if(play){
        gameMessage.style.display = "none";
        timer.innerHTML = playTime;
        startButton.style.backgroundColor = "orange";
        startButton.innerHTML = "Finalizar juego";
        userName = askUserName();
        SetTimer();
        answerInput.value = "";
        questionBox.innerText = showQuestion();
        answerInput.focus();
    }else{
        points -= 5;
        endGame("GAME OVER!<br><br>Pulsa jugar para empezar de nuevo.");
    }
}

function submitAnswer(event){

    if(play){
        if (event.keyCode === 13){    
            checkAnswer(answerInput.value, randomNum);
            nextQuestion(); 
            questionBox.innerText = showQuestion();
        }else if(event.keyCode === 32){
            checkAnswer("pasapalabra", randomNum);
            nextQuestion();
            questionBox.innerText = showQuestion();
        }else if(event.keyCode === 27){
            points -= 5;
            endGame("<br>GAME OVER!<br>Pulsa jugar para empezar de nuevo.");
        }
        if (questionsAnswered == questions.length){
            endGame("GAME OVER!<br>Terminaste el rosco.<br>Pulsa jugar para empezar de nuevo");
        }
    }
}

function askUserName(){                         //funcion que pide nombre de usuario y controla que insertemos almenos un caracter.
    var userName = prompt("Para empezar, introduce tu nombre de usuario.");

    while(userName=='' || userName== null ||userName == ' '){
        userName = prompt("Nombre de usuario incorrecto. introduce tu nombre de usuario porfavor");
    }
    return userName;
}

function showQuestion(){
    randomNum =  (pasapalabraCalled.length > 0) ? checkPasapalabra(pasapalabraCalled, questions[questionNumber].letter) : getRandomNum(3);
    return questions[questionNumber].question[randomNum];
}

function checkAnswer(answer, num){
    
    answer = answer.toLowerCase();
    
    if(answer === "pasapalabra"){
        pasapalabraCalled.push([questions[questionNumber].letter, num]) 
    }else{
        if (answer === questions[questionNumber].answer[num]){
            document.getElementById(questions[questionNumber].letter).style.backgroundColor = "green";
            questions[questionNumber].status = 1;
            points += 1;
            pointsOutput.innerText = points;
        } else{
            document.getElementById(questions[questionNumber].letter).style.backgroundColor = "red";
            questions[questionNumber].status = 1;
        }
        questionsAnswered += 1;
    }
    answerInput.value = "";
}

function nextQuestion(){
    
    if (questionsAnswered < questions.length){
        do{
            questionNumber += 1;
            questionNumber = (questionNumber == questions.length) ? 0 : questionNumber;
        }while (questions[questionNumber].status != 0)
    }  
}

function getRandomNum(numRange){                //funcion que genera numeros aleatorios dentro del rango que hemos definido.
    var i = Math.floor((Math.random() * numRange));
    return i;
}

function checkPasapalabra(pasapalabraArr, letter){
    var pasapalabraFound = false;
    var randomNum;

    pasapalabraArr.forEach(element => {
        if(element[0] == letter && pasapalabraFound == false){
            randomNum = element[1];
            pasapalabraFound = true;
        }
    });
    if (pasapalabraFound == false){ randomNum = getRandomNum(3)}

    return randomNum;
}

function endGame(message){

    enterRanking(ranking, userName, points);
    rankingOutput.innerHTML = showRanking(ranking);
    clearInterval(newTimer);

    questionNumber = 0;
    playTime = 150;
    points = 0;
    userName = "";
    questionsAnswered = 0;
    pasapalabraCalled = [];
    startButton.style.backgroundColor = "green";
    startButton.innerHTML = "Jugar!";
    questionBox.innerText = "";
    answerInput.value = "";
    timer.innerText = "0";
    pointsOutput.innerText = "0";
    
    play = false;

    questions.forEach(element =>{
        element.status = 0;
        document.getElementById(element.letter).style.backgroundColor = "steelblue";
    });

    gameMessage.style.display = "block";
    gameMessage.innerHTML = message;
}

function enterRanking(array, userId, points){   //funcion para generar una nueva entrada al array del ranking.
    var newRanking = new newAtRanking(userId, points);
    array.push(newRanking);
    return array;

}

function newAtRanking(userId, points){          //funcin para crear un nuevo objeto de entrada al ranking.
    this.userId = userId;
    this.points = points;
}

function showRanking(ranking){                  //funcion que devuelve un string con el ranking de forma ordenada y amigable para mostrar en pantalla.
    var str = '';
    var position = 1;
    function compare(a,b) {
        if (a.points > b.points)
          return -1;
        if (a.points < b.points)
          return 1;
        return 0;
      }
      
    ranking.sort(compare);

    ranking.forEach(element =>{
       
        str = str.concat(position, " - ", element.userId , "............", element.points, "<br>");
        position += 1;

    });
    dots = "................"
    return str;
};