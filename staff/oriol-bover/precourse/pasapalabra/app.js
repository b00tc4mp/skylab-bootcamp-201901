//ask user
function askUser(){
  //first enter user
  var name = prompt("Please enter your name");
  if (name != null) {
   user = new User(name);
   document.getElementById("subtitle").innerHTML = "Concursante: <strong>"+user.name+"</strong>"
  }
}

//init game
function Pasapalabra(){
    //properties
    this.turn = 1;
    this.position = 0;
    this.questions = [
        { letter: "a", answer: "abducir", status: 0,clue:'con', question: "Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
        { letter: "b", answer: "bingo", status: 0, clue:'con', question: "Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
        { letter: "c", answer: "churumbel", status: 0, clue:'con', question: "Niño, crío, bebé"},
        { letter: "d", answer: "diarrea", status: 0, clue:'con', question: "Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
        { letter: "e", answer: "ectoplasma", status: 0, clue:'con', question: "Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
        { letter: "f", answer: "facil", status: 0, clue:'con', question: "Que no requiere gran esfuerzo, capacidad o dificultad"},
        { letter: "g", answer: "galaxia", status: 0, clue:'con', question: "Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
        { letter: "h", answer: "harakiri", status: 0, clue:'con', question: "Suicidio ritual japonés por desentrañamiento"},
        { letter: "i", answer: "iglesia", status: 0, clue:'con', question: "Templo cristiano"},
        { letter: "j", answer: "jabali", status: 0, clue:'con', question: "Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
        { letter: "k", answer: "kamikaze", status: 0, clue:'con', question: "Persona que se juega la vida realizando una acción temeraria"},
        { letter: "l", answer: "licantropo", status: 0, clue:'con', question: "Hombre lobo"},
        { letter: "m", answer: "misantropo", status: 0, clue:'con', question: "Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
        { letter: "n", answer: "necedad", status: 0, clue:'con', question: "Demostración de poca inteligencia"},
        { letter: "ñ", answer: "señal", status: 0, clue:'contiene', question: "Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
        { letter: "o", answer: "orco", status: 0, clue:'con', question: "Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
        { letter: "p", answer: "protoss", status: 0, clue:'con', question: "Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
        { letter: "q", answer: "queso", status: 0, clue:'con', question: "Producto obtenido por la maduración de la cuajada de la leche"},
        { letter: "r", answer: "raton", status: 0, clue:'con', question: "Roedor"},
        { letter: "s", answer: "stackoverflow", status: 0, clue:'con', question: "Comunidad salvadora de todo desarrollador informático"},
        { letter: "t", answer: "terminator", status: 0, clue:'con', question: "Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
        { letter: "u", answer: "unamuno", status: 0, clue:'con', question: "Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
        { letter: "v", answer: "vikingos", status: 0, clue:'con', question: "Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
        { letter: "w", answer: "sandwich", status: 0, clue:'contiene', question: "Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
        { letter: "x", answer: "botox", status: 0, clue:'contiene', question: "Toxina bacteriana utilizada en cirujía estética"},
        { letter: "y", answer: "peyote", status: 0, clue:'contiene', question: "Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
        { letter: "z", answer: "zen", status: 0, clue:'con', question: "Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
    ];

    //methods
    this.initGrid = function(letter){
        document.getElementById('container').innerHTML = ''; 
        var grid = '<div class="columns">';
        var grid2 = '<div class="columns">';

        for (let i = 0; i < this.questions.length; i++) {
            var colorCard = '';
            var clue = this.questions[i].clue+' la '+ this.questions[i].letter;
            
            //grid of 4 columns
            if( i % 4 ==  0 && i != 0){
                grid2 += '</div><div class="columns">';
            }

            //color of state
            if(this.questions[i].status != 0){
                //colorCard = 'has-text-light';
                switch (this.questions[i].status) {
                    case 1:
                        //mistake
                        colorCard += ' has-background-danger';
                        break;
                    case 2:
                        //correct
                        colorCard += ' has-background-success';
                        break;
                    case 3:
                        //pasapalabra
                        colorCard += ' has-background-warning';
                        break;
                }
            }

            //change between answer and static option
            if(letter != this.questions[i].letter){
                grid2 += `
                    <div class="column">
                        <div class="card `+colorCard+`">
                            <div class="card-content has-text-centered">
                                <p class="title">
                                `+this.questions[i].letter.toUpperCase()+`
                                </p>
                            </div>
                        </div>
                    </div>                                   
                    `;
            }else{
                grid2 += `
                    <div class="column">
                        <div class="card">
                            <div class="card-content">
                                <p class="title">
                                `+clue.toUpperCase()+`
                                </p>
                                <p class="subtitle">
                                `+this.questions[i].question+` 
                                </p>
                            </div>
                            <footer class="card-footer">
                                <p class="card-footer-item">
                                    <input class="input" type="text" id="respuesta" placeholder="Respuesta">
                                </p>
                                <p class="card-footer-item">
                                    <span class="buttons">
                                        <a class="button is-info is-fullwidth" onclick="pasapalabra.userAction(1,`+i+`)">Respuesta</a>
                                        <a class="button is-warning is-fullwidth" onclick="pasapalabra.userAction(2,`+i+`)">Passapalabra</a>
                                    </span>
                                </p>
                            </footer>
                        </div>
                    </div>                                   
                    `;
            }
        }

        grid2 += '</div>';
        document.getElementById('container').innerHTML = grid2;         
    }

    this.startGame = function(){
        this.nextLetter();
        document.getElementById('buttons').innerHTML='';
        document.getElementById('buttons').innerHTML='<a class="button is-danger" id="endButton" onclick="pasapalabra.endGame()">End</a>';  
    }

    this.nextLetter = function(){

        if(this.position == 27){
            this.position = 0;
        }



        if(this.questions[this.position].status === 1 || this.questions[this.position].status === 2){
            this.position += 1;
            this.nextLetter();
        }else{
            this.initGrid(this.questions[this.position].letter);
            this.position += 1;
        }
    }

    this.endGame = function(){
        location.reload();
    }

    this.userAction = function(action, qPosition){
        if(action == 1){
            var respuesta = document.getElementById("respuesta").value
            var solucion = this.questions[qPosition].answer;
            if(respuesta.toUpperCase() == solucion.toUpperCase()){
                this.questions[qPosition].status = 2;
            }else{
                this.questions[qPosition].status = 1;
            }

        }else if(action == 2){   
            this.questions[qPosition].status = 3;
        }

        this.nextLetter();
    }
}

//init user
function User(name){
  this.name = name;
  this.points = 0;
}

//initgame
askUser();
var pasapalabra = new Pasapalabra;
pasapalabra.initGrid();