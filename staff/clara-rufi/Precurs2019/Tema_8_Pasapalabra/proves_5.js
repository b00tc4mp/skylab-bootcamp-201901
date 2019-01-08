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


nameUser = []
    document.getElementById('letters').style="display:none;"
    document.getElementById('showQuestion').style="display:none;"
    document.getElementById('userAnswer').style="display:none;"
    document.getElementById('acceptar').style="display:none;"
    document.getElementsByClassName('letter').style="display:none;"
    document.getElementById('Okrepeat').style="display:none;"//pq no es mostri
    document.getElementById('repeatPasapalabra').style="display:none;"
    document.getElementById('showresults').style="display:none;"
    document.getElementById('results').style="display:none;"

function login(){
    
    if (document.getElementById("nameUser").value !== "")
        nameUser.push(document.getElementById("nameUser").value)
        console.log(nameUser)
        document.getElementById("welcome").value += "Bienvenido " + nameUser + " !!"
}

n = 0
function start(){
    document.getElementById('letters').style="display:block;"
    document.getElementById('showQuestion').style="display:block;"
    document.getElementById('userAnswer').style="display:block;"
    document.getElementById('loginUser').style="display:none;" 
    document.getElementById('Okrepeat').style="display:none;"
    document.getElementById('repeatPasapalabra').style="display:none;"
    document.getElementById('acceptar').style="display:block;"
    
    document.getElementById("showQuestion").value = questions[n].question;
}

rep = 0
numFalladas = 0
numAcertadas = 0


function accept(){

    if (questions[n].status === 0){
        document.getElementById("showQuestion").value = questions[n].question;
        if (document.getElementById("userAnswer").value === "pasapalabra"){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "DarkOrange";
        n+= 1
        

        }else if (document.getElementById("userAnswer").value !== questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "Crimson";
        questions[n].status = 1
        n+= 1
        numFalladas += 1

        }else if (document.getElementById("userAnswer").value === questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "limegreen";
        questions[n].status = 2
        n+= 1
        numAcertadas += 1
        }
    
    }else if (questions[n].status !== 0){
        n+= 1
    }
    document.getElementById("userAnswer").value = "";
    document.getElementById("showQuestion").value = "";
         
    if (n <= 26){

        document.getElementById("showQuestion").value = questions[n].question;
    }

        numTotal = numAcertadas + numFalladas

    if(n>=27 && numTotal === 27){
        
        document.getElementById("showQuestion").value = nameUser + ", has acertado un total de " + numAcertadas + " letras y has fallado un total de " + numFalladas + " letras, pero ganas 1.000€ por participar. Felicidades!!"
        document.getElementById('acceptar').style="display:none;"
        document.getElementById('showresults').style="display:block;"
  
    }else if(n>=27){
        document.getElementById("userAnswer").value = "";
        document.getElementById('acceptar').style="display:none;"
        document.getElementById('repeatPasapalabra').style="display:block;"//pq no es mostri
        document.getElementById("showQuestion").value = nameUser + ", has finalizado la Ronda número " + rep + " del Pasapalabra!"
        n=0
    }

}

rep = 1
n = 0
pasapalabra= []

function repeatPasapalabra(){
    document.getElementById('repeatPasapalabra').style="display:none;"
    document.getElementById('Okrepeat').style="display:block;"//pq es mostri
    n = 0
    rep += 1
    if(questions[n].status === 0){
    document.getElementById("showQuestion").value = questions[n].question;   
    
    }else if (questions[n].status !== 0){
        
        for (var j = 0; j<questions.length; j++){
            if(questions[j].status === 0){
                n +=j 
                document.getElementById("showQuestion").value = questions[j].question;
                break;
            }    
            }       
    }
}

numPasapalabra =0

