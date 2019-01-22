//Bingo Game!

function bingo() {
    let userArray = [];

    let usedNums = [];
    
    function generateArray() {
        for (i = 0; userArray.length < 15; i++) {
            var num = Math.floor(Math.random() * 50 + 1);
            if(!(userArray.includes(num))) {
                userArray.push(num);
            };
        };
    };
    generateArray();
    
    function userStart() {
        var user = prompt("What's your name?")
        if (user != null) {
            numOfTurns = 0;
            alert("Welcome to the Bingo Game 🎲🎰 " + user + '!!!');
            return newTurn();
        }
    };
    userStart();
    
    var numOfTurns = 0;
    
    function newTurn() {
        numOfTurns ++;
        var confirmation = confirm('Do you want to start the next turn?');
        if (confirmation == true) {
            return matchNum();
        } else {
            return 'Ciao!'
        }
    };
    
    function luckyNum() {
        var newNum = Math.floor(Math.random() * 50 + 1);
        if (!(usedNums.includes(newNum))) {
            usedNums.push(newNum);
            return newNum;
        } else {
            return luckyNum();
        }
    };
    
    function linefunc1() {
        console.log('LINE! You completed the first line!')
        linefunc1 = function(){}; // Run just once
    };
    
    function linefunc2() {
        console.log('LINE! You completed the second line!')
        linefunc2 = function(){}; // Run just once
    };
    
    function linefunc3() {
        console.log('LINE! You completed the third line!')
        linefunc3 = function(){}; // Run just once
    };
    
    function allEqual(arr) {
        return arr.every(value => value == arr[0]);
    };

    function matchNum() {
        var number = luckyNum();
        console.log('This is your bingo card: ' + '\n' + '[' + userArray.slice(0, 5) + ']'+ '\n' + '[' + userArray.slice(5, 10) + ']'+ '\n' +'[' + userArray.slice(10, 15) + ']');
        console.log('The lucky number is... ' + number + '!');
        for (i = 0; i < userArray.length; i++) {        
            if (userArray[i] == number) {
                console.log('Match! The number ' + number + ' will be crossed.');
                userArray[i] = 'X';
                
                if (allEqual(userArray.slice(0, 5))) {
                    linefunc1()
                }
                if (allEqual(userArray.slice(5, 10))) {
                    linefunc2()
                }
                if (allEqual(userArray.slice(10, 15))) {
                    linefunc3()
                }
                console.log('This is your updated bingo card: ' + '\n' + '[' + userArray.slice(0, 5) + ']'+ '\n' + '[' + userArray.slice(5, 10) + ']'+ '\n' +'[' + userArray.slice(10, 15) + ']');
                if (allEqual(userArray)) {
                    console.log('BINGO! YOU WON!');
                    console.log('Congratulations. You have completed the game in ' + numOfTurns + ' turns.');
                    return playAgain();
    
                }
                return newTurn();
            }
        }
        console.log('No matches found, try again!');
        return newTurn();
    };
    
    function playAgain() {
        var player = confirm('Would you like to play again?')
        if (player == true) {
            userArray = [];
            usedNums = [0];
            numOfTurns = [0];
            generateArray(); userStart();
        } else {
            return 'Have a nice day!';
        }
    };
};

bingo();