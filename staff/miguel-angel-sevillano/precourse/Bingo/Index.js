//Realiza un programa que simule un Bingo. Cuando se ejecute, pedirá el nombre del jugador y deberá guardarse. Durante el primer turno se mostrará un cartón con 15 números (excluyendo el 0 siempre), para pasar al siguiente turno el usuario deberá confirmar mediante confirm() visualizándose otro número, si coincide con alguno de los existentes en el cartón, cambiará por una "X" o un 0. El cartón se mostrará, al final de cada turno, con los cambios efectuados, indicándole al usuario qué número se ha encontrado. El programa deberá preguntar al usuario al inicio de cada turno si desea continuar, en caso de que se continúe, seguirá el mismo patrón que hasta el momento.

//Por supuesto, cuando todos los números de una misma linea estén en "X", mostrará un mensaje "LINEA!", pero la ejecución seguirá, el juego solo acabará cuando todos los números estén a "X".

//Cuando el juego concluya, deberá decirle al usuario en cuantos turnos se ha completado el cartón. Por último, deberá preguntar si desea volver a jugar.



bingoGame();
function bingoGame(){
 
 var carton = {fila1:{n1:2,n2:4,n3:6,n4:8,n5:10},
fila2:{n1:1,n2:3,n3:5,n4:7,n5:9},
fila3:{n1:15,n2:14,n3:13,n4:12,n5:11}}   
    
    
var numAle = 0;
var bingo = 0;
var nBingo = 0;
var nBingo1= false;
var linea = false;
var linea1Count = 0;
var linea2Count = 0;
var linea3Count = 0;
var numAleCheck = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
var userName =''
var turn =0
var fila1Show =[];
var fila2Show = [];
var fila3Show = [];
var l1ck =false;
var l2ck = false;
var l3ck = false;
var end = false

welcome()
function welcome(){
    showBoard();
    alert ('Bienvenido a SkyBingo');
    userName = prompt('Cual es tu nombre ?')
    alert ('Saludos '+userName)
    alert('Empezamos')
    alert('Este es tu carton \n'+fila1Show+'\n'+fila2Show+'\n'+fila3Show+'\n')
}

function numAleatorio(){
    var indice = Math.floor(Math.random()*numAleCheck.length);//obtenemos un numero aleatorio del length de la array de numeros.
    numAle = numAleCheck[indice];//pasamos el numero aleatorio a la variable final.
    numAleCheck.splice(indice, 1);//elimina un elemento  de la array num usando el  index proporcionado por indice

}

function showBoard(){
    for(prop in carton.fila1){
        fila1Show.push(carton.fila1[prop])
    }
    for(prop in carton.fila2){
        fila2Show.push(carton.fila2[prop])
    }
    for (prop in carton.fila3){
        fila3Show.push(carton.fila3[prop])
    }
    fila1Show =fila1Show.join('  ')
    fila2Show = fila2Show.join(' ')
    fila3Show = fila3Show.join(' ')
}

function noBingo(){//nos sirve para confirmar que nosotros no hemos tachado ningun numero y por tanto otro judor si lo habra hecho
    
    if (l1ck === false && l2ck === false && l3ck === false){

        nBingo++
        turn++
        l1ck = false;
        l2ck = false;
        l3ck = false;
    }
    else{
            
        l1ck = false;
        l2ck = false;
        l3ck = false;

    }
    
}

gameStart()
function gameStart(){

    numAleatorio();

    alert('Ha salido el numero: '+numAle)
    var next = false;

    for(prop in carton.fila1){
        if(carton.fila1[prop] === numAle){
            carton.fila1[prop]='X'
            linea1Count ++;
            bingo++;
            turn++;
            l1ck=true;
            alert('Felicidades tines una coincidendia del numero '+ numAle)

        }
        if(linea1Count === 5 && linea === false){
            linea = true;
            alert('Felicidades tienes una linea!!')
        }
}

for(prop in carton.fila2){
    if(carton.fila2[prop] === numAle){
        carton.fila2[prop]='X'
        linea2Count ++;
        bingo++;
        turn++;
        l2ck=true
        alert('Felicidades tines una coincidendia del numero '+ numAle)

    }
    if(linea2Count === 5 && linea === false){
        linea = true;
        alert('Felicidades tienes una linea!!')
    }
}
for(prop in carton.fila3){
    if(carton.fila3[prop] === numAle){
        carton.fila3[prop]='X'
        linea3Count ++;
        bingo++;
        turn++;
        l3ck=true
        alert('Felicidades tines una coincidendia del numero '+ numAle)

    }
    if(linea3Count === 5 && linea === false){
        linea = true;
    alert('Felicidades tienes una linea!!')
    }
}
if(bingo === 15){

    alert('Felicidades! has echo BINGO en: '+turn+' turnos!')
    next = confirm('Quieres volver a jugar?')
        if(next === true){
            bingoGame();
        }
    else if(end === false){
        alert ('Esperamos volerte a ver pronto!')
        end = true;
    }
}
noBingo()
if(nBingo === 15){
    nBingo1= true
    alert('Lo sentimos pero otro jugador a cantado Bingo')
    next = confirm('Quieres volver a jugar?')
if(next === true){
    bingoGame();
}
    else if(end === false){
        alert ('Esperamos volerte a ver pronto!')
        end= true
    }
}

if(bingo<15 && nBingo1=== false){
    fila1Show = [];
    fila2Show =[];
    fila3Show = [];
    showBoard()
    alert(fila1Show+'\n'+fila2Show+'\n'+fila3Show+'\n')
    next =confirm('Quieres continuar ? ')
}
if(next === true && nBingo1 === false){
    gameStart();
}
else if(end === false){
  alert ('Esperamos volerte a ver pronto!')
  end = true
}
}
}
