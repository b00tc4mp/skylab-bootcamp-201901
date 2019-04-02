
function playBingo() {
    var row1 = [];
    var row2 = [];
    var row3 = [];
    var turnsCounter = 0;
    var LineDone = false;
    var nums = 20;
    var bomboNumsInUse = [];
    var cardNumbsInUse = [];


    function cardNumbGenerator() {
        var repeat = true;
        while (repeat) {
            var number = Math.floor(Math.random() * nums)
            if (cardNumbsInUse.indexOf(number) < 0) {
                cardNumbsInUse.push(number);
                repeat = false;
                return number;
            }
        }
    }


    function cardGenerator() {

        for (i = 0; i < 5; i++) {
            var cardNumb = cardNumbGenerator();
            row1[i] = cardNumb;
        }

        for (i = 0; i < 5; i++) {
            var cardNumb = cardNumbGenerator();
            row2[i] = cardNumb;
        }

        for (i = 0; i < 5; i++) {
            var cardNumb = cardNumbGenerator();
            row3[i] = cardNumb;
        }

        newTurn();
    }




    function randomBomboNumb() {

        var repeat = true;
        while (repeat) {
            var numb = Math.floor(Math.random() * nums);
            if (bomboNumsInUse.indexOf(numb) < 0) {
                repeat = false;
                bomboNumsInUse.push(numb);
                return numb;
            }
        }
    }


    function newTurn() {
        var result = window.confirm('This is your card\n\n' + row1 + '\n' + row2 + '\n' + row3 + '\n\nTurns: '+ turnsCounter + '\nNew Turn?');
        if (result) {
            turnsCounter++;
            matchCheck();
        } else {
            window.alert('Hasta luego!');
        }
    }


    function matchCheck() {
        var randomNumbValue = randomBomboNumb();
        for (i = 0; i < row1.length; i++) {
            if (randomNumbValue == row1[i]) {
                row1[i] = 'X';
            }
        }
        for (i = 0; i < row2.length; i++) {
            if (randomNumbValue == row2[i]) {
                row2[i] = 'X';
            }
        }
        for (i = 0; i < row3.length; i++) {
            if (randomNumbValue == row3[i]) {
                row3[i] = 'X';
            }
        }
        lineCheck();
    }


    function lineCheck() {
        var linerow1 = true;
        var linerow2 = true;
        var linerow3 = true;
        for (i = 0; i < row1.length; i++) {

            if (row1[i] !== 'X') {
                linerow1 = false;
            }



        }

        for (i = 0; i < row2.length; i++) {

            if (row2[i] !== 'X') {
                linerow2 = false;
            }



        }

        for (i = 0; i < row3.length; i++) {

            if (row3[i] !== 'X') {
                linerow3 = false;
            }



        }

        if (linerow1 && linerow2 && linerow3) {

            window.alert('BINGO!\n You won at the turn number: '+turnsCounter+'!');
            var ok = window.confirm('Want to play again?');
            if(ok){
                playBingo();
            }else{
                window.alert('Bye bye!');
                return;
            }
            
        }
        
        if (!LineDone && (linerow1 || linerow2 || linerow3)) {
            window.alert('LINE!');
            LineDone = true;
            newTurn();

        }else{

            newTurn();


        }

    }


    cardGenerator();
}

playBingo();
