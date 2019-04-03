var range = 20;         //total de numeros que hay en el bombo
var lineLength = 5;     //Total de numeros que hay en cada linea
var columnLength = 3;   //Total de numeros que hay en cada columna

function bingo(){
    
    var numbersPickedArr =[];
    var bingoBall = 0;
    var turns = 0; 
    var points = 0; 
    var start = true;
    var play = false;
    var ranking = [];
    var cardboard = [];
    var userName = '';
    var maxPuntcuation = (range +1)*10

    while(start == true){
        turns = 0;
        numbersPickedArr =[];
        userName = getUserName();
        cardboard = createBingoCard();

        window.alert("Before start, let me show you how the punctuation system works.\n\n1. You will start with " + maxPuntcuation + " points. \n\n2. Every time you spin the bingo roller you will lose 10 points.\n\n3. If you stop playing without having a bingo you will finish with 0 points.");

        var play = window.confirm("Let's start " + userName + ", this is your cardboard:\n\n" + showCarboard(cardboard) + "\n\n Do you wanna spin the bingo roller?");

        if(play == false)turns = range + 1; //con esto forzamos que el jugador tenga 0 puntos si no ha terminado el carton. Con zero puntos no entrara en el ranking.

        while(play == true){
            turns += 1;
            bingoBall = getBingoBall(range, numbersPickedArr);
            checkCardboard(cardboard, bingoBall);
            window.alert(showCarboard(cardboard));
            play = checkBingo(cardboard);
            if(play == true){
                checkLine(cardboard);
                play = window.confirm("Do you wanna spin the bingo roller again?");
            }
        }

        points = getPoints(turns);

        if (turns !==11){ranking = enterRanking(ranking, userName, points)};

        if(points == 0){start = window.confirm("Sorry, " + userName + "! you ended the game without finishing so you have " + points + " points." + "\n There is the actual ranking:\n " + showRanking(ranking) + "\n Do you wanna play again?");
        }else{start = window.confirm("Congrats, " + userName + "! you ended the game with " + points + " points." + "\n There is the actual ranking:\n " + showRanking(ranking) + "\n Do you wanna play again?");
        }
    }
    
    window.alert("GAME OVER\nThanks for playing " + userName + "!");
}

function getUserName(){                         //funcion que pide nombre de usuario y controla que insertemos almenos un caracter.
    var userName = prompt("Welcome! insert your user name.");

    while(userName=='' || userName== null ||userName == ' '){
        userName = prompt("Incorrect user name. you must enter a user name");
    }
    return userName;
}

function randomNum(numRange){                //funcion que genera numeros aleatorios dentro del rango que hemos definido.
    var i = Math.floor((Math.random() * numRange)+1);
    return i;
}

function cardNumber(number, line){           //funcion para crear un nuevo objeto de numero para el carton de bingo.
    this.number = number;
    this.line = line;
    this.matched = false;
    this.lineMatched = false;
}

function createBingoCard(){                     //funcion para generar el carton de bingo en funcion a las filas y columnas definidas
    
    var totalNums = columnLength * lineLength;
    var cardOk = 'no';
    var cardRange = 0;

    if (range < columnLength*lineLength){
        cardRange = columnLength*lineLength;
    } else{
        cardRange = range;
    }

    do{       
        if(cardOk == 'no'){
            var card =[];
            var columns = 1;
            var lineVal = 1;
            var numbersPickedArr = [];
            var numberRepeated = false;
            for (var i = 0; i < totalNums; i++){
                
                if(columns > lineLength){
                    lineVal += 1;
                    columns = 1;
                }
                do{
                    card[i] = new cardNumber(randomNum(cardRange), lineVal);
                    numberRepeated = false;
                    if(numbersPickedArr.length == 0){
                        numbersPickedArr.push(card[i].number);
                    }else{
                        numbersPickedArr.forEach(element => {
                            if(element == card[i].number){
                                numberRepeated = true;
                            }         
                        });

                        if (numberRepeated == false){
                            numbersPickedArr.push(card[i].number);
                        }
                    }
                }while(numberRepeated == true);
                columns += 1;
            }
        }
        cardOk = prompt('This is your cardboard:\n\n' + showCarboard(card) + '\n\n You like it? type "yes"/"no":');
        if(cardOk != null){
            cardOk = cardOk.toLowerCase();
        }    
             
    }while(cardOk !== 'yes');
    
    return card;
}

