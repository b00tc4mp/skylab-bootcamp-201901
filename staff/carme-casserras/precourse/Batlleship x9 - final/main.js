// carrier(1) = 5, battleship(1) = 4, cruiser(1) = 3, submarine(1) = 2, destroyer(2) = 1
class Ship {
    constructor(nameShip, shipLenght, startY, startX, axis, image) {
        this.nameShip = nameShip;
        this.shipLenght = shipLenght;
        this.startX = startX;
        this.startY = startY;
        this.axis = axis;
    };
}

// cliId = id tauler(coordenades fila-column)  clickIdAxis = id vertical/horizontal
var cliId = '';
// Posició vert-horiz
var clickIdAxis = '';
// Per controlar de qui és el torn. true = jugador , false = ordinador
var turn = true;
// Variables de la tirada de l'ordinador que s'han d'acumular i si estan dins la funció es poses a 0 cada tirada
var acumId = [];
var sunkC = 0;

// Draggable and Drop vaixells - data=id vaixell / target.id= id tauler
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id); 
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    // Elimino el drag per que no es pugin moure els vaixells una vegada col.locats
    var draggableDiv = document.getElementById(data)
    draggableDiv.setAttribute("draggable", "false");
    ev.target.appendChild(document.getElementById(data)); 

    // Obtinc el id per poder saber fila i columna
    cliId = (ev.target.id);
    var lin = parseInt(cliId.slice(2, 3));
    var col = parseInt(cliId.slice(-1)); 
    
    // Jugador pinta vaixells al tauler tirada ordinador
    drawShipPlayer(lin, col, data);     
    
    // Elimino els botons horizontal/vertical i visualitzo container2
    if (document.getElementsByClassName('arrastrado').length == 6) {  
        var remov = document.getElementsByClassName('ship')[0];
        remov.parentNode.removeChild(remov);
        document.getElementsByClassName('container2')[0].style.display ='grid';
        document.getElementById('turno').style.display = '';
        
        // Ordinador pinta vaixells tauler jugador
        drawShipComputer();   
        if (document.getElementById("winner").innerText === '') {
            // Tirada jugador
            shootPlayer();          
        }
    } 
}
           
// Posició vaixell del jugador vertical-horizontal
function boto() {
    clickIdAxis = event.target.id;
    if (clickIdAxis === 'v') {
        document.getElementById("imag").style.transform  = 'rotate(90deg)';
    } else document.getElementById("imag").style.transform  = 'none';
};
       
