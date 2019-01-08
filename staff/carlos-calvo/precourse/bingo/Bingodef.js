function Bingo(numjugadores, rangoBingo){
    
    class Carton { //Class para el cartón
        constructor(n1,n2,n3,n4,n5, nombre){
            this.numbers = [n1,n2,n3,n4,n5];
            this.nombre = nombre;
            this.bingo = false;
        }

        showCarton(){
            console.log("Mi nombre es " + this.nombre + " y mi cartón ha quedado" + this.numbers + "");
        }

        showCartonFinal(){
            if(this.bingo){
                console.log("Mi nombre es " + this.nombre + " y mi cartón ha quedado" + this.numbers + " y he ganado!!");
            } else{
                console.log("Mi nombre es " + this.nombre + " y mi cartón ha quedado" + this.numbers + "");
            }
            
        }

        CheckBola(numeroSalido){
            var indice = this.numbers.indexOf(numeroSalido)
            if(indice == -1){ //no está
                return false;
            } else { //Si està li posam un -1
                this.numbers[indice] = "X";
            }
            this.bingo = this.compruebaCarton();
        }

        compruebaCarton(){ //Método para comprobar carton.
            var finalizado = true;
            for(var i = 0; i < this.numbers.length && finalizado; i++ ){
                finalizado = (this.numbers[i] == "X");
            }
            return finalizado;
        }
    }
    
    var cartonesenjuego = [];
    for(var i = 0; i < numjugadores; i++){
        cartonesenjuego.push(recogerDatosJugador(i, rangoBingo));
    }


	//Crea un array que serán los números salidos que servirá para ir viendo los que quedan y los que no.
	var bingo = new Array();
	for(var i = 1; i <= rangoBingo; i++){
		bingo[i-1] = i;
	}


	var numturnos = 0;
	var fi = false;// Mientras juego no finalizado
	while (!fi){
		numturnos ++;
		var bolaSalida = getNewBola(bingo); //obtenim nova bola
		console.log("la bola salida es el " + bolaSalida + "") //plot nova bola
        cartonesenjuego.forEach(function(carton){
            carton.CheckBola(bolaSalida); //Comprovem si està al cartró
        })

        fi = checkFinal(cartonesenjuego);
		if(!fi){
			console.log("Quedan los siguientes números" + bingo +"");
            cartonesenjuego.forEach(function(carton){
                carton.showCarton();
            });
			fi = !confirm ("Sacamos más bolas?","y");
		}
    }

    console.log("FINAL DEL JUEGO en " + numturnos + " turnos: RESULTADO:")
    cartonesenjuego.forEach(function(carton){
        carton.showCartonFinal();
    });
    



	function getNewBola(bingo){
		indicenumero = numeroAleatorio(0, bingo.length); //obtenim random de la dimensio de array de numeros restants
		var numeroSalido = bingo[indicenumero]; //obtenim el numero de la posicio del array
		bingo.splice(indicenumero, 1); //lo elimino del array
		return parseInt(numeroSalido); 
	}

	function numeroAleatorio(min, max) {
		var x = parseInt(Math.floor((Math.random() * max) + min));
		return x;
	}

    
    function checkFinal(cartonesenjuego){
        var finalizado = false;
        for(var i = 0; i < cartonesenjuego.length && !finalizado; i++){
            finalizado = cartonesenjuego[i].bingo;
        }
        return finalizado;
    }

    function recogerDatosJugador(i, rangoBingo){
        var nombre = prompt ("Di tu nombre Jugador" + i +"",);
         //constante del rango del bingo
        var bingo = new Array();
        for(var i = 1; i <= rangoBingo; i++){
            bingo[i-1] = i;
        }
        var n1 = getNewBola(bingo);
        var n2 = getNewBola(bingo);
        var n3 = getNewBola(bingo);
        var n4 = getNewBola(bingo);
        var n5 = getNewBola(bingo);
        var carton = new Carton(n1,n2,n3,n4,n5, nombre);
        return carton;
    }
}


// Primer parámetro = número de jugadores
// Segundo parámetro = rango de números del bingo

//No se contempla linea, solo bingo y para el caso sólo con 5 números por cartón.
var fi = false;
while(!fi){
    var numjugadores = prompt("Número de jugadores",5);
    while(numjugadores < 1 || isNaN(numjugadores)){
        numjugadores = prompt("Número de jugadores válido",5);
    }
    var rangoBolas = prompt("Rango de las bolas 1 - ",25);
    while(rangoBolas < 20 || isNaN(rangoBolas)){ //Minim 20 bolas
        rangoBolas = prompt("Rango de las bolas válido 1 - ",25);
    }
    Bingo(numjugadores,rangoBolas);
    fi = !confirm("Quieres jugar más veces?");
}