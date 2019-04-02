/*PASAPALABRA -- Dídac Torres Ferrer

Para iniciar el juego hay que llamar a la funcion runGame();

Contiene 3 preguntas aleatorias por letra y es fácilmente ampliable.

Comandos que admite:
 
-END: finaliza el juego.
-pasapalabra: Salta la pregunta para el final.
-pasalacabra: Igual que pasapalabra, pero con un toque "friki".
-La respuesta no es sensible a mayúsculas o minúsculas, pero sí a las tildes.

**Una respuesta vacía es considerada incorrecta!!

MUCHA SUERTE Y A POR EL BOTE!!
*/



//bateria 1 de preguntas (FACILITADA POR: www.github.com/misan7)
var questions0 = [
    { letter: "a", answer: "abducir", question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churumbel", question: "CON LA C. Niño, crío, bebé"},
    { letter: "d", answer: "diarrea", question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
    { letter: "e", answer: "ectoplasma", question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
    { letter: "f", answer: "facil", question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    { letter: "g", answer: "galaxia", question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
    { letter: "h", answer: "harakiri", question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
    { letter: "i", answer: "iglesia", question: "CON LA I. Templo cristiano"},
    { letter: "j", answer: "jabali", question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
    { letter: "k", answer: "kamikaze", question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},
    { letter: "l", answer: "licantropo", question: "CON LA L. Hombre lobo"},
    { letter: "m", answer: "misantropo", question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
    { letter: "n", answer: "necedad", question: "CON LA N. Demostración de poca inteligencia"},
    { letter: "ñ", answer: "señal", question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
    { letter: "o", answer: "orco", question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
    { letter: "p", answer: "protoss", question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
    { letter: "q", answer: "queso", question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},
    { letter: "r", answer: "raton", question: "CON LA R. Roedor"},
    { letter: "s", answer: "stackoverflow", question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},
    { letter: "t", answer: "terminator", question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
    { letter: "u", answer: "unamuno", question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
    { letter: "v", answer: "vikingos", question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
    { letter: "w", answer: "sandwich", question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
    { letter: "x", answer: "botox", question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"},
    { letter: "y", answer: "peyote", question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
    { letter: "z", answer: "zen", question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
];

//Bateria 2 de preguntas

var questions1 = [
    { letter: "a", answer: "arma", question: "CON LA A. Instrumento o máquina que sirve para atacar o defenderse."},
    { letter: "b", answer: "bañar", question: "CON LA B. Entrar en el agua para lavarse, para nadar o jugar."},
    { letter: "c", answer: "cazadora", question: "CON LA C. Ropa de abrigo que cubre desde los hombros a la cintura."},
    { letter: "d", answer: "débil", question: "CON LA D. Que tiene poca fuerza, poco vigor o poca resistencia."},
    { letter: "e", answer: "edificio", question: "CON LA E. Lugar que se usa para viviendas, oficinas, colegios, etc."},
    { letter: "f", answer: "futuro", question: "CON LA F. Tiempo que viene después."},
    { letter: "g", answer: "grua", question: "CON LA G. Máquina para levantar objetos pesados y moverlos de un lugar a otro."},
    { letter: "h", answer: "hundir", question: "CON LA H. Ir abajo dentro del agua."},
    { letter: "i", answer: "isla", question: "CON LA I. Territorio que está rodeado de agua por todas partes."},
    { letter: "j", answer: "jugador", question: "CON LA J. Persona que juega."},
    { letter: "k", answer: "kilogramo", question: "CON LA K. Medida para pesar (equivale a mil gramos)."},
    { letter: "l", answer: "lata", question: "CON LA L. Envase de metal."},
    { letter: "m", answer: "manzana", question: "CON LA M. Fruta de piel fina, amarilla, verde o roja, de carne blanca y dura."},
    { letter: "n", answer: "nunca", question: "CON LA N. Ningún día o en ningún tiempo."},
    { letter: "ñ", answer: "ñu", question: "CON LA Ñ. Nombre común de un género taxonómico de antílopes africanos."},
    { letter: "o", answer: "oveja", question: "CON LA O. Animal doméstico que tiene el cuerpo cubierto de lana."},
    { letter: "p", answer: "pasear", question: "CON LA P. Andar por placer o para hacer ejercicio"},
    { letter: "q", answer: "quemar", question: "CON LA Q. Encender, combustionar..."},
    { letter: "r", answer: "resumen", question: "CON LA R. Pocas palabras que cuentan una historia más larga"},
    { letter: "s", answer: "sandalia", question: "CON LA S. Calzado que no tapa todo el pie."},
    { letter: "t", answer: "techo", question: "CON LA T. Parte de una habitación que está arriba."},
    { letter: "u", answer: "urgente", question: "CON LA U. Que no puede esperar."},
    { letter: "v", answer: "veloz", question: "CON LA V. Que es muy rápido."},
    { letter: "w", answer: "kiwi", question: "CONTIENE LA W. Pájaro australiano con nombre de fruta."},
    { letter: "x", answer: "xilófono", question: "CON LA X. Instrumento musical de percusión compuesto por láminas (generalmente de madera) de diferentes tamaños, en orden similar al piano que emite diferentes sonidos al golpearlo con dos baquetas."},
    { letter: "y", answer: "yegua", question: "CON LA Y. Hembra del caballo."},
    { letter: "z", answer: "zarpar", question: "CON LA Z. Empezar a navegar."},
    ];

//bateria 3 de preguntas

var questions2 = [
    { letter: "a", answer: "alpinismo", question: "CON LA A. Deporte que consiste en la ascensión a las altas montañas."},
    { letter: "b", answer: "boda", question: "CON LA B. Ceremonia mediante la cual se unen en matrimonio dos personas y fiesta con la que se celebra."},
    { letter: "c", answer: "crecida", question: "CON LA C. Aumento del caudal de los ríos y arroyos."},
    { letter: "d", answer: "dublín", question: "CON LA D. Ciudad capital de Irlanda."},
    { letter: "e", answer: "espinilla", question: "CON LA E. Grano con un puntito negro que se forma en la piel de la cara."},
    { letter: "f", answer: "frontera", question: "CON LA F. Línea que separa un estado de otro."},
    { letter: "g", answer: "género", question: "CON LA G. cualquier cosa que tomada en conjunto es objeto de comercio."},
    { letter: "h", answer: "hoguera", question: "CON LA H. Fuego hecho al aire libre con materias combustibles que levantan mucha llama."},
    { letter: "i", answer: "incubadora", question: "CON LA I. Recinto en que se tienen a los niños prematuros hasta que alcanzan la madurez suficiente para poder vivir fuera de él."},
    { letter: "j", answer: "jaruzelski", question: "CON LA J. Apellido del político considerado el último líder de la época socialista en Polonia, nombrado Jefe del Gobierna en 1981."},
    { letter: "k", answer: "kayac", question: "CON LA K. Embarcación unipersonal, larga y delgada con características hidrodinámicas que le permiten ser un medio de navegación por aguas."},
    { letter: "l", answer: "laurel", question: "CON LA L. Árbol siempre verde cuyas ramas, formando una corona, se otroga como símbolo de gloria y fama."},
    { letter: "m", answer: "mapamundi", question: "CON LA M. Representación total de la Tierra en dos círculos o elipses correspondientes a dos hemisferios."},
    { letter: "n", answer: "nasa", question: "CON LA N. Organismo areoespacial estadounidense constituido en el año 1958 como sucesor de la NACA."},
    { letter: "ñ", answer: "compañia", question: "CONTIENE LA Ñ. Agrupación de actores, cantantes o bailarines unidos para representar espectáculos escénicos."},
    { letter: "o", answer: "omega", question: "CON LA O. Vigesimocuarta letra del alfabeto griego que corresponde a la 'O' larga del latino."},
    { letter: "p", answer: "pantufla", question: "CON LA P. Zapatilla sin talón."},
    { letter: "q", answer: "laqueario", question: "CONTIENE LA Q. Gladiador armado de lazo y puñal."},
    { letter: "r", answer: "rampa", question: "CON LA R. Plano inclinado dispuesto para subir y bajar por él."},
    { letter: "s", answer: "serrano", question: "CON LA S. Se dice del jamón que está curado."},
    { letter: "t", answer: "tomate", question: "CON LA T. Coloquialmente roto o agujero hecho en una prenda de punto como una media o calcetín."},
    { letter: "u", answer: "urografía", question: "CON LA U. Radiografía de las vías urinarias."},
    { letter: "v", answer: "valladolid", question: "CON LA V. Ciudad más poblada de Castilla y León."},
    { letter: "w", answer: "web", question: "CON LA W. Palabra en inglés que literalmente significa; red, telaraña o malla, comúnmente utilizada para referirse a una red informática y como generalización del internet."},
    { letter: "x", answer: "clínex", question: "CONTIENE LA X. Marca registrada que ha pasado a ser la denominación común del pañuelo de papel."},
    { letter: "y", answer: "anteayer", question: "CONTIENE LA Y. En el día que precede inmediatamente al de ayer."},
    { letter: "z", answer: "zárate", question: "CON LA Z. Apellido del escritor colombiano que ganó el Premio Planeta en 1972 con la obra 'La cárcel'."},
    ];

//Array con todas las preguntas [3 por letra]

var allQ = new Array(2);

allQ[0]=questions0;
allQ[1]=questions1;
allQ[2]=questions2;

//Array para guardar preguntas que se han omitido.
var pasAr=[];

var score=0;
var fail=0;
var pasas=0;
var bote= true;

//función del juego

function runGame() {

    alert("Bienvenido al Skylabpalabra. A continuación te muestro unas pautas básicas.");
    alert("Comandos que admite:\n\t-END: finaliza el juego.\n\t-pasapalabra: Salta la pregunta para el final.\n\t-La respuesta no es sensible a mayúsculas o minúsculas, pero sí a las tildes.\n**Una respuesta vacía es considerada incorrecta!!\n\nMUCHA SUERTE Y A POR EL BOTE!!");

    for(var i=0;i<questions0.length;i++){


        pos = Math.floor(Math.random()*3);

        answ = prompt(allQ[pos][i].question + "\nAciertos:\t"+score+ "\nFallos:\t"+fail);

        if(answ=="END"){

            bote=false;
            jackpot();
            break;

        }
        else {
            checkAnsw(answ,pos,i);
        }
        
    }
    pasQuestions();
    jackpot();
}

function pasQuestions(){

    while(fail+score<questions0.length){

        for(var i=0;i<pasAr.length;i++){

            answ = prompt(pasAr[i].question + "\nAciertos:\t"+score+ "\nFallos:\t"+fail);
            
            if(answ=="END"){

            bote=false;
            jackpot();
            break;

            }
            else {
            checkAnsw2(answ,i);
            }
        }
    }
}


//función que valida las respuestas

function checkAnsw(answ,pos0,pos1){

    switch(answ.toLowerCase()){

        case "pasapalabra":

            pasAr[pasas]=allQ[pos0][pos1];
            pasas++;
            break;
    
        case "pasalacabra":

            alert("JEJE!! Tú también has visto Homozapping eh!! Responde luego la pregunta.")
            pasAr[pasas]=allQ[pos0][pos1];
            pasas++;
            break;

        case allQ[pos0][pos1].answer:
                bote ? alert("CORRECTO, SIGUE A POR EL BOTE!"): alert("CORRECTO! VAMOS A POR MÁS");
                score++;
                break;
        
        default:
                alert("NOOOOOO! Que pena! La respuesta correcta es:\n"+allQ[pos0][pos1].answer);
                fail++;
                bote=false;
        }
}

//función que valida las palabras pasadas.

function checkAnsw2(answ,pos0){

    switch(answ.toLowerCase()){

        case "pasapalabra":

            pasAr[pasas]=pasAr[pos0];
            pasas++;
            break;

    
        case "pasalacabra":

            alert("JEJE!! Tú también has visto Homozapping eh!! Responde luego la pregunta.")
            pasAr[pasas]=pasAr[pos0];
            pasas++;
            break;
    
        case pasAr[pos0].answer:
            bote ? alert("CORRECTO, SIGUE A POR EL BOTE!"): alert("CORRECTO! VAMOS A POR MÁS");
            score++;
            break;
    
        default:
            alert("NOOOOOO! Que pena! La respuesta correcta es:\n"+pasAr[pos0].answer);
            fail++;
            bote=false;
    }
}

//función que informa de los resultados y si se ha ganado el bote o no.
function jackpot(){

    bote ? alert("ENHORABUENA CAMPEÓN! TE LLEVAS EL BOTE"):alert("LÁSTIMA! TUS RESULTADOS EN "+(score+fail)+" PREGUNTAS SON:\n"+score+" aciertos y "+fail+" fallos.");
}    

//descomentar la siguiente linia para jugar:
//runGame();