// Jugador pinta vaixells al tauler tirada ordinador
function drawShipPlayer(lin, col, nameS) { 
    var carr = new Ship('carrier', 5, 0, 0, 'h');
    var batt = new Ship('battleship', 4, 0, 0, 'h');
    var crui = new Ship('cruiser', 3, 0, 0, 'h');
    var subma = new Ship('submarine', 2, 0, 0, 'h');
    var dest1 = new Ship('destroyer1', 1, 0, 0, 'h');
    var dest2 = new Ship('destroyer2', 1, 0, 0, 'h');
    
    var arrayShip = [carr, batt, crui, subma, dest1, dest2];
    
    for (i in arrayShip) {
        // Per colocar horiz o vertical els vaixells
        arrayShip[i].axis = clickIdAxis;
        var id = '';
        
        if (arrayShip[i].nameShip == nameS) {
            // Posicio inicial de cada vaixell
            arrayShip[i].startY = lin;
            arrayShip[i].startX = col;

            // Obtinc la posició final de cada vaixell
            var endY = arrayShip[i].startY + arrayShip[i].shipLenght;
            var endX = arrayShip[i].startX + arrayShip[i].shipLenght;
                   
            //Pinto vaixell segons horizontal o vertical.
            if (arrayShip[i].axis === 'h') {
                   
                while (arrayShip[i].startX < endX) {
                    id = 'fc'+ arrayShip[i].startY + arrayShip[i].startX;                            
                    //Afegeixo una class = el nom del vaixell així controlo els tocats/enfonsats que es fa en funció shoot
                    document.getElementById(id).className= arrayShip[i].nameShip;
                    arrayShip[i].startX++;
                };
            } else {
                while (arrayShip[i].startY < endY) {
                    id = 'fc'+ arrayShip[i].startY + arrayShip[i].startX;
                    document.getElementById(id).style.transform  = 'rotate(90deg)';
                    //Afegeixo una class = el nom del vaixell així controlo els tocats/enfonsats que es fa en funció shoot
                    document.getElementById(id).className = arrayShip[i].nameShip;
                    arrayShip[i].startY++;
                };
            };
            // Afegeixo class arrastrado per poder eliminar els botons horiz/vert que es fa en el drop
            document.getElementById(id).classList.add('arrastrado');           
        };
    };    
};
// Ordinador pinta vaixells tauler jugador
function drawShipComputer() {
    var carrC = new Ship('carrierComp', 5, 0, 0, 1);   
    var battC = new Ship('battleshipComp', 4, 0, 0, 1);
    var cruiC = new Ship('cruiserComp', 3, 0, 0, 1);
    var submaC = new Ship('submarineComp', 2, 0, 0, 1);
    var dest1C = new Ship('destroyer1Comp', 1, 0, 0, 1);
    var dest2C = new Ship('destroyer2Comp', 1, 0, 0, 1);

    var arrayShipC = [carrC, battC, cruiC, submaC, dest1C, dest2C];
    
    var arrayOcup = [];
    var arrayAcum = [];
        
    var turn = true;
    for (i in arrayShipC) {  
        var arrayCoord = '';         
        end = false; 
        arrayShipC[i].axis = Math.floor(Math.random() * 2)+1;  
        while (end === false) {  
            // Col.loca vaixells en horizontal       
            if (arrayShipC[i].axis === 1) {                
                arrayShipC[i].startX = Math.floor(Math.random() * (10-arrayShipC[i].shipLenght))+1;
                arrayShipC[i].startY = Math.floor(Math.random() * (10-arrayShipC[i].shipLenght))+1;
                
                // Per saber el final de l'array i poder recòrrer-la
                var endX = arrayShipC[i].startX + arrayShipC[i].shipLenght;   
                //Converteixo amb string pq si no al adjuntar XY fa la suma, per comptes de ser coordenades
                arrayShipC[i].startY= (arrayShipC[i].startY).toString();
                // crea un array amb les posicions teòriques on aniria el vaixell
                for (let k = arrayShipC[i].startX; k < endX; k++) {         
                    arrayCoord = arrayShipC[i].startY + arrayShipC[i].startX;  
                    // +1 per que la fila es sempre la mateixa però la columna puja +1                     
                    arrayShipC[i].startX = parseInt(arrayShipC[i].startX)+1;
                    arrayAcum.push('rc' + arrayCoord);          
                }
                // Comprovo si el vaixell ja està ocupat 
                for (let j = 0; j < arrayAcum.length; j++) {                
                    if (arrayOcup.includes(arrayAcum[j])) {    
                        arrayAcum = [];          
                        break
                    } 
                    // arrayAcum.length-1 per que comença amb 0 
                    if ((arrayOcup.includes(arrayAcum[j]) === false) && (j === arrayAcum.length-1)) {
                        arrayOcup = arrayOcup.concat(arrayAcum);
                        end = true;                        
                    }
                }   
            // Coloca vaixells en vertical                  
            } else {
                arrayShipC[i].startX = Math.floor(Math.random() * (10-arrayShipC[i].shipLenght))+1;
                arrayShipC[i].startY = Math.floor(Math.random() * (10-arrayShipC[i].shipLenght))+1;
                // Per saber el final de l'array i poder recòrrer-la
                var endY = arrayShipC[i].startY + arrayShipC[i].shipLenght;   
                //Converteixo amb string pq si no al adjuntar XY fa la suma, per comptes de ser coordenades
                arrayShipC[i].startX= (arrayShipC[i].startX).toString();
                // crea un array amb les posicions teòriques on aniria el vaixell
                for (let k = arrayShipC[i].startY; k < endY; k++) {         
                    arrayCoord = arrayShipC[i].startY + arrayShipC[i].startX;  
                    // +1 per que la fila es sempre la mateixa però la columna puja +1                     
                    arrayShipC[i].startY = parseInt(arrayShipC[i].startY)+1;
                    arrayAcum.push('rc' + arrayCoord);             
                }
                // Comprovo si el vaixell ja està ocupat 
                for (let j = 0; j < arrayAcum.length; j++) {                
                    if (arrayOcup.includes(arrayAcum[j])) {    
                        arrayAcum = [];          
                        break;
                    } 
                    // arrayAcum.length-1 per que comença amb 0 
                    if ((arrayOcup.includes(arrayAcum[j]) === false) && (j === arrayAcum.length-1)) {
                        arrayOcup = arrayOcup.concat(arrayAcum);
                        end = true;                        
                    }
                }                   
            }
            //Afegeixo de class que es el nom del vaixell així controlo els tocats/enfonsats
            arrayAcum.forEach(function(elem) {
            /***************** VISUALITZO EL VAIXELLS AMB "X"  PERO S'HA D'ELIMINAR **************************/
            //document.getElementById(elem).innerText = 'X';
            document.getElementById(elem).className = arrayShipC[i].nameShip;      
            });            
        }
    }
}    
// Tirada jugador            
function shootPlayer() {
    var idShoot = '';
    var clasShoot = '';
    var sunk = 0;
    // Per visualitzar el torn de cada jugador
    document.getElementById('ordinador').style.opacity = 0.2;
    document.getElementById('jugador').style.opacity = 1;
    document.addEventListener('click', eventCli); 
    function eventCli() {
        if (turn === true) {
            // Obtinc el nom de la class i de l'id
            clasShoot = (event.target.className);  
            idShoot = (event.target.id);    
            document.getElementById('error').innerText = '';
            // Missatge per si tiren en el tauler equivocat
            if (idShoot.includes('fc')) {
                document.getElementById('error').innerText = 'ESTE NO ES TU TABLERO';
            } else {
                if ((clasShoot === 'carrierComp') || (clasShoot === 'battleshipComp') || (clasShoot === 'cruiserComp') || (clasShoot === 'submarineComp') || (clasShoot === 'destroyer1Comp') || (clasShoot === 'destroyer2Comp')) {
                    // Afegeixo class per controlar els enfonsats i poso l'icono del foc
                    document.getElementById(idShoot).classList.add(clasShoot + 'tocat');  
                    document.getElementById(idShoot).innerHTML = "<img src='Style/tocat.png' width='25px' heigth='25px'/>";
                    // Controlo si està enfonsat i pinto de vermell
                    if (document.getElementsByClassName(clasShoot +'tocat').length == document.getElementsByClassName(clasShoot).length) {
                        for (let i= 0; i < (document.getElementsByClassName(clasShoot).length); i++) {
                            document.getElementsByClassName(clasShoot+'tocat')[i].style.background = 'red';
                        }
                        sunk += 1;
                    }
                // Else if per controlar si tiren fora del tauler o entre cuadres => que no pasi el torn
                } else if (clasShoot === 'aigua'){
                    // Poso icono aigua
                    document.getElementById(idShoot).innerHTML = "<img src='Style/aigua4.png' width='30px' heigth='30px' />";
                    // Pasa la tirada a l'ordinador
                    turn = false;
                    shootComputer();
                    document.getElementById('ordinador').style.opacity = 1;
                    document.getElementById('jugador').style.opacity = 0.2;
                } 
                if (sunk === 6) {
                    document.getElementById("winner").innerText =  'HAS GANADO';
                    document.removeEventListener('click', eventCli);   
                }  
            }        
        }    
    }
}
// Tirada ordinador
function shootComputer() {
    
    var row = '';
    var column = '';
    var classHit = '';
    var idComp = '';
    
   // Retrasar la resposta de l'ordinador durant 1 segon
    setTimeout(para, 1000);
    function para(){        
        while (turn === false) {
            //Numeros aleatoris per la fila i la columna per fer l'id
            row = Math.floor(Math.random() * 9)+1;
            column = Math.floor(Math.random() * 9)+1;                 
            idComp = 'fc' + row + column;
            
            // Elimino la class "arrastrado" per que si no la classe tocat no s'afegeix correctament
            document.getElementById(idComp).classList.remove('arrastrado');
            // Controlo el nº ramdom no estigui repetit
            if (!acumId.includes(idComp)) {
                acumId += idComp;
                
                if (document.getElementById(idComp).className != 'aigua') {
                    // Recupero el nom de la class
                    classHit = document.getElementById(idComp).className;
                    // Afegeixo class per controlar els enfonsats
                    document.getElementById(idComp).classList.add(classHit + 'tocat'); 
                    // Giro la imatge foc horizontalment si el vaixell està colocat verticalment
                    if (document.getElementById(idComp).style.transform  == 'rotate(90deg)') {
                        document.getElementById(idComp).innerHTML = "<img id='foc' src='Style/tocat.png' width='25px' heigth='25px' style='transform: rotate(270deg);' />"; 
                    
                    } else document.getElementById(idComp).innerHTML = "<img id='foc' src='Style/tocat.png' width='25px' heigth='25px'/>";  
                    // Controlo si està enfonsat i pinto de color vermell
                    if (document.getElementsByClassName(classHit + 'tocat').length == document.getElementsByClassName(classHit).length) {
                        for (let i= 0; i < (document.getElementsByClassName(classHit).length); i++) {
                        document.getElementsByClassName(classHit+'tocat')[i].style.background = 'red';
                        }
                                 
                    sunkC += 1;
                    }    
                } else {
                    document.getElementById(idComp).innerHTML = "<img src='Style/aigua4.png' width='30px' heigth='30px' />";
                    console.log('aigua');
                    // Pasa la tirada al jugador
                    document.getElementById('ordinador').style.opacity = 0.2;
                    document.getElementById('jugador').style.opacity = 1;
                    turn = true;        
                }
                if (sunkC === 6) {
                    document.getElementById("winner").innerText =  'HAS PERDIDO';
                } 
            }
        }
    }
}

function reloa() {       
    location.reload();
}