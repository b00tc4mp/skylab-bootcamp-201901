// Introduce en la array tantos numeros como choises en un rango como picks) 
function generateNumberByTurn(array, choises, picks){

    while (choises > 0){

        let i = Math.floor(Math.random() * (picks -1) +1);

        //if (!i in array){
        if(!array.includes(i)){
                array.push(i);
                choises--;
        }
    }

    return array;
} 

//Pregunta el nombre.
function askName() {
    let name = prompt(`Please introduce your name`, `Guest`);
    if (name === (false || undefined)){
        confirm('Do you want to close the game?') ?  byePlayer() : askName();
    }
    return name;
}

//Se crea el cartón.
function cardNumbersGenerator(){ 
        
    numbersArray = [];
    bingoCard = [];
    var max = 15, j = Math.floor(Math.random()*(91-1)+1);

    for(let i = 0; i < max; j = Math.floor(Math.random()*(91-1)+1)){
        if (numbersArray.includes(j) === true){
            continue;
        } else {
            numbersArray.push(j);
            i++;
        }
    } 

    for (let i = 0; i < numbersArray.length; i++){
        bingoCard.push({number: numbersArray[i], matched: false});
    }
    
    console.log(showCard());
    
    if (confirm(`Do you like this Card?`) === false) {cardNumbersGenerator();}

}

//Se muestra el cartón.
function showCard(){
    toShow = '';
    bingoCard.forEach(function(elem, i){
        toShow += `[${elem.number}]`;
        if ((i+1) % 5 === 0) {
            toShow += '\n';
        }
    });
    
    return toShow;
}

//Puntuación
function finalPoints(){

    if(lines === 3){
        console.log(`You got ${Math.floor(15e5/turn)} points!`);
    } else {console.log(`You left the game too early! No points for you!`);}
}

function checkCoincidences() {
    if ((i = bingoCard.findIndex(o => o.number === actualBall)) !== -1){
        bingoCard[i].number = "*";
        bingoCard[i].matched = true;
        console.log(`It matched!`);
        console.log(showCard());
    } else {console.log(`Bad luck!`)}
}

// Comprueba las lineas.
function checkLines(){
    
    let checkMatcheds = bingoCard.map(x => x.matched);
    let firstLine = [checkMatcheds[0], checkMatcheds[1], checkMatcheds[2], checkMatcheds[3], checkMatcheds[4]];
    let secondLine = [checkMatcheds[5], checkMatcheds[6], checkMatcheds[7], checkMatcheds[8], checkMatcheds[9]];
    let thirdLine = [checkMatcheds[10], checkMatcheds[11], checkMatcheds[12], checkMatcheds[13], checkMatcheds[14]];

    if((firstLine.indexOf(false) === -1) && (linea1 === false) && lines <= 2) {
        linea1 = true;
        lines++;
        lines === 1 ?   console.log(`Great! You completed your first linea!`) : 
                        console.log(`Great! You completed your Second linea!`);
    }

    if((secondLine.indexOf(false) === -1) && (linea2 === false) && lines <= 2){
        linea2 = true;
        lines++;
        lines === 1 ?   console.log(`Great! You completed your first linea!`) : 
                        console.log(`Great! You completed your Second linea!`);
    }

    if((thirdLine.indexOf(false) === -1) && (linea3 === false) && lines <= 2){
        linea3 = true;
        lines++;
        lines === 1 ?   console.log(`Great! You completed your first linea!`) : 
                    console.log(`Great! You completed your Second linea!`);
    }

}   
// Global variables:

let allNumbers = [];
let actualBall;
let turn = 0;
let bingoCard = [];
let linea1 = false, linea2 = false, linea3 = false;
let numbersArray = [];
let toShow = '';
let lines = 0;
let nextBall = true;

// Función principal.
function bingo(){
     
    generateNumberByTurn(allNumbers, 90, 90);
    let name = askName();
    cardNumbersGenerator();

    while (lines !== 3 && nextBall === true){
        actualBall = allNumbers[turn];
        console.log(`The number is ${actualBall}.`);
        checkCoincidences();
        checkLines(); 

        if (lines !== 3){
            confirm(`Keep playing?`) ? turn++ : nextBall = false;

        }else{
            nextBall = false; 
            console.log(`You won! It only took you ${turn} turns!`);
        }

    }

    finalPoints();

    confirm(`Do you want to play again?`) ? bingo() : console.log(`Hope to see you again!`);
}

bingo();


