proyect.


var name = window.prompt("Cual es tu nombre?")
    if (name != name){
    	console.log("Hola " + name)
    }else{
    	console.log("Escribe tu nombre")
    }


var numRandom = 0
var carton = []

function generarCarton(){

	while (carton.length < 15){
		var numRandom = Math.floor(Math.random()*20)+1
		if (carton.indexOf(numRandom) === -1){
			carton.push(numRandom)
		}
	}
    
confirm("Aqui tienes tu carton " + carton)

}

generarCarton()


var contador = 0
var numRepetido = false
var numBombo = 0
var bomboRepeat = []

function Bingo(){
    do{
      do{
      	numBombo = Math.floor(Math.random()*30)+1
      	    if (bomboRepeat.indexOf(numBombo) === -1){
      		numRepeat = false
            bomboRepeat.push(numBombo)
      	    } else {
      		numRepeat = true
      	    }
        } while (numRepeat === true)

        if (carton.lastIndexOf(numBombo) === -1){
        	    confirm("El numero " + numBombo + " no esta en el carton " + carton)
        }else{
        	contador++
        	  confirm("El numero " + numBombo + " esta en tu carton " + carton)
        	carton[carton.lastIndexOf(numBombo)] = "X"
        	  confirm("Tu carton quedara asi " + carton)


        }
    }while (contador < carton.length)
    confirm("Bingooooo")
    

}
Bingo()