
// separacion de los diferentes datos que usaremos al pulsar los botones o mostrar informacion por pantalla

//questions nos sirve para mostrar las preguntas al jugador 
var questions=['Famoso barrio electronico de Tokio','Provincia de catalunya','Se usa en la pesca','Mamifero marino con aspecto amigable','Arma comun usada en la epoca medieval',
    'Pais del sudeste asiatico','Felino de cuatro patas','Lugar donde pasar la noche','Causa fiebre','Mamifero comun en Africa','Ataque suicida de los pilotos japoneses','Satelite de la tierra',
    'Planeta cercano al sol del sitema solar','Que hace daño o es perjudicial.','Se usa pra hacer fuego','Mamifero nativo de Malasia e Indonesia','Monumento del antiguo Egypto','Se elabora a partir de leche quajada',
    'Lectura de composiciones poeticas','Tambien conocida como Russia Asiatica','Herramienta electrica usada en tareas de bricolaje','Criatura mitologica con forma de caballo blanco',
    'Contiene lava','Reproductor de audio portatil','Instrumento musical de percusion','Web dedicada a compartir videos','Ciencia que estudia los animales']

//awnsers nos sirve para comparar los datos introdcidos por el usuario 
var anwsers=['akihabara','barcelona','cebo','delfin','espada','filipinas','gepardo','hotel','Infeccion','jirafa','kamikaze','luna','Mercurio','nocivo','leña','oranguntan','piramide','queso','recital',
'siberia','taladro','unicornio','Volcan','walkman','xilofono','youtube','zoologia']

//letters nos sirve para emparejar con el ID de cada letra y asi marcar rojo verde o amarillo segun su estado
var letters=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"]


//variables globales para acceder desde las diferentes funciones
var questionsDone=[];
var anwsersDone=[];
var lettersDone=[];

var failed = 0;
var correct = 0;
var totalQuestions = 27;
var questionsNav = 0;
var playerName='';


// funcion para empezar el juego , resetea todos los valores generales 
function wordGame(){

    questions=['Famoso barrio electronico de Tokio','Provincia de catalunya','Se usa en la pesca','Mamifero marino con aspecto amigable','Arma comun usada en la epoca medieval',
    'Pais del sudeste asiatico','Felino de cuatro patas','Lugar donde pasar la noche','Causa fiebre','Mamifero comun en Africa','Ataque suicida de los pilotos japoneses','Satelite de la tierra',
    'Planeta cercano al sol del sitema solar','Que hace daño o es perjudicial.','Se usa pra hacer fuego','Mamifero nativo de Malasia e Indonesia','Monumento del antiguo Egypto','Se elabora a partir de leche quajada',
    'Lectura de composiciones poeticas','Tambien conocida como Russia Asiatica','Herramienta electrica usada en tareas de bricolaje','Criatura mitologica con forma de caballo blanco',
    'Contiene lava','Reproductor de audio portatil','Instrumento musical de percusion','Web dedicada a compartir videos','Ciencia que estudia los animales']
   
    anwsers=['akihabara','barcelona','cebo','delfin','espada','filipinas','gepardo','hotel','Infeccion','jirafa','kamikaze','luna','Mercurio','nocivo','leña','oranguntan','piramide','queso','recital',
    'siberia','taladro','unicornio','Volcan','walkman','xilofono','youtube','zoologia']
    
    letters=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

    for(let i=0;i<letters.length;i++){//asi se restarura el color de cada letra asi como su fundo azul
        document.getElementById(letters[i]).style.background="#014B94";
        document.getElementById(letters[i]).style.color="white";
    }

    document.getElementById("showPregunta").innerHTML="";
    document.getElementById("Respuesta").innerHTML="";
    document.getElementById("nombreJugador").innerHTML="";
    document.getElementById("aciertos").innerHTML="";
    document.getElementById("fallos").innerHTML="";
    document.getElementById("showValue").innerHTML="";
    failed=0;
    correct=0;
    questionsNav=0;
    totalQuestions=27;//nos sirve para saber cuando no quedan preguntas y se ha acabado el juego;
    

    playerName = prompt('Cual es tu nombre ?')
    document.getElementById("nombreJugador").innerHTML=playerName
    alert("Empezamos!")
    questionShow();
}

