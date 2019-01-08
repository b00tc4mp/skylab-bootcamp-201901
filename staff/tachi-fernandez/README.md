# Bingo

## En este programa jugaremos una partida al bingo de una forma automatica.

### El juego generarà un carton totalmente aleatorio y empezara a generar numeros.En caso de que el numero sea el mismo que esta en tu carton , lo sustituira por una "X" y generará otro numero.En el caso de que no este en tu carton , avisara de que este numero no lo tienes y dará otro numero aleatorio.El juego finaliza cuando tu carton esta totalmente substituido por una "X".

```javascript


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
```