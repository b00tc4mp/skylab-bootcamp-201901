var questions = [
    { letter: "a", answer: "anuncio", status: 0, question: ("CON LA A. Mensaje por medio del cual se anuncia cierta cosa o se informa sobre ella.") },
    { letter: "b", answer: "bateria", status: 0, question: ("CON LA B. Instrumento musical compuesto por tambores de diferentes tamaños, que lleva el ritmo en un grupo de la banda") },
    { letter: "c", answer: "conejo", status: 0, question: ("CON LA C. Mamífero de cuerpo alargado y arqueado con orejas largas, cola corta y patas traseras más desarrolladas.") },
    { letter: "d", answer: "dado", status: 0, question: ("CON LA D. Cuadrilatero generalmente de 6 caras que se emplea en multiples juegos de mesa") },
    { letter: "e", answer: "enciclopedia", status: 0, question: ("CON LA E. Obra en que se expone el conjunto de los conocimientos de una ciencia o arte, generalmente dispuestos alfabéticamente.") },
    { letter: "f", answer: "flotador", status: 0, question: ("CON LA F. Utensilio de un material insumergible que sirve para mantener a flote a una persona o alguna cosa.") },
    { letter: "g", answer: "gato", status: 0, question: ("CON LA G. Mamífero felino de cuatro patas generalmente pequeño que tiene gran agilidad, largos bigotes y uñas retráctiles.") },
    { letter: "h", answer: "hola", status: 0, question: ("CON LA H. Expresión con la que se saluda.") },
    { letter: "i", answer: "incendio", status: 0, question: ("CON LA I. Fuego de grandes proporciones que destruye cosas que no están destinadas a quemarse.") },
    { letter: "j", answer: "jinete", status: 0, question: ("CON LA J. Hombre que monta a caballo.") },
    { letter: "k", answer: "Bikini", status: 0, question: ("CON LA K. Prenda femenina de baño compuesta de un sujetador y una braguita ceñida.") },
    { letter: "l", answer: "lata", status: 0, question: ("CON LA L. Recipiente hecho de un material metálico para conservar sólidos o líquidos.") },
    { letter: "m", answer: "morder", status: 0, question: ("CON LA M. Acción de clavar los dientes.") },
    { letter: "n", answer: "nativo", status: 0, question: ("CON LA N. Del lugar donde se nace o relacionado con él.") },
    { letter: "ñ", answer: "castaña", status: 0, question: ("CONTIENE LA Ñ. Fruto de otoño del tamaño de una nuez, recubierto por una cáscara dura y flexible de color marrón.") },
    { letter: "o", answer: "ola", status: 0, question: ("CON LA O. Onda de gran amplitud que se forma en la superficie del agua a causa del viento o de las corrientes.") },
    { letter: "p", answer: "puerta", status: 0, question: ("CON LA P. Abertura en una pared o valla que permite acceder al interior de un lugar. Generalmente de metal o madera.") },
    { letter: "q", answer: "quinto", status: 0, question: ("CON LA Q. envase de cristal pequeño de cerveza comunmente conocido con este nombre.") },
    { letter: "r", answer: "rotulador", status: 0, question: ("CON LA R. Instrumento para escribir o dibujar semejante al bolígrafo, de punta absorbente y tinta en su interior.") },
    { letter: "s", answer: "sofa", status: 0, question: ("CON LA S. Asiento para más de una persona, con brazos y respaldo, cómodo y generalmente mullido.") },
    { letter: "t", answer: "tren", status: 0, question: ("CON LA T. Vehículo constituido por varios vagones arrastrados por una locomotora y que circula sobre raíles.") },
    { letter: "u", answer: "urticaria", status: 0, question: ("CON LA U. Síndrome de la piel que se caracteriza por la presencia de áreas de inflamación rosáceas, acompañadas de un intenso picor.") },
    { letter: "v", answer: "varita", status: 0, question: ("CON LA V. Palito que usan los magos, hadas etc., para llevar a cabo acciones mágicas.") },
    { letter: "w", answer: "whisky", status: 0, question: ("CONTIENE LA W. Bebida alcohólica de alta graduación de prcedencia escocesa, que se obtiene por destilación de cebada y otros cereales.") },
    { letter: "x", answer: "xilofono", status: 0, question: ("CON LA X. Instrumento musical formado por láminas de madera dispuestas horizontalmente que, al ser golpeadas, emiten diferentes notas musicales.") },
    { letter: "y", answer: "yate", status: 0, question: ("CON LA Y. Embarcación de recreo a motor mayor que un velero y generalmente lujosa.") },
    { letter: "z", answer: "zaragoza", status: 0, question: ("CON LA Z. Municipio de España y capital de la comunidad autónoma de Aragón.") },
];

var count = 0;
var aciertos = 0;
var errores = 0;
var pasapalabras = [];

function welcome() {
    return prompt('Hello, what is your name?')
}

function pasapalabra() {
    var name = welcome()
    if (name === '') {
        return pasapalabra()
    }
    console.log('Welcome ' + name)
    showQuestions()
}

function showQuestions() {
    console.log(questions[count].question)
    return youAnswer()

}

function youAnswer() {
    var answer = prompt('What is the answer?')
    if (answer !== questions[count].answer && answer !== 'pasapalabra') {
        errores++
    }
    if (answer === questions[count].answer) {
        aciertos++
    }
    if (answer === 'pasapalabra') {
        pasapalabras.push(count)
    }
    count++
    if (count >= questions.length) {
        if (pasapalabras.length > 0) {
            return showPasapalabras()
        }
        return console.log('has fallado: ' + errores + ' y has acertado: ' + aciertos)
    }
    showQuestions()
}

function showPasapalabras() {
    pasapalabras.forEach(function (pasada) {
        console.log(questions[pasada].question)
        var answer = prompt('What is the answer?')
        if (answer !== questions[pasada].answer) {
            errores++
        }
        if (answer === questions[pasada].answer) {
            aciertos++
        }
    })

    return console.log('has fallado: ' + errores + ' y has acertado: ' + aciertos)
}

pasapalabra()