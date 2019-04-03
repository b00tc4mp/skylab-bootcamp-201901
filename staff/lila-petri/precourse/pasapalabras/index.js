//Pasapalabra Game!
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
var gamers=[];
function pasapalabra(){
    resetStatus();
    var username = prompt('Could you tell us your name,please?');
    gamers.push({name:username, wordsAnswered:0, wordsFailed:0});
try{
do{
   
    questions.forEach(function(element){
       if(element.status===0) {
        ans=prompt(element.question);
        ans=ans.toLowerCase();
        if(ans===element.answer){
            alert('Correct'); 
            setStatus(element.letter, 1)

        }else if (ans==='pasapalabra'){
        }else if(ans==null){
            throw 'Game Over'
        }else if(ans==='end'){
            throw 'Game Over'
        }
        else{
        alert('Incorrect')
        setStatus(element.letter, 2) 
        }
    }
    });

}while(!complete());

saveInfoGamer(username);
showInfoCurrentGamer(username);
ranking();
pasapalabra();

}catch (e){
    saveInfoGamer(username);
    showInfoCurrentGamer(username);
    alert('Game Over')
}
return
    
}

function setStatus(let, state){

    questions.forEach(function(element){
        if(element.letter===let){
         element.status=state;
        }
    });
    return

}

function complete(){  
    return questions.every(element => (element.status===1||element.status===2))
}

function saveInfoGamer(username){
    let countWordsAnswered=0;
    let countWordsFailed=0;
    questions.forEach(function(el){
        if(el.status===1){
            countWordsAnswered++;
        }else if(el.status===2){
            countWordsFailed++;
        }

    });
    gamers.forEach(function(e){
        if(e.name==username){
            e.wordsFailed=countWordsFailed;
            e.wordsAnswered=countWordsAnswered;
        }
    });
    return
}

function  showInfoCurrentGamer(username){
    
    gamers.forEach(function(elem){
        if(elem.name==username){
            alert(`${username} you have failed ${elem.wordsFailed} questions and you have answered ${elem.wordsAnswered} questions`);
        }
    });
    return

}

function resetStatus(){
    questions.forEach(function(m){
        m.status=0;
    });
    return
}

function ranking(){
    var ranking='';
    gamers.sort((a, b) => (a.wordsAnswered < b.wordsAnswered) ? 1 : -1);
    for(let i=0;i< gamers.length;i++){
       ranking+= (i+1) +'º - '+ gamers[i].name + ' with '+gamers[i].wordsAnswered+' words answered \n'
    }
   alert (ranking);
    return
}
pasapalabra();