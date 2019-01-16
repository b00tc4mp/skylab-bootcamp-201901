
let carton = {
    linea1:[],
    linea2:[],
    linea3:[],
  }
let numAleatorio=0
let numRandom = []
let numeroRandom = 0
let xTrue = 0
let countX = 0
let noRepetido=0
let ranking =[{usuario:"", puntos:0}]
let sum = 0
let newUser = ""


let guardarNumeros =[]
let linea = false
let bingo2= false
let puntuacion = 100
let saveRanking = 0
let saveUsuario = ""


// Posar separat una funcio que generi numeros randoms menys el 0
function getRandom (){
    for (let i=0; i<1;i++){
        numAleatorio = Math.round(Math.random()*99)
        if (numAleatorio ===0){
            i--
        }
    	else{
            return numAleatorio
        }
    }
}

  
// funcion que genere los numeros del carton
function numerosCarton(){
    for (let i=0; i<15; i++){
        numRandom[i] = getRandom();
        for (let k =0; k<i; k++){
            if (numRandom[i]===numRandom[k]){
               i--
            }
        }
    }
    for (let i=0; i<15; i++){
        if (i<5){
            carton.linea1[i] = numRandom[i]
        }
        else if (i<10 && i>4){
            carton.linea2[i-5] = numRandom[i]
        }
        else{
            carton.linea3[i-10] = numRandom[i]
        }
    }
}


//funcion nuevo turno
function nuevoTurno(){
    for (let k=0; k<1; k++){
        numeroRandom = getRandom()
        for (let i=0; i< guardarNumeros.length; i++){
            if (guardarNumeros[i] === numeroRandom){
                k--
            }
            else{
                noRepetido ++
            }
        }
        if (noRepetido === guardarNumeros.length){
            guardarNumeros.push(numeroRandom)
        }
        noRepetido = 0
    }

    for(prop in carton){
        for (let i=0; i<5; i++){
            if(carton[prop][i]===numeroRandom){
                carton[prop][i] = "X"
                console.log("Ha salido el numero " + numeroRandom + " que se encuentra en la " + prop + " de tu carton")
                xTrue = 1
            }
        }  
    }
    if (xTrue === 0){
        console.log("Ha salido el numero " + numeroRandom + " y no se encuentra en tu carton")
    }
    xTrue =0
    console.log(carton)
}


// funcion para comprobar si hay linea (si se canta 1 vez linea, ya no se cantara mas veces)
function compLinea(){
    for (prop in carton){
        for (let i =0; i<5; i++){
            if (carton[prop][i] === "X"){
                countX ++
            }
        }
        if (countX === 5){
            console.log("LINEA!")
            linea = true
        }
        countX=0
    }
}

// funcion para comprobar si hay Bingo (si se canta 1 vez Bingo, el juego finaliza)
function compBingo(){
    for (prop in carton){
        for (let i =0; i<5; i++){
            if (carton[prop][i] === "X"){
                countX ++
            }
        }
        if (countX === 15){
            console.log("BINGO!")
            bingo2 = true
        }
    }
    countX=0
}


// funcion global bingo
function bingo (){
    newUser = prompt("Por favor, introduza su nombre de usuario")
    console.log("Hola " + newUser + ". En este juego, además de intentar conseguir BINGO vas a participar en un ranking de puntuaciones donde cada turno que pase perderás 1 punto. El jugador que más puntos consiga ganará.")
    for (let i =0; i<1; i++){
        numerosCarton()
        alert("Te ha tocado este carton" + JSON.stringify(carton))
            if (confirm("¿Quieres este carton? De lo contrario lo cambiaremos por otro")){
                while(confirm("Quieres pasar al siguiente turno?")){
                    nuevoTurno()
                    puntuacion --
                    if (linea === false){
                        compLinea()
                    }
                    else if (bingo2 === false){
                        compBingo()
                        if (bingo2===true){
                            console.log("Has ganado! gracias por jugar! Tu puntuacion ha sido de " + puntuacion)
                            break;
                        }
                    }
                
                }
            }
            else {
                i--
            }
    }
    ranking[sum] = new Object()
    ranking[sum].usuario = newUser
    ranking[sum].puntos = puntuacion

    for (let k=0; k<ranking.length; k++){
        for (let i =0; i<sum; i++){
            if (ranking[i+1].puntos > ranking[i].puntos){
                saveRanking = ranking[i+1].puntos
                saveUsuario = ranking[i+1].usuario
                ranking[i+1].puntos = ranking[i].puntos
                ranking[i+1].usuario = ranking[i].usuario
                ranking[i].puntos = saveRanking
                ranking[i].usuario = saveUsuario
            }
        }
    }
    console.log("El ranking actual es:")
    console.log(ranking)
    sum++
    
    guardarNumeros =[]
    linea = false
    bingo2= false
    puntuacion = 100
    if (confirm("Quieres volver a jugar?")){
        bingo();
    }
}

bingo();