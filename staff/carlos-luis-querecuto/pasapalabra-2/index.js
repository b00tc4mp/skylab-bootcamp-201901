function init(){
    function challenge(question){
        var message="Ahora "+playername+", "+question.question;
        return message;
    }
    function play(answ,letter,i){ 
        for(var y=0;y<questions[index].length;y++){
            questions[index][y].status=1;
        }
        if(letter.answer.toUpperCase()===answ.toUpperCase()){
            score++;
            letters[i].letra.style["-webkit-animation-name"] = "correct";
            letters[i].letra.style["-webkit-animation-duration"] = "4s";
            letters[i].letra.style["-webkit-animation-fill-mode"] = "forwards";
            letters[i].letra.style["animation-name"] = "correct";
            letters[i].letra.style["animation-duration"] = "4s";
            letters[i].letra.style["animation-fill-mode"] = "forwards";
            //letters[i].letra.style["color"] = "green";

            (score===1)?board.textContent="Correcto +1!, Tienes "+score+" punto en el marcador!" : board.textContent="Correcto +1!, Tienes "+score+" puntos en el marcador!"
        }else{
            letters[i].letra.style["-webkit-animation-name"] = "wrong";
            letters[i].letra.style["-webkit-animation-duration"] = "2s";
            letters[i].letra.style["-webkit-animation-fill-mode"] = "forwards";
            letters[i].letra.style["animation-name"] = "wrong";
            letters[i].letra.style["animation-duration"] = "2s";
            letters[i].letra.style["animation-fill-mode"] = "forwards";
            //letters[i].letra.style["color"] = "red";
            board.textContent="Incorrecto!, Vamos no te rindas!";
        }
        userinput.innerHTML = '<input class="button" id="continue" type="button" value="CONTINUAR">';
        document.getElementById('continue').onclick = function(){
            index++
            verify()     
        }

    }
    
    function rankingorder(){ // to order rank an returns scores to screen
        function compare(a,b){ //condition for sort funtion ***
            var comparison=0;
            const scorea=a.points;
            const scoreb=b.points;
            if(scoreb > scorea){
                comparison=1;
            }else{
                comparison=-1;
            }
            return comparison;
        }
        var scoretext="Puntuaciones: \r\n";
        if(globalscores.length>0){
            globalscores.sort(compare); //sort function ***
            for(var i=0; i<globalscores.length;i++){
                scoretext+=(i+1).toString()+"- "+globalscores[i].player+" Acertó "+globalscores[i].points.toString()+" palabras del juego \r\n";
            }
            return scoretext;
        }else{
            return "Sin puntaciones \r\n Juega y registra tu puntaje!";
        }
        
    }
    
    function name(){
        board.textContent="Por favor introduce tu nombre: ";
        userinput.innerHTML = '<input id="player" type="text"><br><input  class="button" id="playersubmit" type="button" value="EMPEZAR">';
        document.getElementById('playersubmit').onclick = function(){
        playername=document.getElementById('player').value;
        answertext();       
        }

    }

    function answerquest(){
        userinput.innerHTML = '<input id="res" type="text"><br><input  class="button" id="ressub" type="button" value="VERIFICAR">';
        document.getElementById('ressub').onclick = function(){
            answ=document.getElementById('res').value;      
            verifyansw();
        }
    }

    function verifyansw(){
        if(answ==="END"){
            return false;
        }else{
            if(!(answ.toUpperCase()==="PASAPALABRA")){
                play(answ,questions[index][randomquest],index);
            }else{
                board.textContent="PASAPALABRA! ---->"
                userinput.innerHTML = '<input  class="button" id="continue" type="button" value="CONTINUAR">';
                document.getElementById('continue').onclick = function(){
                    index++;
                    verify();
                }
            }
        }         
    }
    
    function answertext(){ 
        for(var i=index;i<questions.length;i++){
            if(questions[i][0].status===0){
                index=i;
                randomquest=Math.floor(Math.random() * questions[index].length);
                board.textContent=challenge(questions[index][randomquest],index);
                answerquest();
                break;
            }

        }
    }
    
    function verify(){
        var end = true;
        for(var i=0;i<questions.length;i++){
            if(questions[i][0].status===0){
                end=false;
            }   
        }
        if(end){
            board.textContent="HAS CULMINADO EL PASAPALABRA";
            globalscores.push({ points: score, player: playername });
            userinput.innerHTML = '<input  class="button" id="continue" type="button" value="Al INICIO">';
            document.getElementById('continue').onclick = function(){
                pasapalabra();  
            }
        }else{
            if(index>=questions.length){
                index=0;
            }
            answertext();
        }
    }

    function establecer(){
        for(var i=0; i<questions.length; i++){
            for(var y=0;y<questions[i].length;y++){
                questions[i][y].status=0;
            }
            letters[i].letra.style["-webkit-animation-name"] = "appear";
            letters[i].letra.style["-webkit-animation-duration"] = "2s";
            letters[i].letra.style["-webkit-animation-fill-mode"] = "forwards";
            letters[i].letra.style["animation-name"] = "appear";
            letters[i].letra.style["animation-duration"] = "2s";
            letters[i].letra.style["animation-fill-mode"] = "forwards";
        }
    }

    function pasapalabra(){
        establecer();
        index=0;
        score=0;
        playername="";
        scoreheight+=30;
        board.textContent="Bienvenidos al Pasapalabra, Podras superarlo?";
        userinput.innerHTML = '<button  class="button" id="jugar">JUGAR</button><br/><textarea rows="4" cols="50" id="scoretable" disabled>';
s
        document.getElementById("scoretable").value = rankingorder();
        document.getElementById("jugar").onclick = () => name();
       /* if(finished === false){
            board.textContent="Tu puntuacion es "+score+" del pasalabra sin terminar!"
        }else{
           board.textContent=rankingorder()
        }
    */
    }

    var questions = [ //Multiples preguntas por letra, se pueden añadir al grupo y el programa escoge una al azar
        [
            { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
            { letter: "a", answer: "atraer", status: 0, question: "CON LA A. Hacer que algo o alguien se mueva/interese en algun sujeto u objeto"}
        ],
        [
            { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"}
        ],
        [
            { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"}
        ],
        [
            { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"}
        ],
        [
            { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"}
        ],
        [{ letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"}],
        [{ letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"}],
        [{ letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"}],
        [{ letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"}],
        [{ letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"}],
        [{ letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"}],
        [{ letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo"}],
        [{ letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"}],
        [{ letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia"}],
        [{ letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."}],
        [{ letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"}],
        [{ letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"}],
        [{ letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"}],
        [{ letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor"}],
        [{ letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático"}],
        [{ letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"}],
        [{ letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"}],
        [{ letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"}],
        [{ letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"}],
        [{ letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"}],
        [{ letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"}],
        [{ letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"}],
    ];
    
    var letters = [
        {letra:document.getElementById('a')},
        {letra:document.getElementById('b')},
        {letra:document.getElementById('c')},
        {letra:document.getElementById('d')},
        {letra:document.getElementById('e')},
        {letra:document.getElementById('f')},
        {letra:document.getElementById('g')},
        {letra:document.getElementById('h')},
        {letra:document.getElementById('i')},
        {letra:document.getElementById('j')},
        {letra:document.getElementById('k')},
        {letra:document.getElementById('l')},
        {letra:document.getElementById('m')},
        {letra:document.getElementById('n')},
        {letra:document.getElementById('ñ')},
        {letra:document.getElementById('o')},
        {letra:document.getElementById('p')},
        {letra:document.getElementById('q')},
        {letra:document.getElementById('r')},
        {letra:document.getElementById('s')},
        {letra:document.getElementById('t')},
        {letra:document.getElementById('u')},
        {letra:document.getElementById('v')},
        {letra:document.getElementById('w')},
        {letra:document.getElementById('x')},
        {letra:document.getElementById('y')},
        {letra:document.getElementById('z')},
    ];
    var userinput = document.getElementById('userinput');
    var board = document.getElementById('board script');
    var globalscores = [];
    var score;
    var playername = "";
    var answ = " ";
    var index=0;
    var randomquest=0;
    pasapalabra();
    
}
