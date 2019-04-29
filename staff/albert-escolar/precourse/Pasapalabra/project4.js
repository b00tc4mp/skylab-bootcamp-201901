//pasapalabra

function playPasapalabra() {

    var preguntas = [
        { id: 'a', question: 'Con la A, país Africano.', answer: 'angola', correct: false, wrong: false, unanswered: true },
        { id: 'b', question: 'Con la B, ave carroñera.', answer: 'buitre', correct: false, wrong: false, unanswered: true },
        { id: 'c', question: 'Con la C, prenda de ropa para los pies.', answer: 'calcetin', correct: false, wrong: false, unanswered: true },
        { id: 'd', question: 'Con la D, apellido del creador de Mickey Mouse.', answer: 'disney', correct: false, wrong: false, unanswered: true },
        { id: 'e', question: 'Con la E, elemento con el que funcionan las bombillas.', answer: 'electricidad', correct: false, wrong: false, unanswered: true },
        { id: 'f', question: 'Con la F, dicho de algo que se rompe con facilidad.', answer: 'fragil', correct: false, wrong: false, unanswered: true },
        { id: 'g', question: 'Con la G, dicho de alguien travieso.', answer: 'gamberro', correct: false, wrong: false, unanswered: true },
        { id: 'h', question: 'Con la H, modelo actual del Sistema Solar.', answer: 'heliocentrico', correct: false, wrong: false, unanswered: true },
        { id: 'i', question: 'Con la I, insulto muy popular.', answer: 'imbecil', correct: false, wrong: false, unanswered: true },
        { id: 'j', question: 'Con la J, animal felino depredador propio de la selva del Amazonas.', answer: 'jaguar', correct: false, wrong: false, unanswered: true },
        { id: 'k', question: 'Con la K, marca de cereales popular.', answer: 'kellogs', correct: false, wrong: false, unanswered: true },
        { id: 'l', question: 'Con la L, musculo que ayuda a la deglución y se encuentra en la cavidad bucal.', answer: 'lengua', correct: false, wrong: false, unanswered: true },
        { id: 'm', question: 'Con la M, acción de quitar la vida a un ser vivo.', answer: 'matar', correct: false, wrong: false, unanswered: true },
        { id: 'n', question: 'Con la N, tipo de precipitación que ocurre cuando las temperatura son muy bajas.', answer: 'nieve', correct: false, wrong: false, unanswered: true },
        { id: 'o', question: 'Con la O, arte de crear figuras doblando papel.', answer: 'origami', correct: false, wrong: false, unanswered: true },
        { id: 'p', question: 'Con la P, animal referido como el mejor amigo del hombre.', answer: 'perro', correct: false, wrong: false, unanswered: true },
        { id: 'q', question: 'Con la Q, producto lactico dicho ser el alimento favorito de los ratones.', answer: 'queso', correct: false, wrong: false, unanswered: true },
        { id: 'r', question: 'Con la R, arma de fuego usada para la caza.', answer: 'rifle', correct: false, wrong: false, unanswered: true },
        { id: 's', question: 'Con la S, animal vertebrado que se mueve reptando por el suelo.', answer: 'serpiente', correct: false, wrong: false, unanswered: true },
        { id: 't', question: 'Con la T, lo era la Rana Gustavo.', answer: 'teleñeco', correct: false, wrong: false, unanswered: true },
        { id: 'u', question: 'Con la U, nombre del protagonista de la Ilíada.', answer: 'ulises', correct: false, wrong: false, unanswered: true },
        { id: 'v', question: 'Con la V, trozo de tela usado para detener hemorragias o tapar heridas.', answer: 'venda', correct: false, wrong: false, unanswered: true },
        { id: 'w', question: 'Con la W, apellido de los creadores de un famoso estudio de cine.', answer: 'warner', correct: false, wrong: false, unanswered: true },
        { id: 'x', question: 'Con la X, instrumento de percusión.', answer: 'xilofono', correct: false, wrong: false, unanswered: true },
        { id: 'y', question: 'Con la Y, parte amarilla del huevo.', answer: 'yema', correct: false, wrong: false, unanswered: true },
        { id: 'z', question: 'Con la Z, animal mamifero caracterizado por un pelaje rojo y una gran cola.', answer: 'zorro', correct: false, wrong: false, unanswered: true },
    ];
    
    var answeredCounter = 0;
    var correctAnswerCounter = 0;
    var wrongAnswerCounter = 0;
    
    newTurn();
    
    function newTurn() {
        
        for (i = 0; i < preguntas.length; i++) {
            if (preguntas[i].unanswered == true) {
                var playerAnswer = window.prompt(preguntas[i].question);
                if (playerAnswer.toLowerCase() == preguntas[i].answer) {
                    window.alert('Correcto!');
                    preguntas[i].correct = true;
                    preguntas[i].unanswered = false;
                    answeredCounter = answeredCounter + 1;
                    correctAnswerCounter = correctAnswerCounter + 1;
                    console.log(answeredCounter)
                }
                if (playerAnswer.toLowerCase() == 'pasapalabra') {
                    window.alert('Pasapalabra!');
                    console.log(answeredCounter)
                }
                if (playerAnswer.toLowerCase() !== preguntas[i].answer && playerAnswer.toLowerCase() !== 'pasapalabra') {
                    window.alert('Incorrecto!');
                    preguntas[i].wrong = true;
                    preguntas[i].unanswered = false;
                    answeredCounter = answeredCounter + 1;
                    wrongAnswerCounter = wrongAnswerCounter + 1;
                    console.log(answeredCounter)
                }

            }
        }
        if (answeredCounter < 26) {
            newTurn();
        } else {
            window.alert('Has respondido correctamente: ' + correctAnswerCounter + ' preguntas!\nHas fallado:' + wrongAnswerCounter+' preguntas!');
        }
    }
}
playPasapalabra();