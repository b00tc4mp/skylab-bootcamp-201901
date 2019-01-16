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

var i = 0;
var h = 0;
var points = 0;
var qArray = [];
var ranking = [];
var listArray = [];
var userArray = [];
var passedArray = [];
var rankingArray = [];

var list = document.getElementsByClassName("item");
for (j = 0; j < list.length; j++) {
    listArray.push(list[j]);
}
document.getElementById("rankT").style.display = "none";

function turn() {
    if (i < 27) {
        document.getElementById("text").innerHTML = questions[i].question;
        document.getElementById("ranking").innerHTML = "";
        document.getElementById("rankT").style.display = "none";

    } else {
        if (qArray.length > h) {
            document.getElementById("text").innerHTML = qArray[h].question;
        } else {
            document.getElementById("text").innerHTML = "";
            document.getElementById("points").innerHTML = ("Has acertado: " + points + "; Has fallado: " + (27-points));
            document.getElementById("button3").style.display = "unset";
            document.getElementById("button2").style.display = "none";
            document.getElementById("input1").style.display = "none";
            var player = {name: userArray[0], pointsWon: points};
            ranking.push(player);
    
            function compare(a, b) {
                var pointsA = a.pointsWon;
                var pointsB = b.pointsWon;
        
                var comparison = 0;
                if (pointsA > pointsB) {
                    comparison = 1;
                } else if (pointsA < pointsB) {
                    comparison = -1;
                }
                return comparison * -1;
            };
            var rankings = ranking.sort(compare);

            rankingArray = [];

            for (g = 0; g < rankings.length; g++) {
                rankingArray.push(JSON.stringify(rankings[g]) + "<br>");
            }

            document.getElementById("ranking").innerHTML = (rankingArray.join(""));
            document.getElementById("rankT").style.display = "unset";
            userArray.pop();
        }

    }
    
};

function pasapalabra() {
    var answer = (document.getElementById("input1").value).toUpperCase();

    if (answer == 'PASAPALABRA') {
        window.alert('Passed')
        qArray.push(questions[i]);
        listArray[i].style.background = 'yellow';
        i++;
        turn();
    } else {
        match();
    }
}

function match() {
    var answer = document.getElementById("input1").value;

    if (i < 27) {
        
        if (answer == questions[i].answer) {
            window.alert("Correct!")
            listArray[i].style.background = 'green';
            points++;
        } else {
            window.alert("Incorrect!")
            listArray[i].style.background = 'red';
        }
        i++;
    } else {
        for (p = 0; p < listArray.length; p++) {
            if ((listArray[p].style.background == 'yellow')) {
                passedArray.push(listArray[p]);
            }
        }
        
        if (h < qArray.length) {
            if (answer == qArray[h].answer) {
                window.alert("Correct!")
                points++;
                passedArray[h].style.background = 'green';
            } else {
                window.alert("Incorrect!")
                passedArray[h].style.background = 'red';
            }
            h++;
        }
    }
};

function changeButton() {
    var x = document.getElementById("button1");
    var y = document.getElementById("button2");
    var z = document.getElementById("input1");
    var user = document.getElementById("input2");
    x.style.display = "none";
    y.style.display = "unset";
    z.style.display = "unset";
    user.style.display = "none";

};

function playAgain() {
    var color = "rgb(119,111,243)";
    i = 0;
    points = 0;
    for (k = 0; k < listArray.length; k++) {
        listArray[k].style.background = color;
    }
    var x = document.getElementById("button1");
    var y = document.getElementById("button2");
    var playA = document.getElementById("button3");
    var z = document.getElementById("input1");
    var score = document.getElementById("points");
    var userPlace = document.getElementById("input2");
    var userOkok = document.getElementById("okUser");
    document.getElementById("text").innerHTML = "";
    y.style.display = "none";
    x.style.display = "unset";
    z.style.display = "none";
    playA.style.display = "none";
    score.style.display = "none";
    userPlace.style.display = "unset";
    userOkok.style.display = "unset";

};

function userPush() {
    var userBut = document.getElementById("okUser");
    var userInput = document.getElementById("input2");
    var username = userInput.value;
    userArray.push(username);
    userBut.style.display = "none";
    userInput.style.display = "none";
}

/*else if (i >= 27) {
        i = 0;
        document.getElementById("text").innerHTML = questions[i].question;*/