function showCarboard(cardboard){               //funcion que devuelve un string con el carton de bingo en un formato amigable para mostrar en pantalla
    
    var str = "| ";
    var line = 1; 

    cardboard.forEach(item => {
        if(item.line == line){
            if(item.matched == false){
                str = str.concat(item.number, " | ");
            }else{
                str = str.concat("X", " | ");  
            }
        } else{
            if(item.matched == false){
                str = str.concat("\n| ", item.number, " | ");
            }else{
                str = str.concat("\n| ", "X", " | ");  
            }
            line += 1;
        }
    });

    return str;
}

function getBingoBall(range, numbersPickedArr){ //funcion para sacar una bola nueva del bombo controlando las que ya han salido.
    
    var bingoBall = 0;
    var numberRepeated = false;
    var ballRange = 0;

    if (range < columnLength*lineLength){
        ballRange = columnLength*lineLength;
    } else{
        ballRange = range;
    }

    do{
        bingoBall = randomNum(ballRange);
        numberRepeated = false;
        if(numbersPickedArr.length == 0){
            numbersPickedArr.push(bingoBall);
        }else{
            numbersPickedArr.forEach(element => {
                if(element == bingoBall){
                    numberRepeated = true;
                }         
            });

            if (numberRepeated == false){
                numbersPickedArr.push(bingoBall);
            }
        }
    }while(numberRepeated==true && numbersPickedArr.length != ballRange)

    window.alert("The new number is: " + bingoBall + "\n\n There's all the picked numbers:\n" + numbersPickedArr.join(" - "));

    return bingoBall;
}

function checkCardboard(cardboard, bingoBall){  //funcion para comprobar que el numero que le passamos por parametro esta en el carton, si esta en el carton lo marcaremos como matched
    cardboard.forEach(item => {
        if(item.number == bingoBall){
            item.matched = true;
        } 
    });
}

function checkBingo(cardboard){                 //funcion para comprobar si tenemos bingo
    var numbersPicked = 0;
    var play = true;

    cardboard.forEach(item => {if(item.matched == true) numbersPicked += 1});

    //window.alert("you have " + numbersPicked + " numbers picked.");

    if(numbersPicked == cardboard.length){
        window.alert("BINGO!\nWINNER WINNER CHICKEN FOR DINNER!!!!!");
        play = false;
    } 

    return play; 
}

function checkLine(cardboard){                  //funcion para comprobar si tenemos linea
    var line = false;
    var numLine = 1;
    var totalMatched = 0;

    cardboard.forEach(element => {
        if(element.line == numLine){
            if(element.matched == true && element.lineMatched == false){
                totalMatched += 1;
                if(totalMatched == lineLength){
                    cardboard.forEach(element => element.lineMatched = true);
                    line = true;
                    totalMatched = 0;                    
                }
            }
        }else {
            numLine +=1;
            if(element.matched == true && element.lineMatched == false){
                totalMatched = 1;
            } else{ totalMatched = 0};
        }
    });

    if (line == true){
        window.alert("You Got a line!!");
    }
}

function getPoints(turns){                      //funcion para contar la puntuacion final
 var points = (range + 1 - turns) * 10;
 return points;
}

function enterRanking(array, userId, points){   //funcion para generar una nueva entrada al array del ranking.
    var newRanking = new newAtRanking(userId, points);
    array.push(newRanking);
    return array;

}

function newAtRanking(userId, points){          //funcin para crear un nuevo objeto de entrada al ranking.
    this.userId = userId;
    this.points = points;
}

function showRanking(ranking){                  //funcion que devuelve un string con el ranking de forma ordenada y amigable para mostrar en pantalla.
    var str = '\n';
    var position = 1;
    function compare(a,b) {
        if (a.points > b.points)
          return -1;
        if (a.points < b.points)
          return 1;
        return 0;
      }
      
    ranking.sort(compare);

    ranking.forEach(element =>{
        str = str.concat(position, " - ", element.userId , ".........", element.points, "\n");
        position += 1;
    });
    return str;
};

bingo();