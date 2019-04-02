let randomNumbers = []; 
function randomNumCard (){
    let isRandomNumberIn = true;
    while(isRandomNumberIn){
      let randomBombo =  Math.floor(Math.random() * (11));

      isRandomNumberIn = randomNumbers.some(number =>{
      return number === randomBombo;
      
    })
      if (!isRandomNumberIn){
      randomNumbers.push(randomBombo);
      return randomBombo;
    } 
  }  
}    


function askName(){
    let userName = prompt('¿Cuál es tu nombre?');
    alert('¡Ya va a empezar el bingo' + ', ' + userName + '!');
    return userName;
}

function matchNumbers(number, numberToMatch) {
    if (number === numberToMatch) {
        return 'x';
    } else {
        return number;
    } 
}


let userCard = [1, 4, 6, 9, 10]
function bingo (userCard) {
    let userName = askName();
    let checkedNumbers = userCard;
    let doYouWantToPlay = true;
    while(doYouWantToPlay){
        let randomNum = randomNumCard()
        checkedNumbers = checkedNumbers.map(number => {
              //acá iteramos el cartón del usuario (number) y lo comparamos con randomNum. Si este es coincide se marca una x
              return matchNumbers(number, randomNum);
        })
        console.log('El número de la bola es ' + randomNum);
        if(checkedNumbers.every(num => num === 'x')){
            console.log('Estos eran los números de tu cartón ' + userCard);
            console.log('Ya acertaste todos ' + checkedNumbers);
            console.log('¡Felicidades, has ganado el BINGO!');
            doYouWantToPlay = confirm('¿Quieres volver a jugar, ' + userName + '?');
            if (doYouWantToPlay){
                randomNumbers = [];
                checkedNumbers = userCard;
            } else {
                return 'Gracias por jugar, ' + userName;
            }
        } else {
        console.log('Si ves una x es porque has acertado un número ' + checkedNumbers);
        console.log('Estos eran los números de tu cartón ' + userCard);
        doYouWantToPlay = confirm('¿Quieres probar otra vez, ' + userName + '?');
        }
        if (!doYouWantToPlay){
            return 'Gracias por jugar, ' + userName;
        }
    }    
}
bingo(userCard)