//questionsShow nos muestra la informacion para el jugador
function questionShow(){
    if(questionsNav === questions.length){ // esto evitara  que no coincida el index con el length de la cantidad de preguntas que quedan por responder que pasa cuando se usa la funcion pasapablara
        questionsNav=0;                     // debido a que index es 0 y lenght empieza en 1
    }

    

    if(totalQuestions>0){
        document.getElementById("showPregunta").innerHTML=questions[questionsNav];//utilizamos el idex para mostrar el contenido dentro del array , el idex es cogido de la variable questionNav
        document.getElementById(letters[questionsNav]).style.background="#FEDA02"
        document.getElementById(letters[questionsNav]).style.color="black"
        


    }
    else{
        document.getElementById("showValue").innerHTML="Fin del juego!";
        
    }

}

//wordcheck compruba el texto introducido por el usuario con la array que contiene las repuestas
function wordCheck(){
    var anwser="";
    
    
    anwser= document.getElementById("Respuesta").value;
    anwser =anwser.toLowerCase()//asi evitamos que de fallo si el jugador introcude la respuesta con mayuscualas etc


    

        if(anwser === anwsers[questionsNav]){
            questionsDone= questions.splice(questionsNav,1)//con esto se elimina del array los datos ya que se ha acertado la respuea y no debe aparecer mas igual que si se falla
            anwsersDone = anwsers.splice(questionsNav,1)
            correct++
            totalQuestions--
            document.getElementById("showValue").innerHTML="CORRECTO !";
            document.getElementById("aciertos").innerHTML=correct;
            document.getElementById("fallos").innerHTML=failed;
            document.getElementById("Respuesta").value="";
            document.getElementById(letters[questionsNav]).style.background="green"
            document.getElementById(letters[questionsNav]).style.color="white"
            lettersDone=letters.splice(questionsNav,1) //eliminamos tambien las letras que ya no se usaran ,asi no se pasara por ellas
            questionShow();
            

        }
        else{
            questionsDone= questions.splice(questionsNav,1)
            anwsersDone = anwsers.splice(questionsNav,1)
            failed++
            totalQuestions--
            document.getElementById("showValue").innerHTML="INCORRECTO !";
            document.getElementById("aciertos").innerHTML=correct;
            document.getElementById("fallos").innerHTML=failed;
            document.getElementById("Respuesta").value="";
            document.getElementById(letters[questionsNav]).style.background="red"
            document.getElementById(letters[questionsNav]).style.color="white"
            lettersDone=letters.splice(questionsNav,1)
            questionShow(); 
            

        }

    
}
  
function nextWord(){
    
    if(questionsNav === questions.length){//evita el descontrol de index al sobrepasar el lengnth de las preguntas que queden ya que index empìeza con 0 y length desde 1; 
        document.getElementById(letters[questionsNav]).style.color="white"
        document.getElementById(letters[questionsNav]).style.background="#014B94"
        questionsNav=0;
        questionShow();
    }
    else{
        document.getElementById(letters[questionsNav]).style.color="white"
        document.getElementById(letters[questionsNav]).style.background="#014B94"
        questionsNav++//para pasar a la siguiente pregunta
        questionShow();
    }
    
}

function endGame(){
    letters=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    
    for(let i=0;i<letters.length;i++){
        
        document.getElementById(letters[i]).style.background="#014B94";
        document.getElementById(letters[i]).style.color="white";
    }

    document.getElementById("showPregunta").innerHTML="";
    document.getElementById("Respuesta").innerHTML="";
    document.getElementById("nombreJugador").innerHTML="";
    document.getElementById("aciertos").innerHTML="";
    document.getElementById("fallos").innerHTML="";
    document.getElementById("showValue").innerHTML="Fin del juego!";
}
