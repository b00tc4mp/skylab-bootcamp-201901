

//----------------------------Variables----------------------------//

       var multiQuestions = [
        { letter: "a", answer1: "abducir", answer2: 'amanecer', answer3:'anarquismo', status: 0, question1: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien", question2: 'CON LA A. Aparecer en el horizonte la luz del Sol, dando comienzo a un nuevo día.', question3: 'CON LA A. Doctrina política que pretende la desaparición del Estado'},
        { letter: "b", answer1: "bingo", answer2:'barcelona', answer3:'barco', status: 0, question1: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso", question2:'CON LA B. Ciudad catalana donde se imparten las aulas de skylab.', question3: 'CON LA B. Construcción cóncava usada para navegar.'},
        { letter: "c", answer1: "churumbel", answer2:'chollo', answer3:'caotico', status: 0, question1: "CON LA C. Niño, crío, bebé", question2:'CON LA C. Cosa apreciable que se adquiere a poca costa.', question3:'CON LA C. Desordenado, confuso.'},
        { letter: "d", answer1: "diarrea", answer2:'dentadura', answer3:'desembolsar', status: 0, question1: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida", question2: 'CON LA D. Conjunto de dientes, muelas y colmillos que tiene en la boca una persona o un animal', question3:'CON LA D. Pagar o entregar una cantidad de dinero.'},
        { letter: "e", answer1: "ectoplasma", answer2: 'estrenar', answer3:'ejecutivo', status: 0, question1: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación", question2: 'CON LA E. Hacer uso por primera vez de algo', question3:'CON LA E. Persona que desempeña un cargo directivo en una empresa. Gobierno de un país.'},
        { letter: "f", answer1: "facil", answer2:'fisioterapia', answer3:'fragancia', status: 0, question1: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad", question2: 'CON LA F. Tratamiento de las enfermedades o lesiones por medio de elementos mecánicos, como el masaje o la gimnasia.', question3:'CON LA F. Olor agradable y suave.'},
        { letter: "g", answer1: "galaxia", answer2:'golfo', answer3:'geranio', status: 0, question1: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas", question2:'CON LA G. Gran porción de mar que se interna en la tierra entre dos cabos', question3:'CON LA G. Planta herbácea de la familia de las geraniáceas, con hojas grandes y flores de vivos colores en forma de parasol.'},
        { letter: "h", answer1: "harakiri", answer2:'hidratar', answer3:'hereje', status: 0, question1: "CON LA H. Suicidio ritual japonés por desentrañamiento", question2:'CON LA H. Restablecer el grado de humedad normal de la piel u otros tejidos', question3:'CON LA H. Persona que sostiene dogmas u opiniones diferentes a la ortodoxia de su religión.'},
        { letter: "i", answer1: "iglesia", answer2:'irlanda', answer3:'iglu', status: 0, question1: "CON LA I. Templo cristiano", question2:'CON LA I. País europeo con capital en Dublín', question3:'CON LA I. Vivienda esquimal con forma semiesférica construida con bloques de hielo.'},
        { letter: "j", answer1: "jabali", answer2:'jamiroquai', answer3:'jota', status: 0, question1: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba", question2:'CON LA J. Grupo musical de funk que en 1996 publicó el álbum Travelling without Moving', question3:'CON LA J. Baile popular propio de Aragón y de otras muchas regiones españolas.'},
        { letter: "k", answer1: "kamikaze", answer2:'koala', answer3:'kilometro', status: 0, question1: "CON LA K. Persona que se juega la vida realizando una acción temeraria", question2:'CON LA K. Animal australiano.', question3:'CON LA K. Medida de longitud que tiene 1.000 metros.'},
        { letter: "l", answer1: "licantropo", answer2:'levante', answer3:'laton', status: 0, question1: "CON LA L. Hombre lobo", question2:'CON LA L. Viento procedente del este', question3:'CON LA L. Aleación de cobre y cinc, de color semejante al del oro, maleable y muy resistente a la corrosión.'},
        { letter: "m", answer1: "misantropo", answer2:'masticar', answer3:'manifestacion', status: 0, question1: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas", question2:'CON LA M. Aplastar o triturar algo en la boca con los dientes para extraer su jugo o sabor o para ser tragado.', question3:'CON LA M. Reunión pública de gente que desfila para dar su opinión o reivindicar algo.'},
        { letter: "n", answer1: "necedad", answer2:'noruego', answer3:'noble', status: 0, question1: "CON LA N. Demostración de poca inteligencia", question2:'CON LA N. Natural del país europeo con capital en Oslo', question3:'CON LA N. De ilustre linaje. Honrado, generoso, sincero, leal.'},
        { letter: "ñ", answer1: "señal", answer2:'leña', answer3:'ñu', status: 0, question1: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.", question2:'CONTIENE LA Ñ. Parte de los árboles y matas que, cortada y hecha trozos, se emplea como combustible', question3:'CON LA Ñ. Nombre común de diversos mamíferos artiodáctilos bóvidos de África,especie de antílopes de cabeza grande y cuernos curvos.'},
        { letter: "o", answer1: "orco", answer2:'obsoleto', answer3:'oprimir', status: 0, question1: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien", question2:'CON LA O. Anticuado, inadecuado a las circunstancias actuales', question3:'CON LA O. Someter a una persona o a una colectividad privándola de sus libertades o por medio de la fuerza y la violencia.'},
        { letter: "p", answer1: "protoss", answer2:'parvulo', answer3:'palidez', status: 0, question1: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft", question2:'CON LA P. Se dice de un niño de muy corta edad.', question3:'CON LA P. Pérdida de color de la piel humana y,p. ext.,de otros objetos,cuando su color natural o más característico es o parece desvaído.'},
        { letter: "q", answer1: "queso", answer2:'bosque', answer3:'quesada', status: 0, question1: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche", question2:'CONTIENE LA Q. Sitio poblado de árboles y matas.', question3:'CON LA Q. Postre típico de Cantabria'},
        { letter: "r", answer1: "raton", answer2:'ring', answer3:'rasgado', status: 0, question1: "CON LA R. Roedor", question2:'CON LA R. Espacio cercado en que combaten los boxeadores.', question3:'CON LA R. Más alargados o estirados de lo normal.'},
        { letter: "s", answer1: "stackoverflow",  answer2:'silencio', answer3:'sari', status: 0, question1: "CON LA S. Comunidad salvadora de todo desarrollador informático", question2:'CON LA S. Falta de ruido.', question3:'CON LA S. Vestido típico de las mujeres indias.'},
        { letter: "t", answer1: "terminator",  answer2:'talco', answer3:'toledo', status: 0, question1: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984", question2:'CON LA T. Silicato de magnesia que, en forma de polvo, se utiliza para la higiene y en la industria cosmética.', question3:'CON LA T. Ciudad española donde se forjaron las espadas de la saga del señor de los anillos'},
        { letter: "u", answer1: "unamuno",  answer2:'usurpar', answer3:'ultramar', status: 0, question1: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914", question2:'CON LA U. Apoderarse de una propiedad o de un derecho que legítimamente pertenece a otro, por lo general con violencia.', question3:'CON LA U. Conjunto de territorios del otro lado de un mar o de un océano.'},
        { letter: "v", answer1: "vikingos",  answer2:'vispera', answer3:'vasto', status: 0, question1: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa", question2:'CON LA V. Día que antecede inmediatamente a otro determinado, especialmente si es fiesta.', question3:'CON LA V. Amplio, extenso o muy grande.'},
        { letter: "w", answer1: "sandwich",  answer2:'wally', answer3:'waterpolo', status: 0, question1: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso", question2:'CON LA W. Personaje escondido que viste a rayas horizontales rojas y blancas.', question3:'CON LA W. Deporte de pelota entre dos equipos que se juega en una piscina.'},
        { letter: "x", answer1: "botox",  answer2:'flexibizar', answer3:'xenofogo', status: 0, question1: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética", question2:'CONTIENE LA X. Hacer flexible algo, darle flexibilidad.', question3:'CON LA X. Que siente odio u hostilidad hacia los extranjeros.'},
        { letter: "y", answer1: "peyote",  answer2:'yate', answer3:'y', status: 0, question1: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos", question2:'CON LA Y. Embarcación de recreo a motor o a vela, de manga o anchura mayor que un velero, con camarotes y generalmente lujosa', question3:'CON LA Y. Conjunción copulativa que une palabras y oraciones.'},
        { letter: "z", answer1: "zen",  answer2:'zangaste', answer3:'zorro', status: 0, question1: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional", question2:'CON LA Z. Segunda persona de singular del pretérito perfecto simple de indicativo del verbo zanjar', question3:'CON LA Z. Nombre común de diversas especies de mamíferos carnívoros de menos de 1 m de longitud incluida la cola, hocico alargado y pelaje color pardo rojizo y muy espeso, especialmente en la cola, de punta blanca. Persona astuta.'}
        ]


//------------------------------Functions---------------------------//


function generateRandom(){ //Genera random 1,2 o 3 para seleccionar als diferentes preguntas
        var random=0;
        while (random===0){
            random=Math.random()*3;
            random=Number(random.toFixed());
        }
        return random
    }

function getName(){
    return document.getElementById('name').value;

}


function generateGame(){ //Me genera una pregunta random por cada letra, i me vuelve un array de objetos con cada pregunta

    var questions=[];
    for (var i=0; i<multiQuestions.length; i++){
        var num= generateRandom()
            
        if (num===1){
            var question=multiQuestions[i].question1;
            var answer=multiQuestions[i].answer1;
        }

        if (num===2){
            var question=multiQuestions[i].question2;
            var answer=multiQuestions[i].answer2;
        }

        if (num===3){
            var question=multiQuestions[i].question3;
            var answer=multiQuestions[i].answer3;
        }

        var pregunta={
            letter: multiQuestions[i].letter,
            answer: answer,
            status: multiQuestions[i].status,
            question: question    
        }

        questions.push(pregunta)
    }

    return questions
}

function time(count){
    intervalo = setInterval(function(){
       count--; 
       
       if(count == 0){
         clearInterval(intervalo);
         endGame();
       }

       document.getElementById('tiempoNumero').innerHTML = count;
      
      }, 1000);
}


function generateQuestion(){
    
    var element=questions.find(function(element) {
         return element.status===0
    });

    document.getElementById('pregunta').innerHTML=element.question;
}


function getAnswer(){ 
    
    var element=questions.find(function(element) {
         return element.status===0
    });

    var userAnswer=document.getElementById("respuesta").value.toLowerCase().trim()
    var answer=element.answer   

    if (userAnswer===answer){
        document.getElementById(element.letter.toUpperCase()).classList.add("acierto")
        element.status=1;
        count--
        acertados++
        document.getElementById('faltanNumero').innerHTML=count;
    }

    else{
        //mistake(element.letter.toUpperCase())
        document.getElementById(element.letter.toUpperCase()).classList.add("fallo")
        element.status=-1;
        count--
        document.getElementById('faltanNumero').innerHTML=count;
    }
}


function pasapalabra(){
    var element=questions.find(function(element) {
         return element.status===0
    });

    var pos=questions.indexOf(element)
    var w = questions.splice(pos, 1)[0];
    questions.push(w);
    return questions
}

function continuePlaying(){
    if (count!=0){
        document.getElementById("respuesta").value='';
        generateQuestion();

    
    } else{
        endGame()
    }
}


function endGame(){
    document.getElementById('ventana').style.display='none';
    document.getElementById('botones').style.display='none';

    document.getElementById('bienvenida').style.display='none';
    document.getElementById('botonesInicio').style.display='none';

    document.getElementById('final').style.display='block';
    document.getElementById('botonesFinal').style.display='block';

    clearInterval(intervalo);

    //Ranking
    if (count==0){
        var ganador = {
                name: name,
                points: acertados,
            }

            ranking.push(ganador);
            ranking.sort(function (a, b) {
                return (b.points - a.points)
            })
    var titulo='El juego se ha acabado!'
    }
    if (count=!0){
        var titulo='Has salido antes de terminar!'
    }

    if (ranking.length>0){
        var rankingString='';
    }
    if (ranking.length===0){
        var rankingString='Para entrar en el ranking tienes que terminar el juego\n'
    }
    for (var i=0; i<ranking.length; i++){
        rankingString+= ranking[i].name + ' con ' + ranking[i].points.toString() + ' puntos.<br>'
    }

        document.getElementById('titulo').innerHTML=titulo;
        document.getElementById('puntos').innerHTML=acertados;
        document.getElementById('ranking').innerHTML=rankingString;


}


function volverJugar(){
    document.getElementById('ventana').style.display='none';
    document.getElementById('botones').style.display='none';

    document.getElementById('bienvenida').style.display='block';
    document.getElementById('botonesInicio').style.display='flex';

    document.getElementById('final').style.display='none';
    document.getElementById('botonesFinal').style.display='none';

    document.getElementById('name').value='';
    document.getElementById('respuesta').value='';
    document.getElementById('tiempoNumero').innerHTML = 300;
    document.getElementById('faltanNumero').innerHTML = 27;
    count=27;
    acertados=0;
    intervalo=300;

    abecedario=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    for (var i=0; i<abecedario.length; i++){
        document.getElementById(abecedario[i]).classList.remove('acierto')
        document.getElementById(abecedario[i]).classList.remove('fallo')
    }

}


//-------------------Programa--------------------//

    //Muestra las pregutnas que faltan por responder
    var count=27;
    var acertados=0;
    var ranking=[]
    var intervalo=300
    document.getElementById('faltanNumero').innerHTML=count;
    document.getElementById('tiempoNumero').innerHTML=intervalo;
      
//ININCIO

    //Enviar nombre
    document.getElementById('enviarNombre').onclick= function() {

            name=getName();
            document.getElementById('ventana').style.display='block';
            document.getElementById('botones').style.display='block';

            document.getElementById('bienvenida').style.display='none';
            document.getElementById('botonesInicio').style.display='none';

            document.getElementById('final').style.display='none';
            document.getElementById('botonesFinal').style.display='none';
            
            questions=generateGame();
            generateQuestion()
            time(300)
 
    };

    //Enviar nombre con ENTER
    document.getElementById('name').addEventListener("keydown",(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == "13") {

            name=getName();
            document.getElementById('ventana').style.display='block';
            document.getElementById('botones').style.display='block';

            document.getElementById('bienvenida').style.display='none';
            document.getElementById('botonesInicio').style.display='none';

            document.getElementById('final').style.display='none';
            document.getElementById('botonesFinal').style.display='none';

            questions=generateGame();
            generateQuestion()
            time(300)
 
    }
    }));


//JUGANDO

    //Enviar respuesta
    document.getElementById('enviar').onclick= function() {

            getAnswer();
            continuePlaying();

    };

   
    //Enviar pasapalabra
    document.getElementById('pasapalabra').onclick= function() {
            pasapalabra();
            continuePlaying();
    };


     
     //Enviar pregunta con ENTER y pasapalabra con SPACE
    document.getElementById('respuesta').addEventListener("keydown",(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == "13") {
            getAnswer();
            continuePlaying();
    }

    if (keycode == "32") {
            pasapalabra();
            continuePlaying();
    }
    }));


//FINALIZAR
     document.getElementById('volverJugar').onclick= function() {
            volverJugar();
    };



//SALIR
 document.getElementById('salirCasino').onclick= function() {
            window.location.href = "index.html"

    };

document.getElementById('salir').onclick= function() {
            endGame();

    };


