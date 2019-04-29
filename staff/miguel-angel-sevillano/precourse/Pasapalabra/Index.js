
//Tu juego debería hacer una pregunta por cada letra del alfabeto, al final del juego, 
//y habiendo respondido todas las letras, deberá indicarle al usuario cuantas letras ha fallado y cuantas ha acertado. Si el usuario responde con "pasapalabra" 
//el juego deberá estar preparado para entender que en ese momento, el usuario no responderá esa pregunta, y no estará acertada ni fallada, la dejará para la siguiente ronda. 
//El juego deberá, cuando finalize, mostrar un ranking de usuarios con el nombre y ordenados por cantidad de letras acertadas.


var players=[]//lista de jugadores como objecto = name: , points:
var finalShow=[]//donde se guardaran los datos de la funcion para mostraslos por pantalla



wordGame()

function wordGame(){
    
var palabra =[{id:'A',question:'Famoso barrio electronico de Tokio',anwser:'akihabara',done:false},
{id:'B',question:'Provincia de catalunya',anwser: 'barcelona',done:false},
{id:'C',question:'Se usa en la pesca',anwser: 'cebo',done:false},
{id:'D',question:'Mamifero marino con aspecto amigable',anwser: 'delfin',done:false},
{id:'E',question:'Arma comun usada en la epoca medieval',anwser: 'espada',done:false},
{id:'F',question:'Pais del sudeste asiatico',anwser: 'filipinas',done:false},
{id:'G',question:'Felino de cuatro patas',anwser: 'gepardo',done:false},
{id:'H',question:'Lugar donde pasar la noche',anwser: 'hotel',done:false},
{id:'I',question:'Causa fiebre',anwser: 'Infeccion',done:false},
{id:'J',question:'Mamifero comun en Africa',anwser: 'jirafa',done:false},
{id:'K',question:'Ataque suicida de los pilotos japoneses',anwser: 'kamikaze',done:false},
{id:'L',question:'Satelite de la tierra',anwser: 'luna',done:false},
{id:'M',question:'Planeta cercano al sol del sitema solar',anwser: 'Mercurio',done:false},
{id:'N',question:'Que hace daño o es perjudicial.',anwser: 'nocivo',done:false},
{id:'Ñ',question:'Se usa pra hacer fuego',anwser: 'leña',done:false},
{id:'O',question:'Mamifero nativo de Malasia e Indonesia',anwser: 'oranguntan',done:false},
{id:'P',question:'Monumento del antiguo Egypto',anwser: 'piramide',done:false},
{id:'Q',question:'Se elabora a partir de leche quajada',anwser: 'queso',done:false},
{id:'R',question:'Lectura de composiciones poeticas',anwser: 'recital',done:false},
{id:'S',question:'Tambien conocida como Russia Asiatica',anwser: 'siberia',done:false},
{id:'T',question:'Herramienta electrica usada en tareas de bricolaje',anwser: 'taladro',done:false},
{id:'U',question:'Criatura mitologica con forma de caballo blanco',anwser: 'unicornio',done:false},
{id:'V',question:'Contiene lava',anwser: 'Volcan',done:false},
{id:'W',question:'Reproductor de audio portatil',anwser: 'zalkman',done:false},
{id:'X',question:'Instrumento musical de percusion',anwser: 'zilofono',done:false},
{id:'Y',question:'Web dedicada a compartir videos',anwser: 'zoutube',done:false},
{id:'Z',question:'Ciencia que estudia los animales',anwser: 'zoologia',done:false}]


var failed = 0;
var correct = 0;
var controlCheck= 27;//contador de la cantidad de letras , cuando este a 0 el juego a terminado
var playerName='';
var roundCount= 0;


alert('Bienvenidos a Pasapalabra')
playerName = prompt('Cual es tu nombre ?')
alert ('Saludos '+playerName)
alert('Estas son las reglas del juego: '+'\n'+'Si dejas sin contestar la pregunta se considerara como fallo'+'\n'+'Si contestas Pasapalabra se guardara la pregunta pra el suiguiente rondo')
alert('Que empiece el juego ')
wordCheck();  

function showInfo(){//funcion para visualizar el ranking de jugadores ordenado por la puntuacion mas alta 
    players.push({name:playerName,points:correct})
    players.sort(function (a, b){
        return (b.points - a.points)
    })
    players.forEach(function(item){
      finalShow.push(item.name,'=',item.points,' puntos')
    })
    
    finalShow = finalShow.join(' ')
}


function wordCheck(){
  
   var next = false;
  

  if(controlCheck !== 0){
    palabra.forEach(function(item){

        if(item.done === false){
            var pA=prompt('Con la  '+item.id+'\n'+item.question)
            pA =pA.toLowerCase()
        }
        if(pA=== item.anwser){
            item.done = true;
            controlCheck--;
            correct++;
            alert('Correcto!!')
        }

    if(pA === 'Pasapalabra'){
        alert('Pasamos palabra para el siguiente rondo')
        }
    else if(item.done !== true){
        item.done=true;
        controlCheck--
        failed++
        alert('Lo siento la respuesta correcta era '+item.anwser)
        }


})
  
}
if(controlCheck === 0){
   
    showInfo()
    alert('El juego ha finalizado '+'\n'+'Este es tu resultado: '+'Aciertos: '+correct+' Fallos: '+failed+'\n'+'Este es el ranking de jugadores'+'\n'+finalShow)
    next = confirm('Quieres volver a jugar? ')
    if(next === true){
        finalShow=[]
        wordGame()
    }
    else{
        alert('Hasta pronto '+playerName)
    }
}
if(controlCheck !== 0){
    
    roundCount++
    next = confirm('Hemos acabado la '+roundCount+'ª vuelta al rondo'+'\n'+'Quieres continuar?')
    if(next === true){
        wordCheck()

    }
    else{
    alert('Hasta pronto '+playerName)
    }
}
}

}