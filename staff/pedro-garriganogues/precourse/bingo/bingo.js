
function Bingo(){

    //F. Nombre

    function nombre(){
        var name = prompt("Cómo te llamas?");
        alert("Hola " + name + ". Vamos a jugar a un poco de Bingo!");
}

    // Random num gen

    function randomNumGen(){
        var arr = []
        while(arr.length < 90){
            var randomnumber = Math.floor(Math.random()*90) + 1;
            if(arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;	  
        }
        return arr;
    }
    
    // Buscador de coincidencias  

    function searchCoincidence(){
            for (var i = 0; i < carton1.length; i++) {
            if (carton1[i] === randomNum[counter]){
                carton1[i] = "X";
                alert("Coincide un número!");
                coincidenceCounter1++;
            }	
        };
            for (var i = 0; i < carton2.length; i++) {
            if (carton2[i] === randomNum[counter]){
                carton2[i] = "X";
                alert("Coincide un número!");
                coincidenceCounter2++;
            }	
        };
            for (var i = 0; i < carton3.length; i++) {
            if (carton3[i] === randomNum[counter]){
                carton3[i] = "X";
                alert("Coincide un número!");
                coincidenceCounter3++;
            }	
        };
    }
    
    // Cartón

    function cartonArray(){
        var arr = []
        while(arr.length < 90){
            var randomnumber = Math.floor(Math.random()*90) + 1;
            if(arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;	  
        }
        return arr;
    }
    
    function extractingNumber(){
        console.log("Cartón actual: " + "\n 1ra  línea ==> | " + carton1 + " | <== " + "\n 2nda línea ==> | " + carton2 +  " |  <==" + "\n 3ra  línea ==> | " + carton3 + " |  <==");
        alert("Ha salido el núm: " + randomNum[counter] + '!');
    }	
       
    // F. próximo turno

        function nextTurn(){
    
            if(leaveGame() === true){
                return false;
            }	
            
            extractingNumber();
            searchCoincidence();
            counter++;
            return true;
        }
    
        // F. Restart
    
    function restart(){
        var restart = confirm("Te gustaría hacer otra partida?");
        if (restart == true){
            bingoGame();	
        }else{
            alert("Gracias jugar al Bingo!")
        }
    }
    
    // F. salir

    function leaveGame(){
            var continuePlaying = confirm("Turno " + (counter + 1) + ": Siguiente turno?");
            if (continuePlaying !== true){
                var quitGame = confirm("Quieres salir?");
            
                 if (quitGame === false){
                     alert("Continuemos jugando!")
                 }
                 return quitGame;
            }
    }

    //Bingo!

    function bingoGame(){
        while ((coincidenceCounter1 + coincidenceCounter2 + coincidenceCounter3) < 15 ) {
            if(!nextTurn()/*nextTurn === false*/){
                return;
            }
    
            if (coincidenceCounter1 === carton1.length || coincidenceCounter2 === carton2.length || coincidenceCounter3 === carton3.length){
                if (lineCounter === 0){
                    alert("Línea!");
                    lineCounter++;
                }
            }	
        };
    
        alert("BINGO!");
        console.log('BINGO!');
    }
    
    var coincidenceCounter1 = 0;
    
    var coincidenceCounter2 = 0;
    
    var coincidenceCounter3 = 0;

    // Some var

    var counter = 0;
    
    var randomNum = randomNumGen();

    var lineCounter = 0;

    var arr = cartonArray();
    
    var carton1 = arr.splice(0, 5);
    
    var carton2 = arr.splice(0, 5);
    
    var carton3 = arr.splice(0, 5);
    
    
        nombre();
        bingoGame();
        restart();
    }
    
    // Llama función principal:
    Bingo()