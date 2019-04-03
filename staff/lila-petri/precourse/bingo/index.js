//BINGO GAME!
var max;
var min;
var userName=askUserName();
var bigBingo;
var line1;
var line2;
var bingoCard
function bingo(){
    bingoCard = [
        { number: 0, matched: false },
        { number: 0, matched: false },
        { number: 0, matched: false },
        { number: 0, matched: false },
        { number: 0, matched: false },
        { number: 0, matched: false },
        { number: 0, matched: false },
        { number: 0, matched: false },
        { number: 0, matched: false },
        { number: 0, matched: false }
    ];
    max=20;
    min=1;
    bigBingo=[]; //--> To save all the random numbers showed. 
    line1=false;
    line2=false;
    let answerStart=confirm('Are you ready?');
    cleanCard(bingoCard);
    if(answerStart==true){
    createBingoCard(bingoCard);
    showCardBingo(bingoCard);
       let countTurns=0;
        do{
            if(newTurn()){
            countTurns++;
            let randy=onlyRandom();
            let inside=numberIncluded(randy)
            if(inside){
                checkNumber(randy,bingoCard);
                checkLine();
                showCardBingo(bingoCard);
             }else{
                 alert(`Ooh..😞  The number ${randy} is not included in your Bingo Card`);  
                 
             } 
        }else{
            
            break
        }
       
        }while(!allEqual(bingoCard))
       
        if(allEqual(bingoCard)){
           
            alert(`🥳🥳🥳  BINGO ${userName} \n You have completed the game in ${countTurns} turns`);
           
        }
        playingAgain();
        }else{
        alert('Bye');
        }
    return
}

function createBingoCard(theCard){
                   
    theCard.forEach(function(element){
         let rand=randomNumber(max, min);
        while(exist(rand)){
            rand=randomNumber(max, min);
        }
        element.number=rand;
    });
    return
    }

    function randomNumber(max, min){
        return Math.floor(Math.random() * (max - min + min)) + 1
    }

    function exist(rand){
        let flag=false;
        for(let i=0;i<bingoCard.length;i++){
            if (bingoCard[i].number==rand){
                return flag=true
            }

        }
    }
   
function randomNumber(max, min){
    return Math.floor(Math.random() * (max - min + min)) + 1
}
function askUserName(){
    let count=0;
    var name=prompt('Could you tell us your name,please?');
    for (let i=0; i<name.length;i++){
        count+= 1;
        if (name[i]==" "){
        break;
        }
    }
    let firstname=name.slice(0,count);

    return firstname;

}
function newTurn(){
    nextTurn=confirm('Next Turn? 🎲');
    return nextTurn;
}

function checkNumber(randy,bingoCard){
    
    alert(`👏 Congratuation the number ${randy} is included in your card`);
    bingoCard.some(function(el){
         if(el.number===randy){
            el.matched=true;
            el.number='X';  
         }
         return
     });
    return
}

function showCardBingo(bingoCard){
    let prettyArray='';
    for (let i=0;i<bingoCard.length/2;i++){
        prettyArray= prettyArray + bingoCard[i].number+','
      
    }
    prettyArray=prettyArray+'\n'
    for (j=bingoCard.length/2;j<bingoCard.length;j++){
        prettyArray= prettyArray + bingoCard[j].number+','
      
    }
 
    alert(`${userName} this is your Bingo card  \n ${prettyArray}`);
    return
}

function onlyRandom(){

    var value=randomNumber(max, min);
    while(bigBingo.includes(value)){
        value=randomNumber(max, min);
    }
    bigBingo.push(value);
    return value
    
}
function allEqual(card){  
     return card.every(element => element.matched===true)
 }
 function cleanCard(bingoCard){
    bingoCard.forEach(function (element){
        element.number=0;
        element.matched=false;
    });
    return
 }

function playingAgain(){
    let yes=confirm('Would you like to play again?');
    if(yes){
        bingo();
    }else{
        alert('Bye')
    }
    return
}


function numberIncluded(rdn){
    return bingoCard.some(function(el){
        return el.number==rdn;
     });
  }

function checkLine(){
   let checkLine1= bingoCard.slice(0,5);
   let checkLine2= bingoCard.slice(5,10);
   if(!line1){
       if(allEqual(checkLine1)){
        line1=true;   
        alert('!!!!!LINE!!!!!!')
           
       }
   }
   if(!line2){
    if(allEqual(checkLine2)){
        line2=true;
        alert('!!!!LINE!!!!!')
       
    }
}
return
}
bingo();


