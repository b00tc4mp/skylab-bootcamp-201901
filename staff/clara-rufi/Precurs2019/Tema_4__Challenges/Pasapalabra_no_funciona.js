var questions = [
    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"},
    { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
    { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
    { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
]


nameUser = ""
function user(){
    var user = prompt("Hola! Cómo te llamas?")
    nameUser += user
    if (nameUser == null || nameUser == "") {
        alert("Entre un nombre válido");
    }else {
        alert( "Bienvenido " + nameUser+ " !!. Vamos a empezar a jugar!!");
    }
}
user();

var letrasAcertadas = []
var letrasFalladas = []
var letrasPasapalabra = [] 


function pasapalabra(){



    
for (var i=0; i<questions.length; i++){
    resposta = prompt(questions[i].question)
    if (resposta.toLowerCase() === "pasapalabra"){
        letrasPasapalabra.push(questions[i].letter)
    }else if (resposta.toLowerCase() !== questions[i].answer ){
        letrasFalladas.push(questions[i].letter)
    }else if (resposta.toLowerCase() === questions[i].answer){
        letrasAcertadas.push(questions[i].letter)
        }
}
}   
pasapalabra()
    
console.log ("Letras acertadas => " + letrasAcertadas);
console.log ("Letras falladas => " + letrasFalladas);
console.log ("Letras pasapalabra => " + letrasPasapalabra)
console.log(letrasPasapalabra.length);
numAcertadas = letrasAcertadas.length
numFalladas = letrasFalladas.length
numPalabra = letrasPasapalabra.length

    
numberRepeatPasapalabra = 0;
    
    
function repeatPasapalabra(){
    
numberRepeatPasapalabra +=1
console.log(numberRepeatPasapalabra);
     
for (var j=0; j<letrasPasapalabra.length; j++){  
    for (var k=0; k<questions.length; k++){
        if (letrasPasapalabra[j] === questions[k].letter){
            repeatRosco = prompt(questions[k].question)
            
            /* si la pregunta repetida te resposta incorrecte o dif de pasapapalabra, eliminar de l'array de letrasPasapalabra 
            pq no es torni a repetir i posar-la a letrasFalladas pel comput final*/
            if (repeatRosco.toLowerCase() !== questions[k].answer || repeatRosco.toLowerCase() !== "pasapalabra" ){
                letrasFalladas.push(questions[k].letter)
                console.log(" letrasFalladas => " + letrasFalladas);
                var remov = letrasPasapalabra.indexOf(questions[k].letter)
                console.log( "remov " + remov)
                if (remov > -1){
                letrasPasapalabra.splice(remov,1)
                }
                console.log("letrasPasapalabra => " + letrasPasapalabra)
            /* si la pregunta repetida te resposta correcte, eliminar de l'array de letrasPasapalabra 
            pq no es torni a repetir i posar-la a letrasAcertadas pel comput final*/	
            }else if (repeatRosco.toLowerCase() === questions[k].answer)
                letrasAcertadas.push(questions[k].letter)
                
                 var acertadaRosco = letrasPasapalabra.indexOf(questions[k].letter)
                console.log( "acertadaRosco " + acertadaRosco)
                if (acertadaRosco > -1){
                letrasPasapalabra.splice(acertadaRosco,1)
                }
                console.log("removeletter === answer" + letrasPasapalabra)
                /* el q em fa es q cada lletra la treu de letrasPasalabra independentment del resultat*/
            }    
    }
}
if (numberRepeatPasapalabra < 4){
    console.log("numberRepeatPasapalabra => " + numberRepeatPasapalabra)
repeatPasapalabra()
    
console.log("Letras pasapalabra repeatRosco " + numberRepeatPasapalabra + " => " + letrasPasapalabra)             
console.log ("Letras falladas repeatRosco  " + numberRepeatPasapalabra + " => " + letrasFalladas);
console.log ("Letras acertadas repeatRosco  " + numberRepeatPasapalabra + " => " + letrasAcertadas);                   

}
}
repeatPasapalabra()
    
function puntuacion(){
    
var participantes = [
    {nombre: "Marta" , puntuacion: 26},
    {nombre: "Jofre" ,puntuacion: 15},
    {nombre: "Gal.la" , puntuacion: 10},
    {nombre: "Jaume" , puntuacion: 2}
    ]
    
participantes.nombre = nameUser
participantes.puntuacion = numAcertadas
if (numFalladas >= 1 ){
    alert("Has acertado un total de " + numAcertadas + " letras y has fallado un total de " + numFalladas + " letras, pero ganas 1.000€ por participar!") 
}else{
    alert("No has fallado ninguna letra! Felicidades, has ganado el rosco y 3.000.000€!")
}
alert("Ranking de jugadores: ")

participantes.push({nombre: nameUser, puntuacion: numAcertadas})
        
participantes.sort(function (a, b) {
    if (a.puntuacion > b.puntuacion) {
        return -1;
    }
    if (a.puntuacion < b.puntuacion) {
        return 1;
    }
    return 0;
    });
ranking = []
    for(var i=0; i<participantes.length ; i++){
        ranking.push(participantes[i].nombre + " => " + participantes[i].puntuacion + " aciertos" + "\n")
    }
alert(ranking)
alert("El usario ganador del pasapalabra es: " + ranking[0])
}
puntuacion();