//dibuix rosco
window.onload = function dibuixRosco() {
    var downloadTimer= 0;
    var div = 360/27; 
    var radius = 170; 
    var parentdiv = document.getElementById('parentdiv'); 
    var offsetToParentCenter = parseInt(parentdiv.offsetWidth/2); //assumes parent is square 
    var offsetToChildCenter = -20; 
    var totalOffset = offsetToParentCenter - offsetToChildCenter;
    var lletres = ['g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','a', 'b', 'c', 'd', 'e', 'f'];
    var lletresM = [];
    for (var i = 0; i < 27; ++i) { 
        var childdiv = document.createElement('div'); 
        // Creo el nou div i el seu id
        childdiv.className = 'div2';
        childdiv.id= lletres[i];
        lletresM[i] = lletres[i].toUpperCase();
        childdiv.style.position = 'absolute'; 
        var y = Math.sin((div * i) * (Math.PI/180)) * radius; 
        var x = Math.cos((div * i) * (Math.PI/180)) * radius; 
        childdiv.style.top = (y + totalOffset).toString() + "px"; 
        childdiv.style.left = (x + totalOffset).toString() + "px"; 
        // Poso les lletres dins els cercles
        parentdiv.appendChild(childdiv); 
        var newContent = document.createTextNode(lletresM[i]);
        childdiv.appendChild(newContent);
    }
}
// Comença el joc
 function boto() {
    document.getElementById("start").disabled = true;
    document.getElementById("tecles").style.visibility = "hidden";
    str();   
    foco();
    pasap();
}

function str() {
    timeleft = 110;
    document.getElementById("countdown").innerHTML = timeleft;

    downloadTimer = setInterval(function(){
        timeleft -= 1;
        document.getElementById("countdown").innerHTML = timeleft;  
        if((timeleft <= 0) || (document.getElementById("countdown").innerText == "GAME OVER"))  {
            clearInterval(downloadTimer);
            acaba();
        }
    }, 1000);
}
// per posicionar el cursor a resposta
function foco(resposta) {
    document.getElementById("resposta").focus();
}

// Quan s'acaba el temps s'anula teclat i es dibuixa el rectangle de Game Over
function acaba(){

    // PODRIA FER-SE AIXÍ: style="position: absolute; top: 450px; left: 30px"

    document.getElementById("countdown").style.borderRadius = "0px";
    document.getElementById("countdown").style.width = "79px";
    document.getElementById("countdown").style.height = "79px";
    document.getElementById("countdown").style.textAlign = "center";
    document.getElementById("countdown").style.fontSize = "20px";
    document.getElementById("countdown").innerText = "GAME OVER";
    document.getElementById("resposta").disabled = true;
}

function reloa() {
    location.reload() 
};
  
function pasap() {
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
    let answM = '';
    let answ = '';  
    let contRight = 0;
    let contWrong = 0;        
    // Contador per què no puc fer for amb document.getElement
    var finalCont = 0;
    // Pinto primera pregunta i contadors
    document.getElementById("pregunta").innerText = questions[finalCont].question;
    document.getElementById(questions[finalCont].letter).style.borderColor ='yellow';
    document.getElementById('contr').innerText = contRight;
    // Escolto l'event
    document.addEventListener('keyup', function(event) {
        // Espero fins que es premin les tecles enter o majúscules
        if ((event.code === 'Enter') || (event.keyCode == 16)){
            if (event.code === 'Enter') {
                answM = document.getElementById("resposta").value;
                answ = answM.toLowerCase();           
                if (answ == questions[finalCont].answer) {                        
                    contRight++;
                    document.getElementById("contr").innerText = contRight;   
                    document.getElementById(questions[finalCont].letter).style.background="rgb(75, 181, 63)";
                } else {
                    contWrong++;
                    //document.getElementById("contw").innerText = contWrong; 
                    document.getElementById(questions[finalCont].letter).style.background="red";
                } 
                questions[finalCont].status = 1;
                document.getElementById(questions[finalCont].letter).style.borderColor="black";
                document.getElementById("resposta").value= '';
                finalCont++;   
            }
            
            if (event.keyCode == 16) {
                document.getElementById('resposta').value= '';
                document.getElementById(questions[finalCont].letter).style.borderColor ='black';
                finalCont++;
            }
            // Per tornar a començar el rosco de lletres que han sigut saltades i no respostes
            if (finalCont == questions.length) {
                finalCont = 0;
            }
            // Escrivim la pregunta i mostrem la lletra que està activa i encara no s'ha respost
            while ((questions[finalCont].status == 1) && ((contRight+contWrong) != questions.length)){
                finalCont++;
            }
            document.getElementById("pregunta").innerText = questions[finalCont].question;
            document.getElementById(questions[finalCont].letter).style.borderColor ='yellow';
            console.log(contRight+contWrong);
            //per parar timer i tecles
            if (((contRight+contWrong) == questions.length) || (document.getElementById("countdown").innerText == "GAME OVER")) {
                clearInterval(downloadTimer);
                this.removeEventListener('keyup', arguments.callee);
                acaba();
            }
        }
    });
}