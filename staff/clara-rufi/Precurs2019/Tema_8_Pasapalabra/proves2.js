

function Okrepeat (){

    if (questions[n].status === 0){
       if (document.getElementById("userAnswer").value === "pasapalabra"){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "DarkOrange";
        n+= 1
            
        }else if (document.getElementById("userAnswer").value !== questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "Crimson";
        questions[n].status = 1
        n+= 1
        
        }else if (document.getElementById("userAnswer").value === questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "limegreen";
        questions[n].status = 2
        n+= 1
        
        }
        
    }else if (questions[n].status !== 0){
        n+= 1
        
    }
    document.getElementById("userAnswer").value = "";
    document.getElementById("showQuestion").value = "";

    
    numTotal = numAcertadas + numFalladas
    numAcertadas = 0
    numFalladas = 0
    if (n <= 4 && numTotal === 5){
        document.getElementById("showQuestion").value = "Has acertado un total de " + numAcertadas + " letras y has fallado un total de " + numFalladas + " letras, pero ganas 1.000€ por participar!"
    
    }else if (n <= 4){
        if (questions[n].status === 0){
            document.getElementById("showQuestion").value = questions[n].question;
        }
    

    }else if (n> 5 && numAcertadas === 5){

        document.getElementById("showQuestion").value = "No has fallado ninguna letra! Felicidades, has ganado el rosco y 3.000.000€!"
    
    }else if(n>=5 && rep<3){
        document.getElementById("userAnswer").value = "";
        document.getElementById('repeatPasapalabra').style="display:block;"
        n=0
        rep += 1
        document.getElementById("showQuestion").value = "Has finalizado la Ronda número " + rep + " del Pasapalabra!"
        
    }else if(n>=5 && rep>=3){
        for (var i=0; i<questions.length;i++){
            if(questions[i].status === 1){
            numFalladas += 1
            }else if (questions[i].status === 2){
            numAcertadas += 1      
            }
        }
        document.getElementById("userAnswer").value = "";
        document.getElementById('repeatPasapalabra').style="display:block;"
    document.getElementById("showQuestion").value = "Has acertado un total de " + numAcertadas + " letras y has fallado un total de " + numFalladas + " letras, pero ganas 1.000€ por participar!"
    }
}




