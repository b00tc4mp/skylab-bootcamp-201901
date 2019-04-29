
function changecard(check){ //replaces XX in the matched numbers of the card
    if(check.matched){
        return "xx";
    }else{
        return (check.number < 10)? "0"+check.number.toString() : check.number.toString();
    }
}
function printcard(card,roll,message){  //Create a concatenated string with the info to screen
    var print="                  "+roll+"         TURN:"+turn+"    SCORE:"+score+"\n";
    if(message==="matched"){
        print+="                        MATCH!\n";
    }
    if(message==="line"){
        print+="                        LINE!!\n";
    }
    if(message==="bingo"               ){
        print+="                        BINGO!!\n";
    }
    print+="               ╔══╦══╦══╦══╦══╗\n";
    for(var i = 0;i < card.length ;){
        print+= "               ║" + changecard(card[i]) + "║" + changecard(card[i+1]) + "║" + changecard(card[i+2]) + "║" + changecard(card[i+3]) + "║" + changecard(card[i+4]) + "║";
        if(i+5<card.length){print += "\n               ╠══╬══╬══╬══╬══╣\n"}
        i+=5;
    }
    print+="\n               ╚══╩══╩══╩══╩══╝";
    return print;
}
function Play(bingoCard,xwin,ywin){ //rolls numbers, checks lines, manage scores and calls function to screen results
    var boarcompleted=true;
    var roll = message ="";
    var bingo = [0,0,0,0,0]
    var arr=randomizer(bingo,true);
    for( var i = 0 ; i < 5 ; i++ ) { 
        bingo[i]=arr[i];
        roll+=bingo[i].toString()+" "; 
    };
    for( var i = 0 ; i < bingoCard.length ; i++ ){
        if( !bingoCard[i].matched ){
            for( var y=0 ; y<5 ; y++ ){
                if( bingoCard[i].number.toString() === bingo[y].toString() ){
                    bingoCard[i].matched = true;
                    message="matched";
                    score+=100;
                }
            }
        }
    }
    for(var i=0 ; i < bingoCard.length;){
        if(bingoCard[i].matched && bingoCard[i+1].matched && bingoCard[i+2].matched && bingoCard[i+3].matched && bingoCard[i+4].matched && xwin[i]===false && message!=='line'){
            xwin[i]=true;
            message="line";
            score+=500;
        }
        i+=5;
    }
    for(var i=0; i < 5 ; i++ ){
        if(bingoCard[i].matched && bingoCard[i+5].matched && bingoCard[i+10].matched && ywin[i]===false && message!=='line'){
            ywin[i]=true;
            message="line";
            score+=500;
        }
    }
    for( var i = 0 ; i < bingoCard.length ; i++ ){ //check if board is completed in order to be printed
        if(bingoCard[i].matched===false){
            boarcompleted=false;
        }
    }
    if(boarcompleted===true){
        message="bingo";
    }
    alert(printcard(bingoCard,roll,message));
    return bingoCard;
}


function wingame(bingoCard){ //win condition 
    for(var i=0 ; i < bingoCard.length ; i++ ){
        if(bingoCard[i].matched===false){
            return false;
        }
    }
    return true;
}


function randomizer(chain,record){ //return a unrepeated number that record rolled numbers for bingo rolls
    var arr=[];
    while(arr.length < chain.length){
        var r = Math.floor((Math.random() * 100) + 1);
        if((arr.indexOf(r) === -1) && (rolls.indexOf(r)=== -1)){
            arr.push(r);
            if(record===true){
                rolls.push(r); //array of numbers already rolled, to prevent same numbers
            }
        }
    }
    return arr;
}

function rankingorder(){ // to order rank an returns scores to screen
    function compare(a,b){ //condition for sort funtion ***
        var comparison=0;
        const scorea=a.points;
        const scoreb=b.points;
        if(scoreb > scorea){
            comparison=1;
        }else{
            comparison=-1;
        }
        return comparison;
    }
    var scoretext="";
    if(globalscores.length>0){
        globalscores.sort(compare); //sort function ***
        for(var i=0; i<globalscores.length;i++){
            scoretext+=(i+1).toString()+"- "+globalscores[i].player+" : "+globalscores[i].points.toString()+"\n";
        }
        return scoretext;
    }else{
        return "NO SCORES";
    }
    
}

function Bingo(){
    do{ //loop for replay
        turn = 0;
        score = 2000;
        if(confirm("!--------------- BINGO!------------------!\n                           \n RULES:\n 1º You start with 2000pts, every turn you will lose 100 pts\n 2º lines will give you 500 pts (just once per turn) , matches will give you 100pts, Play ends with you find BINGO! \n\n 'Cancel' to exit  \n RANKING:\n"+rankingorder())){
            var name;
            var loop = true;
            var ywin = [false,false,false,false,false];
            var xwin = [false,false,false];
            var bingoCard = ramdomnumbers = [];
            rolls=[];
            do{
                name=prompt("please enter your name :D");
            }while(name===undefined)
            while(bingoCard.length<15){
                bingoCard.push({ number: 0, matched: false });
            }
            ramdomnumbers=randomizer(bingoCard,false);
            rolls=[];
            for(var i=0;i<bingoCard.length;i++){
                bingoCard[i].number=ramdomnumbers[i];
            }
            while(!confirm("                YOUR CARD IS:"+printcard(bingoCard,"")+"\n do like it? 'Accept' to continue, 'Cancel' to pick another card")){
                ramdomnumbers=randomizer(bingoCard,false);
                for(var i=0;i<bingoCard.length;i++){
                    bingoCard[i].number=ramdomnumbers[i];
                }
            }
            do{
                if(confirm("New turn? 'Accept' to continue o Cancel to 'exit'")){  
                    turn++;
                    score-=100;
                    bingoCard=Play(bingoCard,xwin,ywin); //roll numbers
                    for(var i=0; i < bingoCard.length ; i+=5){
                        if(bingoCard[i].matched && bingoCard[i+1].matched && bingoCard[i+2].matched && bingoCard[i+3].matched && bingoCard[i+4].matched && xwin[i]===false){
                            xwin[i]=true;
                        }
                    }
                    for(var i=0 ; i < 5 ; i++ ){
                        if(bingoCard[i].matched && bingoCard[i+5].matched && bingoCard[i+10].matched && ywin[i]===false){
                            ywin[i]=true;
                        }
                    }
                    loop=!wingame(bingoCard);
                }else{
                    return 0;
                }    
            }while(loop)
            alert("---------------------- GAME OVER -----------------------------\n                             FINAL SCORE: "+score);   
            globalscores.push({ points: score, player: name })
        }
        else{
            return 0;
        }
    }while(confirm("would you like to play again?")) //play again

}
var turn = 0;
var score = 2000;
var globalscores = [];
var rolls = [];
Bingo();