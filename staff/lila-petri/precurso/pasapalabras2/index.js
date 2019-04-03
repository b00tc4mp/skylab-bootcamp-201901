
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
    { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"}
]
var resp;
var players=[];
var flag;
var flagCount;
var count;
var toAnswer;
var username=0;
var seconds;
getAnswer();

function startGame(){
    
    
    disableButton(true, "start");
    disableButton(false, "response");
    disableButton(false, "continue");
    disableButton(false, "stop");
    disableAnswer(false);
    flag=true;
    flagCount=false;
    count=0;
    toAnswer=27;
    seconds=91;
    resetStatus();
    username++
    players.push({name:username, wordsAnswered:0, wordsFailed:0, wordsWithoutAnswer:0});
    document.getElementById('answer').value="";
    document.getElementById('answer').focus();
    document.getElementById('display').value="";
    showQuestion();

    var countdown = setInterval(function() {
        seconds--;
        document.getElementById("timer").value = seconds;
        if (seconds <= 0 || flagCount) {
            clearInterval(countdown);
            stop();
        };
    }, 1000);
   
}

function showQuestion(){
    
    document.getElementById('toAnswer').value=toAnswer;
    
    if(flag){
        
       document.getElementById('display').value =questions[count].question;
    //   setTimeout(showQuestion, 100);
   }
}

function getAnswer(){
    
    flag=false; 

        document.getElementById("response").addEventListener("click",  function(){
            
        resp=document.getElementById('answer').value;
        resp=resp.toLowerCase();
        document.getElementById('answer').value="";
        document.getElementById('answer').focus();
        
        if(resp===questions[count].answer){
            setStatus(questions[count].letter, 1);
            continueWithIt();
        }else if(resp==="pasapalabra"){
            continueWithIt();
        }else{
            
            setStatus(questions[count].letter, 2);
            continueWithIt();
        }
      
        return 
      
    }, true);

    document.getElementById("answer").addEventListener("keypress",  function(e){
       
        var key = e.which || e.keyCode;

	    if (key === 13) {
            resp=document.getElementById('answer').value; 
            resp=resp.toLowerCase();
            document.getElementById('answer').value="";
            document.getElementById('answer').focus();
            
            if(resp===questions[count].answer){
                setStatus(questions[count].letter, 1);
                continueWithIt();
            }else if(resp==="pasapalabra"){
                continueWithIt();
            }else{
                 
                setStatus(questions[count].letter, 2);
                continueWithIt();
            }
        }
        
        return 
      
    }, true);
    
  return
}

function continueWithIt(){
    flag = true;
    
    if(complete()){
        stop();
        flag = false;
    }else {
       
        count=newCount();
    }

    document.getElementById('answer').value=""
    document.getElementById('answer').focus();
 
    return showQuestion();
    
}


function complete(){  
                      
    return  questions.every(function(e){
          return e.status === 2 || e.status===1
        })
  }

function stop(){
    flag = false;
    flagCount=true;
    saveInfoGamer(username);
    showInfoCurrentGamer(username);
    ranking();
    disableButton(true, "continue");
    disableButton(true, "response");
    disableButton(true, "stop");
    disableAnswer(true);
    disableButton(false, "start");
    return 
}

function setStatus(lett, state){
 
    questions.forEach(function(element){
        if(element.letter===lett){
         element.status=state;
        }
    });
    toAnswer--
    var comp = document.getElementById(lett);
    if(state===1){
        comp.style.background = '#42f489';
       
    }else{
        comp.style.background = '#f44441';
      
    }

    return
}

function saveInfoGamer(username){
    let countWordsAnswered=0;
    let countWordsFailed=0;
    let countWordsWithoutAnswer=0;
    
    questions.forEach(function(el){
        if(el.status===1){
            countWordsAnswered++;
        }else if(el.status===2){
            countWordsFailed++;
        }else{
            countWordsWithoutAnswer++
        }

    });
    players.forEach(function(e){
       
        if(e.name==username){
            e.wordsFailed=countWordsFailed;
            e.wordsAnswered=countWordsAnswered;
            e.wordsWithoutAnswer=countWordsWithoutAnswer;
        }
    });
    return
}

function newCount(){
    
    if(count===26){
        count=0;
     
    }

    
    for(let i = count+1; i < questions.length+1; i++){
         
           if(questions[i].status===0){
             
            return i
          }     
    }
}

function resetStatus(){
    
    questions.forEach(function(m){
       m.status=0;
       let lett=m.letter;
       document.getElementById(lett).style.background = '#084B8A';
    });
    document.getElementById('answer').value="";
    document.getElementById('answer').focus();
    return
}

function  showInfoCurrentGamer(username){
    
    players.forEach(function(elem){
        if(elem.name==username){
            document.getElementById('display').value =`Player # ${username} --> failed: ${elem.wordsFailed}, --> correct: ${elem.wordsAnswered}, --> not answered: ${elem.wordsWithoutAnswer}`
           
        }
    });
    return

}

function ranking(){
    var ranking='';
    players.sort((a, b) => (a.wordsAnswered < b.wordsAnswered) ? 1 : -1);
    for(let i=0;i< players.length;i++){
       ranking+= (i+1) +'º Player number '+ players[i].name + ' with '+players[i].wordsAnswered+' words answered \n'
    }
  
    document.getElementById('displayRanking').value =ranking;
    return
}

function pause(){
    flag=false;
}

function disableAnswer(value){
    document.getElementById("answer").disabled = value;
    
}

function disableButton(value, type){

    switch (type) {
        case "start":
        document.getElementById("start").disabled = value;
        if(value===true){
            document.getElementById("start").style.background = '#886A08';
        }else{
            document.getElementById("start").style.background = '#FF8000';
        }
          break;
        case "continue":
        document.getElementById("continue").disabled = value;
        if(value===true){
            document.getElementById("continue").style.background = '#886A08';
        }else{
            document.getElementById("continue").style.background = '#FF8000';
        }
          break;
        case "response":
        document.getElementById("response").disabled = value;
        if(value===true){
            document.getElementById("response").style.background = '#886A08';
        }else{
            document.getElementById("response").style.background = '#FF8000';
        }
          break;

        case "stop":
        document.getElementById("stop").disabled = value;
        if(value===true){
            document.getElementById("stop").style.background = '#886A08';
         }else{
            document.getElementById("stop").style.background = '#FF8000';
         }
         break;
      }


}





