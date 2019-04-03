window.onload = conect();
function conect() {
    // La matriu va al revés que el css. Aquí la fila 0 és la de dalt i el css és la d'abaix
    // Parteixo de la posició clickada de manera que només miro els 4 en ratlla de fila, columna o diagonal. No recorro tota la matriu!!
    // CliId: el primer num es fila(i) i el segon columna(j)

    var board =[
        [0,0,0,0,0,0,0], [0,0,0,0,0,0,0], [0,0,0,0,0,0,0], [0,0,0,0,0,0,0], [0,0,0,0,0,0,0], [0,0,0,0,0,0,0],
    ];
    
    var player = 'azul';
    var messag = '';
    function eventCli() {
        cliId = (event.target.id); 
        // Extrec el nº de columna i fila
        var lin = cliId.slice(2, 3);
        var col = cliId.slice(-1);
        //Per no passar torn si cliquen a fora de la rodona, o linea 0, o, sense fitxa a sota
        if ((cliId.slice(0,2) === 'fc') && ((board[lin] == board[0]) || (board[lin-1][col] != 0))) {
            player = (player == 'azul') ? 'rojo' : 'azul'; 
            play(board, lin, col, player);
            messag = win(board, lin, col, player);
        } 
        if (messag !='') {
            document.removeEventListener('click', eventCli);     
        }
    }
    document.addEventListener('click', eventCli);
};

function play(board, lin, col, player) {   
    //Bloquejo que no es pugui tirar si no hi ha fitxa fila inferior, i no deixo repintar fitxa
    
    if ((player === 'rojo') && ((board[lin] == board[0]) || (board[lin-1][col] != 0)) && (board[lin][col] == 0)) {
        document.getElementById(cliId).style.background = "red";
        board[lin][col] = 'R';
        document.getElementById("red").style.opacity = 0.2;
        document.getElementById("blue").style.opacity = 1;
    }; 
    if ((player === 'azul') && ((board[lin] == board[0]) || (board[lin-1][col] != 0)) && (board[lin][col] == 0)) {
        document.getElementById(cliId).style.background = "blue";
        board[lin][col] = 'B';
        document.getElementById("blue").style.opacity = 0.2;
        document.getElementById("red").style.opacity = 1;
    };
}

function win(game, line, colu, player) {
    line = parseInt(line);
    colu = parseInt(colu);
    var pattern = (player == 'rojo') ? 'RRRR' : 'BBBB';
    var acumCol = '';
    var message = '';
    
    // Comprovo fila
    // Passo l'array de la fila a string. 
    var linea = game[line].join('');
      
    // Comprovo columna
    // Acumulo a una string tots els resultats d'una columna
    for (var i = 0; i < game.length; i++){
        acumCol += game[i][colu];
    };    
   
    /**********************
    * Mirar excel per veure com he calculat les diagonals, buscant regla per començar a recòrrer la fila i la 
    * columna des de la fila[0]
    * **********************/
    // Comprovo diagonal d'esquerra-dreta 
    var startRUpi = line-colu;
    var startRUpj = colu-colu;
    var startRDowni = 0;
    var startRDownj = colu-line;
    var acumRUp = '';
    var acumRDown = '';
   
    if (line <= colu) {
       var j = startRDownj;   
        for (var i = startRDowni; i < game.length; i++){
            acumRDown += game[i][j];
            j++; 
        }
    } else {
        var j = startRUpj;
        for (var i = startRUpi; i <game.length; i++) {
            acumRUp += game[i][j];
            j++;
        }
    }
    // Comprovo diagonal dreta-esquerra 
    var startLUpi = line+colu-6;
    var startLUpj = 6;
    var startLDowni = 0;
    var startLDownj = line+colu;
    var acumLUp = '';
    var acumLDown = '';

    if (startLDownj <= 6) {
        var j = startLDownj;
        for (var i = startLDowni; i < game.length; i++) {
            acumLDown += game[i][j];
            j--;
        }
    } else {
        var j = startLUpj;
        for (let i = startLUpi; i < game.length; i++) {
            acumLUp += game[i][j];
            j--;
        }
    }
    // Comparativa dels patrons per veure si s'aconseguit fila, columna o diagonal
    if ((linea.includes(pattern) === true) || (acumCol.includes(pattern) === true) ||(acumRDown.includes(pattern) === true) || (acumRUp.includes(pattern) === true) || (acumLDown.includes(pattern) === true) || (acumLUp.includes(pattern) === true)) {
        message = (player === 'rojo') ? document.getElementById("winner").innerText = "Han ganado las rojas" : document.getElementById("winner").innerText = "Han ganado las azules";   
    };
    if ((game[5].join('')).includes(0) === false) {
        message = document.getElementById("winner").innerText = "Empate";
    };
    return message;   
}
function reloa() {
    document.getElementById("blue").style.opacity = 0.2;
    document.getElementById("red").style.opacity = 1;
    // pintar de blanc tots els cercles i buidar el missatge del guanyador
    var x = document.querySelectorAll(".container > div");
    x.forEach(element => {
        element.style.backgroundColor = "white";
    });
    document.getElementById("winner").innerText = '';
    conect();
}
