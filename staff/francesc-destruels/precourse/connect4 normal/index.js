
function startGame(){
    
    let turn = Math.floor(Math.random()*2); //Determinará el un número entre 1 y 2.
    let player = turn % 2 === 0 ? `playerOne` : `playerTwo`; //Si es par empieza el jugador 1 sino el 2.

    this.first = function(){ //Este methodo del esconde las instrucciones y "elige" al primer jugador.
    
        playerTurn();
        document.getElementById("play").style = "visibility:hidden";
    }

    function playerTurn(){ // eEsta funcion escondida insterta en el html quien es el siguiente jugador.
        
        player = turn % 2 === 0 ? `playerOne` : `playerTwo`;

        if (player === `playerOne`){
            turn++;
            document.getElementById(`playerTwo`).innerHTML = ``;
            return document.getElementById(`playerOne`).innerHTML = `<p>It's your turn to play!<\p>`;
        } else {
            document.getElementById(`playerOne`).innerHTML = ``;
            turn++;
            return document.getElementById(`playerTwo`).innerHTML = `<p>It's your turn to play!<\p>`;
        }
    }

    this.nextPiece = function(num){ //Este metodo es la que determina donde va la siguiente pieza.
        
        let i;
        for (i = num + 1; i < (num + 7); i++){
            if (document.getElementById(i).getAttribute(`class`) === `empty`){  
                document.getElementById(i).className = player;    
                break;
            }else if (i === (num + 6)){
                return document.getElementById(player).innerHTML = `<p>Pick a valid Column!</p>`;
            }
        }
        return check(i);
    }

    this.reset = function(){ //Limpia la class de cada div para devolver la tabla a su forma vacia
        document.getElementById("play").style = "visibility: hidden";
        for (i = 10; i <= 70; i += 10){
            for (let z = 1; z <= 6; z++){
                document.getElementById(i+z).className = `empty`;
            }
        }

        turn = Math.floor(Math.random()*2); //devuelve de manera aleatoria el valor de turn a 1 o 2;

        return playerTurn();
    }

    function check(num){ //comprobará si se ha ganado o empatado.
        console.log(num);

        let checking = 0; //valor de chequeo
        let fullColumns = 0;

        function checkWinner() {

            if (checking >= 3 ){
                document.getElementById("play").style = "visibility: visible";
                return document.getElementById(num).getAttribute(`class`) === `playerOne` ? 
                document.getElementById("play").innerHTML = "<h1>Congratulations</h1><p>Player 1 is the Winner!</p></div>":
                document.getElementById("play").innerHTML = "<h1>Congratulations</h1><p>Player 2 is the Winner!</p></div>";;
            } else {
                checking = 0;
            };

        
            for (i = 16; i < 77; i+=10){
                if ((fullColumns < 7) && document.getElementById(i).getAttribute(`class`) !== "empty" ){
                   fullColumns++
                    console.log(fullColumns);
                } else if (fullColumns === 7){
                    document.getElementById("play").style = "visibility: visible";
                    return document.getElementById("play").innerHTML = "<div class='winner'><h1>Draw!</h1>Both of you are Smart!</div>"
                } else {
                    fullColumns = 0;
                }
            }
        }       

        // Comprueba las horizonatales.
        for (let plus10 = num; plus10 <= 66; plus10 += 10){     
            if (document.getElementById(plus10).getAttribute(`class`) === document.getElementById(plus10 + 10).getAttribute(`class`)){
                checking++;
            } else {
                break;
            }
        };
        
        for (let minus10 = num; minus10 >= 21; minus10 -= 10){
            if (document.getElementById(minus10).getAttribute(`class`) === document.getElementById(minus10 - 10).getAttribute(`class`)){
                checking++;
            } else {
                break
            }
        };

        checkWinner();

        // Comprueba las verticales

        let outPlus1 = [16, 26, 36, 46, 56, 66];
        for (let plus1 = num; plus1 <= 75; plus1 += 1){
            if (outPlus1.indexOf(plus1) != -1){
                break;
            } else if (document.getElementById(plus1).getAttribute(`class`) === document.getElementById(plus1 + 1).getAttribute(`class`)){
                checking++;
            } else {
                break;
            }
        };

        let outMinus1  = [21, 31, 41, 51, 61, 71];
        for (let minus1 = num; minus1 >= 12; minus1 -= 1){
            if (outMinus1.indexOf(minus1) != -1) {
                break;
            } else if (document.getElementById(minus1).getAttribute(`class`) === document.getElementById(minus1 - 1).getAttribute(`class`)){
                checking++;
            } else {
                break
            }
        };

        checkWinner();    

        // Comprueba las diagonal ascendente.
        let outPlus11 = [16, 26, 36, 46, 56];
        for (let plus11 = num; plus11 <= 65; plus11 += 11){
            if (outPlus11.indexOf(plus11) != -1){
                break;
            } else if (document.getElementById(plus11).getAttribute(`class`) === document.getElementById(plus11 + 11).getAttribute(`class`)){
                checking++;
            } else {
                break;
            }
        };

        let outMinus11  = [31, 41, 51, 61, 71];
        for (let minus11 = num; minus11 >= 22; minus11 -= 11){
            if (outMinus11.indexOf(minus11) != -1) {
                break;
            } else if (document.getElementById(minus11).getAttribute(`class`) === document.getElementById(minus11 - 11).getAttribute(`class`)){
                checking++;
            } else {
                break
            }
        };

        checkWinner();

        // Comprueba las diagonal descendente.
        let outPlus9 = [11, 21, 31, 41, 51, 61];
        for (let plus9 = num; plus9 <= 66; plus9 += 9){
            if (outPlus9.indexOf(plus9) != -1){
                break;
            } else if (document.getElementById(plus9).getAttribute(`class`) === document.getElementById(plus9 + 9).getAttribute(`class`)){
                checking++;
            } else {
                break;
            }
        };

        let outMinus9  = [26, 36, 46, 56, 66, 76];
        for (let minus9 = num; minus9 >= 21; minus9 -= 9){
            if (outMinus9.indexOf(minus9) != -1) {
                break;
            } else if (document.getElementById(minus9).getAttribute(`class`) === document.getElementById(minus9 - 9).getAttribute(`class`)){
                checking++;
            } else {
                break
            }
        };

        checkWinner();

        return playerTurn();    
    }
}

let game = new startGame(); // Nada más abrir la pagina se crea el Objeto game.