function Okrepeat (){
    numPasapalabra = 0
    if (questions[n].status === 0){    
       if (document.getElementById("userAnswer").value === "pasapalabra"){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "DarkOrange";
        numPasapalabra += 1
            
        }else if (document.getElementById("userAnswer").value !== questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "Crimson";
        questions[n].status = 1
        
        numFalladas += 1
        }else if (document.getElementById("userAnswer").value === questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "limegreen";
        questions[n].status = 2
        
        numAcertadas += 1      
        }
    }

    numAcertadasFalladas = numAcertadas + numFalladas

    if (n <= 26 && numAcertadasFalladas === 27){
        document.getElementById("showQuestion").value = nameUser + ", has acertado un total de " + numAcertadas + " letras y has fallado un total de " + numFalladas + " letras, pero ganas 1.000€ por participar. Felicidades!!"
        document.getElementById('repeatPasapalabra').style="display:none;"
        document.getElementById('Okrepeat').style="display:none;"
        document.getElementById('showresults').style="display:block;"
    }
    numTotal = numAcertadas + numFalladas + numPasapalabra

    if (n < 26 && numTotal === 27){
        document.getElementById("showQuestion").value =  nameUser + ", has finalizado la Ronda número " + rep + " del Pasapalabra!"
        document.getElementById('repeatPasapalabra').style="display:block;"
        document.getElementById('Okrepeat').style="display:none;"
        document.getElementById('showresults').style="display:none;"
        rep += 1

    }else if (n <= 26){
        n += 1
        document.getElementById("userAnswer").value = ""
        if(questions[n].status === 0){
            document.getElementById("showQuestion").value = questions[n].question;   
            
            }else if (questions[n].status !== 0){
                for (var j = n; j<questions.length; j++){
                    if(questions[j].status === 0){
                        n = j 
                        document.getElementById("showQuestion").value = questions[j].question;
                        break;
                    }    
                    }       
            }      

    }else if (n === 27 && numAcertadas === 27){

        document.getElementById("showQuestion").value = nameUser + ", no has fallado ninguna letra! Felicidades, has ganado el rosco y 3.000.000€!"
        document.getElementById('repeatPasapalabra').style="display:none;"
        document.getElementById('Okrepeat').style="display:none;"//pq es mostri
        document.getElementById('showresults').style="display:block;"

    }else if(n ===27 && rep<3){
        document.getElementById("userAnswer").value = "";
        document.getElementById('Okrepeat').style="display:none;"
        document.getElementById('repeatPasapalabra').style="display:block;"
        n=0
        rep += 1
        document.getElementById("showQuestion").value = nameUser + ", has finalizado la Ronda número " + rep + " del Pasapalabra!"
        
    }else if(n ===27 && rep === 3){
        document.getElementById('Okrepeat').style="display:none;"
        document.getElementById("userAnswer").value = "";
        document.getElementById("showQuestion").value = nameUser + ", has acertado un total de " + numAcertadas + " letras y has fallado un total de " + numFalladas + " letras, pero ganas 1.000€ por participar. Felicidades!!"
        document.getElementById('showresults').style="display:block;"
        document.getElementById('okrepeat').style="display:none;"
    }
}

function showresults(){
    document.getElementById('letters').style="display:none;"
    document.getElementById('showQuestion').style="display:none;"
    document.getElementById('userAnswer').style="display:none;"
    document.getElementById('showresults').style="display:none;"
    document.getElementById('results').style="display:block;"


    var participantes = [

        {nombre: "Marta" , puntuacion: 26},
        {nombre: "Jofre" ,puntuacion: 15},
        {nombre: "Gal.la" , puntuacion: 10},
        {nombre: "Jaume" , puntuacion: 2},    
    ]
    
    participantes.nombre = nameUser
    participantes.puntuacion = numAcertadas

    participantes.push({nombre: nameUser, puntuacion: numAcertadas})
    
participantes.sort(function (a, b) {
        if (a.puntuacion > b.puntuacion) {
          return -1;
        }
        if (a.puntuacion < b.puntuacion) {
          return 1;
        }
        return 0;
      });
ranking = []
for(var i=0; i<participantes.length ; i++){
    ranking.push(participantes[i].nombre + " con "+ participantes[i].puntuacion + " aciertos")
}

document.getElementById("ranking").value ="El usario ganador del pasapalabra es " + ranking[0]
}

if (document.getElementById("nameUser").value !== ""){
    nameUser.push(document.getElementById("nameUser").value)
    console.log(nameUser)
    document.getElementById("welcome").value += "Bienvenido " + nameUser + " !!"