function Okrepeat (){
    
    if (questions[n].status === 0){
    document.getElementById("showQuestion").value = questions[n].question;

        if (document.getElementById("userAnswer").value === "pasapalabra"){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "DarkOrange";
        n+= 1
            
        }else if (document.getElementById("userAnswer").value !== questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "Crimson";
        questions[n].status = 1
        n+= 1
        
        }else if (document.getElementById("userAnswer").value === questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "limegreen";
        questions[n].status = 2
        n+= 1
        
        }
        
    }else if (questions[n].status !== 0){
        n+= 1
        
    }
    document.getElementById("userAnswer").value = "";
    document.getElementById("showQuestion").value = "";

    if (n <= 4){
        if (questions[n].status === 0){
            document.getElementById("showQuestion").value = questions[n].question;
        }
    }else if(n>=5 && rep<3){
        document.getElementById("userAnswer").value = "";
        document.getElementById('repeatPasapalabra').style="display:block;"
        n=0
        rep += 1
        document.getElementById("showQuestion").value = "Has finaalizado la Ronda número " + rep + " del Pasapalabra!"
    }else if(n>=5 && rep>=3){
    document.getElementById("userAnswer").value = "";
    document.getElementById('repeatPasapalabra').style="display:block;"
    document.getElementById("showQuestion").value = "Has acertado un total de " + numAcertadas + " letras y has fallado un total de " + numFalladas + " letras, pero ganas 1.000€ por participar!"

numAcertadas = 0
numFalladas = 0
for (var i=0; i<questions.length;i++){
if(questions[i].status === 1){
numFalladas += 1
}else if (questions[i].status === 2){
numAcertadas += 1
}
}
}
}

    { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
    { letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
    { letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"},
    { letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
    { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},


function repeatPasapalabra(){
    document.getElementById('Okrepeat').style="display:block;"//pq no es mostri
    
    if(questions[n].status !== 0){
    n+=1
    document.getElementById("userAnswer").value = "";
    document.getElementById("showQuestion").value = "";
    }else if(questions[n].status === 0 && n <= 4){
    document.getElementById("showQuestion").value = questions[n].question;
    }else if(questions[n].status === 0 && n>=5){
    n=0
}  
} 

function Okrepeat (){
    
        if (document.getElementById("userAnswer").value === "pasapalabra"){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "DarkOrange";
        n+= 1

        }else if (document.getElementById("userAnswer").value !== questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "Crimson";
        questions[n].status = 1
        n+= 1

        }else if (document.getElementById("userAnswer").value === questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "limegreen";
        questions[n].status = 2
        n+= 1
        }else if (questions[n].status !== 0){
            n+= 1
        }
        document.getElementById("userAnswer").value = "";
        document.getElementById("showQuestion").value = "";

}


function repeatPasapalabra(){
    document.getElementById('Okrepeat').style="display:block;"//pq no es mostri
    
    if(questions[p].status !== 0){
    p+=1
    }else if(questions[p].status === 0){
    document.getElementById("showQuestion").value = questions[p].question
    p +=1

}
}   


function accept(){
    
    
    if(questions[n].status !== 0 || n>=4){
        
    document.getElementById("showQuestion").value = "";
    document.getElementById("userAnswer").value = "";
    document.getElementById('repeatPasapalabra').style="display:block;"
    document.getElementById("showQuestion").value = "Ronda nº " + n + "del pasapalabra. Quedan " + 3 - n + " rondas";
    n=0
    }else if (questions[n].status !== 0 && repRound > 0){  //a la 2a ronda tb fa les preguntes fallades
    n+= 1

    }else if (questions[n].status === 0){
        document.getElementById("showQuestion").value = questions[n].question;

        if (document.getElementById("userAnswer").value === "pasapalabra"){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "DarkOrange";
        document.getElementById("userAnswer").value = "";
        n+= 1

        }else if (document.getElementById("userAnswer").value !== questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "Crimson";
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
        questions[n].status = 1
        n+= 1

        }else if (document.getElementById("userAnswer").value === questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "limegreen";
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
        questions[n].status = 2
        n+= 1
        }
}

}


rep = 0
function accept(){
    
    
    if (questions[n].status === 0){
        document.getElementById("showQuestion").value = questions[n].question;
        if (document.getElementById("userAnswer").value === "pasapalabra"){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "DarkOrange";
        document.getElementById("userAnswer").value = "";
        n+= 1

        }else if (document.getElementById("userAnswer").value !== questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "Crimson";
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
        questions[n].status = 1
        n+= 1

        }else if (document.getElementById("userAnswer").value === questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "limegreen";
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
        questions[n].status = 2
        n+= 1
        }
    }else if (questions[n].status !== 0 || n <= 4){  //a la 2a ronda tb fa les preguntes fallades
        document.getElementById("showQuestion").value = questions[n].question;
        n+= 1

    }else if(questions[n].status !== 0 || n>=5){
        
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
        document.getElementById('repeatPasapalabra').style="display:block;"
        document.getElementById("showQuestion").value = "Ronda nº " + n + "del pasapalabra. Quedan " + 3 - n + " rondas";
        n=0
 
    }

}



    if (n <= 4){
        document.getElementById("showQuestion").value = questions[n].question;
        
    }else if(n>=5){
        
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
        document.getElementById('repeatPasapalabra').style="display:block;"
        
        n=0
    }

}



var questions = [
    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"},
    { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
    { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},

]


nameUser = []

function login(){
    
    if (document.getElementById("nameUser").value !== "")
        nameUser.push(document.getElementById("nameUser").value)
        console.log(nameUser)
        document.getElementById("welcome").value += "Bienvenido " + nameUser + " !!"
}

n = 0
function start(){

    document.getElementById('loginUser').style="display:none;" //pq no es mostri
    document.getElementById('Okrepeat').style="display:none;"//pq no es mostri
    document.getElementById('repeatPasapalabra').style="display:none;"//pq no es mostri
    document.getElementById('acceptar').style="display:block;"
    document.getElementById("showQuestion").value = questions[n].question;
}

rep = 0
function accept(){
    
    
    if (questions[n].status === 0){
        document.getElementById("showQuestion").value = questions[n].question;
        if (document.getElementById("userAnswer").value === "pasapalabra"){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "DarkOrange";
        document.getElementById("userAnswer").value = "";
        n+= 1

        }else if (document.getElementById("userAnswer").value !== questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "Crimson";
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
        questions[n].status = 1
        n+= 1

        }else if (document.getElementById("userAnswer").value === questions[n].answer){
        document.getElementById("letters").getElementsByClassName("letter")[n].style.backgroundColor = "limegreen";
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
        questions[n].status = 2
        n+= 1
        }
    }else if (questions[n].status !== 0){
        n+= 1
        }

    if (n <= 4){
        document.getElementById("showQuestion").value = questions[n].question;
        
    }else if(n>=5){
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
        n=0


        
        if (questions[n].status === 0){
            accept();
        }
    }
}

function repeatPasapalabra(){
    alert(n)
        if (questions[0].status === 0){
            document.getElementById("showQuestion").value = questions[0].question;
            accept();
        }else if (questions[n].status === 0){
            document.getElementById("showQuestion").value = questions[n].question;
            accept();
}
}
