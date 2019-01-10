//Listeners

startBtn.addEventListener("click", startGame);
startBtn.addEventListener("click", welcomer);
nextBtn.addEventListener("click", checkAllShipsUserPlaced)
playAgainBtn.addEventListener("click", playAgain);

document.onkeyup = function(e) {
  if (e.ctrlKey && e.which == 90) {
    pcWins()
  } else if (e.ctrlKey && e.which == 66) {
    userWins()
  }
};

let user = document.getElementById("username").value;
let shots = 0;

let f = 0;

let ships = [
    {id: 00, ship: 'destroyer', length: '2', status: 0},
    {id: 01, ship: 'submarine', length: '3', status: 0},
    {id: 02, ship: 'cruiser', length: '3', status: 0},
    {id: 03, ship: 'battleship', length: '4', status: 0},
    {id: 04, ship: 'carrier', length: '5', status: 0},
];

let shipsUser = [
    {id: 00, ship: 'destroyerUser', length: '2', status: 0},
    {id: 01, ship: 'submarineUser', length: '3', status: 0},
    {id: 02, ship: 'cruiserUser', length: '3', status: 0},
    {id: 03, ship: 'battleshipUser', length: '4', status: 0},
    {id: 04, ship: 'carrierUser', length: '5', status: 0},
];

let grid = [
    {id: 00, square: 'A1', status: 0, ship: ''},
    {id: 01, square: 'A2', status: 0, ship: ''},
    {id: 02, square: 'A3', status: 0, ship: ''},
    {id: 03, square: 'A4', status: 0, ship: ''},
    {id: 04, square: 'A5', status: 0, ship: ''},
    {id: 05, square: 'A6', status: 0, ship: ''},
    {id: 06, square: 'A7', status: 0, ship: ''},
    {id: 07, square: 'A8', status: 0, ship: ''},
    {id: 08, square: 'B1', status: 0, ship: ''},
    {id: 09, square: 'B2', status: 0, ship: ''},
    {id: 10, square: 'B3', status: 0, ship: ''},
    {id: 11, square: 'B4', status: 0, ship: ''},
    {id: 12, square: 'B5', status: 0, ship: ''},
    {id: 13, square: 'B6', status: 0, ship: ''},
    {id: 14, square: 'B7', status: 0, ship: ''},
    {id: 15, square: 'B8', status: 0, ship: ''},
    {id: 16, square: 'C1', status: 0, ship: ''},
    {id: 17, square: 'C2', status: 0, ship: ''},
    {id: 18, square: 'C3', status: 0, ship: ''},
    {id: 19, square: 'C4', status: 0, ship: ''},
    {id: 20, square: 'C5', status: 0, ship: ''},
    {id: 21, square: 'C6', status: 0, ship: ''},
    {id: 22, square: 'C7', status: 0, ship: ''},
    {id: 23, square: 'C8', status: 0, ship: ''},
    {id: 24, square: 'D1', status: 0, ship: ''},
    {id: 25, square: 'D2', status: 0, ship: ''},
    {id: 26, square: 'D3', status: 0, ship: ''},
    {id: 27, square: 'D4', status: 0, ship: ''},
    {id: 28, square: 'D5', status: 0, ship: ''},
    {id: 29, square: 'D6', status: 0, ship: ''},
    {id: 30, square: 'D7', status: 0, ship: ''},
    {id: 31, square: 'D8', status: 0, ship: ''},
    {id: 32, square: 'E1', status: 0, ship: ''},
    {id: 33, square: 'E2', status: 0, ship: ''},
    {id: 34, square: 'E3', status: 0, ship: ''},
    {id: 35, square: 'E4', status: 0, ship: ''},
    {id: 36, square: 'E5', status: 0, ship: ''},
    {id: 37, square: 'E6', status: 0, ship: ''},
    {id: 38, square: 'E7', status: 0, ship: ''},
    {id: 39, square: 'E8', status: 0, ship: ''},
    {id: 40, square: 'F1', status: 0, ship: ''},
    {id: 41, square: 'F2', status: 0, ship: ''},
    {id: 42, square: 'F3', status: 0, ship: ''},
    {id: 43, square: 'F4', status: 0, ship: ''},
    {id: 44, square: 'F5', status: 0, ship: ''},
    {id: 45, square: 'F6', status: 0, ship: ''},
    {id: 46, square: 'F7', status: 0, ship: ''},
    {id: 47, square: 'F8', status: 0, ship: ''},
    {id: 48, square: 'G1', status: 0, ship: ''},
    {id: 49, square: 'G2', status: 0, ship: ''},
    {id: 50, square: 'G3', status: 0, ship: ''},
    {id: 51, square: 'G4', status: 0, ship: ''},
    {id: 52, square: 'G5', status: 0, ship: ''},
    {id: 53, square: 'G6', status: 0, ship: ''},
    {id: 54, square: 'G7', status: 0, ship: ''},
    {id: 55, square: 'G8', status: 0, ship: ''},
    {id: 56, square: 'H1', status: 0, ship: ''},
    {id: 57, square: 'H2', status: 0, ship: ''},
    {id: 58, square: 'H3', status: 0, ship: ''},
    {id: 59, square: 'H4', status: 0, ship: ''},
    {id: 60, square: 'H5', status: 0, ship: ''},
    {id: 61, square: 'H6', status: 0, ship: ''},
    {id: 62, square: 'H7', status: 0, ship: ''},
    {id: 63, square: 'H8', status: 0, ship: ''},
];

let gridUser = [
    {id: 00, square: 'I1', status: 0, ship: ''},
    {id: 01, square: 'I2', status: 0, ship: ''},
    {id: 02, square: 'I3', status: 0, ship: ''},
    {id: 03, square: 'I4', status: 0, ship: ''},
    {id: 04, square: 'I5', status: 0, ship: ''},
    {id: 05, square: 'I6', status: 0, ship: ''},
    {id: 06, square: 'I7', status: 0, ship: ''},
    {id: 07, square: 'I8', status: 0, ship: ''},
    {id: 08, square: 'J1', status: 0, ship: ''},
    {id: 09, square: 'J2', status: 0, ship: ''},
    {id: 10, square: 'J3', status: 0, ship: ''},
    {id: 11, square: 'J4', status: 0, ship: ''},
    {id: 12, square: 'J5', status: 0, ship: ''},
    {id: 13, square: 'J6', status: 0, ship: ''},
    {id: 14, square: 'J7', status: 0, ship: ''},
    {id: 15, square: 'J8', status: 0, ship: ''},
    {id: 16, square: 'K1', status: 0, ship: ''},
    {id: 17, square: 'K2', status: 0, ship: ''},
    {id: 18, square: 'K3', status: 0, ship: ''},
    {id: 19, square: 'K4', status: 0, ship: ''},
    {id: 20, square: 'K5', status: 0, ship: ''},
    {id: 21, square: 'K6', status: 0, ship: ''},
    {id: 22, square: 'K7', status: 0, ship: ''},
    {id: 23, square: 'K8', status: 0, ship: ''},
    {id: 24, square: 'L1', status: 0, ship: ''},
    {id: 25, square: 'L2', status: 0, ship: ''},
    {id: 26, square: 'L3', status: 0, ship: ''},
    {id: 27, square: 'L4', status: 0, ship: ''},
    {id: 28, square: 'L5', status: 0, ship: ''},
    {id: 29, square: 'L6', status: 0, ship: ''},
    {id: 30, square: 'L7', status: 0, ship: ''},
    {id: 31, square: 'L8', status: 0, ship: ''},
    {id: 32, square: 'M1', status: 0, ship: ''},
    {id: 33, square: 'M2', status: 0, ship: ''},
    {id: 34, square: 'M3', status: 0, ship: ''},
    {id: 35, square: 'M4', status: 0, ship: ''},
    {id: 36, square: 'M5', status: 0, ship: ''},
    {id: 37, square: 'M6', status: 0, ship: ''},
    {id: 38, square: 'M7', status: 0, ship: ''},
    {id: 39, square: 'M8', status: 0, ship: ''},
    {id: 40, square: 'N1', status: 0, ship: ''},
    {id: 41, square: 'N2', status: 0, ship: ''},
    {id: 42, square: 'N3', status: 0, ship: ''},
    {id: 43, square: 'N4', status: 0, ship: ''},
    {id: 44, square: 'N5', status: 0, ship: ''},
    {id: 45, square: 'N6', status: 0, ship: ''},
    {id: 46, square: 'N7', status: 0, ship: ''},
    {id: 47, square: 'N8', status: 0, ship: ''},
    {id: 48, square: 'O1', status: 0, ship: ''},
    {id: 49, square: 'O2', status: 0, ship: ''},
    {id: 50, square: 'O3', status: 0, ship: ''},
    {id: 51, square: 'O4', status: 0, ship: ''},
    {id: 52, square: 'O5', status: 0, ship: ''},
    {id: 53, square: 'O6', status: 0, ship: ''},
    {id: 54, square: 'O7', status: 0, ship: ''},
    {id: 55, square: 'O8', status: 0, ship: ''},
    {id: 56, square: 'P1', status: 0, ship: ''},
    {id: 57, square: 'P2', status: 0, ship: ''},
    {id: 58, square: 'P3', status: 0, ship: ''},
    {id: 59, square: 'P4', status: 0, ship: ''},
    {id: 60, square: 'P5', status: 0, ship: ''},
    {id: 61, square: 'P6', status: 0, ship: ''},
    {id: 62, square: 'P7', status: 0, ship: ''},
    {id: 63, square: 'P8', status: 0, ship: ''},
];

function welcomer() {
    user = document.getElementById("username").value;
    document.getElementById('welcomeUser').innerHTML = 'Welcome aboard @' + user + ' !';
}

function startGame() {
    document.getElementById("welcome").style.display="none";
    document.getElementById("showResults").style.display="none";
    document.getElementById("gameDisplayPC").style.display="grid";
    document.getElementById('music').src = "style/start.mp3";
    document.getElementById('music').play();
};

function startUser() {
    document.getElementById("welcome").style.display="none";
    document.getElementById("showResults").style.display="none";
    document.getElementById("gameDisplayPC").style.display="none";
    document.getElementById("gameDisplay").style.display="grid";
    activateShipListUser()
};

function pagePC() {
    user= document.getElementById("username").value
    document.getElementById("welcome").style.display="none";
    document.getElementById("showResults").style.display="none";
    document.getElementById("gameDisplayPC").style.display="grid";
    document.getElementById("gameDisplay").style.display="none";
    setTimeout(shootPC, 800);
};

function pageUser () {
    if (f === 0) {
        updateUserTurn()
        f = 1
    }
    user= document.getElementById("username").value;
    document.getElementById("welcome").style.display="none";
    document.getElementById("showResults").style.display="none";
    document.getElementById("gameDisplayPC").style.display="none";
    document.getElementById("gameDisplay").style.display="grid";
};

function updatePCTurn() {
    let parent = document.getElementById("instructionsUser");
    let child1 = document.getElementById("welcomeUser");
    let child2 = document.getElementById("text1");
    let child3 = document.getElementById("text2");
    let child4 = document.getElementById("text3");
    let child5 = document.getElementById("text4");
    let child6 = document.getElementById("nextBtn");
    parent.removeChild(child1);
    parent.removeChild(child2);
    parent.removeChild(child3);
    parent.removeChild(child4);
    parent.removeChild(child5);
    parent.removeChild(child6);
    let para = document.createElement("h3");
    let node = document.createTextNode("COMPUTER'S TURN");
    para.appendChild(node)
    let para2 = document.createElement("p");
    let node2 = document.createTextNode("Cross your fingers and wait for your turn!");
    para2.appendChild(node2)
    let element = document.getElementById("instructionsUser");
    element.appendChild(para);
    element.appendChild(para2);
};

function updateUserTurn() {
    user = document.getElementById("username").value;
    let parent = document.getElementById("yourInstructions");
    let child1 = document.getElementById("text5");
    let child2 = document.getElementById("text6");
    let child3 = document.getElementById("text7");
    let child4 = document.getElementById("text8");
    parent.removeChild(child1);
    parent.removeChild(child2);
    parent.removeChild(child3);
    parent.removeChild(child4);
    let para = document.createElement("h3");
    let node = document.createTextNode("YOUR TURN @" + user);
    para.appendChild(node)
    let para2 = document.createElement("p");
    let node2 = document.createTextNode("Shoot & cross your fingers!");
    para2.appendChild(node2)
    parent.appendChild(para);
    parent.appendChild(para2);
};

function activateShipListUser () {
    for (let i = 0; i < shipsUser.length; i++) {
        document.getElementById(shipsUser[i].ship).style.display = "list-item";
    }
};

function placeShipUser(e) {
    let element = e.target || e.srcElement;
    let x = 0;
    let j = 0;
    for (let i = 0; i < shipsUser.length; i++) {
        if (shipsUser[i].status === 1) {
            x = Number(shipsUser[i].length);
            j = shipsUser[i]
        }
    };

    if (j != 0 && gridUser[gridUser.findIndex(p=> p.square === element.id)].status === 0 && Number(gridUser[gridUser.findIndex(p=> p.square === element.id)].square.charAt(1)) + Number(x) <= 9) {
        for (let i = 0; i < x; i++) {
            gridUser[(gridUser.findIndex(p=> p.square === element.id)) + i].status = 1;
            gridUser[(gridUser.findIndex(p=> p.square === element.id)) + i].ship = j.ship;
            let p = Number(element.id.charAt(1)) +i
            let k = element.id.charAt(0) + p;
            document.getElementById(k).innerHTML = "<img src='style/markplaced.svg' width=45px height=45px/>";
            document.getElementById(k).style.border = "hidden";
         }
            j.status = 2;
            document.getElementById(j.ship).className = "shipsTypesUsers";
            document.getElementById(j.ship).style.display = "none";
    } else {
        alert("This ship does not fit in here!!")
    }     
}; 

function placeShipsPC() {
    arrayLetters= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    arrayNumbers= [1, 2, 3, 4]
    positions= [];
    let n = 8;

    for (let i=0; i<5; i++) {
        let x = Math.floor(Math.random()*n)
        let j = Math.floor(Math.random()*4)
        positions.push(arrayLetters[x]+arrayNumbers[j])
        arrayLetters.splice(x, 1)
        n--
    }

    for (let i = 0; i < positions.length; i++) {
        grid[grid.findIndex(p=> p.square === positions[i])].status = 1
        grid[grid.findIndex(p=> p.square === positions[i])].ship = ships[i].ship
        let x = ships[i].length
        x--
        let j= grid.findIndex(p=> p.square === positions[i])
        j++
        while (x !== 0) {
            grid[j].status = 1
            grid[j].ship = ships[i].ship
            j++
            x--
        }
    }
};

function chooseShip(e) {
    let element = e.target || e.srcElement;
    if (Object.values(shipsUser).every(element => element.status !== 1)) {
        shipsUser[shipsUser.findIndex(p=> p.ship === element.id)].status = 1
        document.getElementById(shipsUser[shipsUser.findIndex(p=> p.ship === element.id)].ship).className = "blinking";
    } else {
        false
    }
};

function checkUser (e) {
   let element = e.target || e.srcElement;
   checkGridUser(e) ? placeShipUser(e) : false 
};

function checkGridUser (e) {
    let element = e.target || e.srcElement;
    let x = 0;
    let j = 0;

    for (let i = 0; i < shipsUser.length; i++) {
        if (shipsUser[i].status === 1) {
            x = Number(shipsUser[i].length);
            j = shipsUser[i]
        }
    }
    
    gridArray = [];
    gridArrayObject = []

    if (element.id.length === 0) {
        alert('This ships does not fit in here!')
        return false
    } else {
        for (let i = 0; i < x; i++) {
        gridArray.push(gridUser[(gridUser.findIndex(p=> p.square === element.id)) + i].square)
        gridArrayObject.push(gridUser[(gridUser.findIndex(p=> p.square === element.id)) + i])
        }
            if (Object.values(gridArrayObject).some(element => element.status === 1)) {
                gridArrayObject = [];
                alert('This ships does not fit in here!')
                return false
            } else {
                return true
            }
    }
};

function checkAllShipsUserPlaced() {
    if (Object.values(shipsUser).every(element => element.status === 2)) {
          placeShipsPC();
            startUser();
            updatePCTurn();
    } else {
        alert('Oh poor little one... You have to place all your ships!')
    }
};

function shootPC () {

    arrayLetters= ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
    arrayNumbers= [1, 2, 3, 4, 5, 6, 7, 8]

    positions= [];

    for (let i=0; i<1; i++) {
        let x = Math.floor(Math.random()*8)
        let j = Math.floor(Math.random()*8)
        positions.push(arrayLetters[x]+arrayNumbers[j])
    }

    if (gridUser[gridUser.findIndex(p=> p.square === positions[0])].status === 0) {
        document.getElementById('music').src = "style/splashPC.mp3";
        document.getElementById('music').play();
        document.getElementById(positions[0]).style.border = "hidden";
        document.getElementById(positions[0]).innerHTML = "<img src='style/splash.svg' width=45px height=45px/>";
        gridUser[gridUser.findIndex(p=> p.square === positions[0])].status = 2
    } else if (gridUser[gridUser.findIndex(p=> p.square === positions[0])].status === 1) {
        document.getElementById('music').src = "style/bomb.mp3";
        document.getElementById('music').play();
        document.getElementById(positions[0]).style.border = "hidden";
        document.getElementById(positions[0]).innerHTML = "<img src='style/explosion.svg' width=45px height=45px/>";
        gridUser[gridUser.findIndex(p=> p.square === positions[0])].status = 3
        for (let i = 0; i < shipsUser.length; i++) {
            if (gridUser[gridUser.findIndex(p=> p.square === positions[0])].ship === shipsUser[i].ship) {
            shipsUser[i].length--
            }
        }
    } else {
        shootPC()
    }
    checkShipsUser()
    updateShipListUser()
    checkIfAllSunkUser() ? setTimeout(showResultsPCWins, 1800) : setTimeout(pageUser, 1800);
};

function checkGrid(e) {
    let element = e.target || e.srcElement;
    if (grid.findIndex(p=> p.square === element.id) === -1) {
        return  
    }
    if (grid[grid.findIndex(p=> p.square === element.id)].status === 0) {
        showSplash()
        shots++;
        document.getElementById(element.id).style.border = "hidden";
        document.getElementById(element.id).innerHTML = "<img src='style/splash.svg' width=45px height=45px/>";
        grid[grid.findIndex(p=> p.square === element.id)].status = 2

    } else if (grid[grid.findIndex(p=> p.square === element.id)].status === 1) {
        showBomb()
        shots++;
        document.getElementById(element.id).style.border = "hidden";
        document.getElementById(element.id).innerHTML = "<img src='style/explosion.svg' width=45px height=45px/>";
        grid[grid.findIndex(p=> p.square === element.id)].status = 3
        for (let i = 0; i < ships.length; i++) {
            if (grid[grid.findIndex(p=> p.square === element.id)].ship === ships[i].ship) {
            ships[i].length--
            }
        }
    }
    checkShipsPC()
    updateShipListPC()
    document.getElementById('shots').innerHTML = shots;
    checkIfAllSunkPC() ? setTimeout(showResultsUserWins, 1800) : setTimeout(pagePC, 1800);
};  

function checkShipsUser() {
    for (let i = 0; i < shipsUser.length; i++) {
        if (shipsUser[i].length === 0) {
            shipsUser[i].status = 3;
        }
    }
};

function updateShipListUser() {
    n = [];
    for (let i = 0; i < shipsUser.length; i++) {
        if (shipsUser[i].status === 3) {
            whichShip = i;
            document.getElementById(shipsUser[i].ship).style.display = "none";
            for (let j = 0; j < gridUser.length; j++) {
                if (gridUser[j].ship === shipsUser[whichShip].ship) {
                    n.push(gridUser[j].square)
                }
            }      
        }
    }
    for (let i = 0; i < n.length; i++) {
        document.getElementById(n[i]).innerHTML = "<img src='style/marksunk.svg' width=45px height=45px/>";
    }
    n=[];
};

function checkIfAllSunkUser() {
    if (Object.values(shipsUser).every(element => element.status === 3)) {
        return true
    } else {
        return false
    }
};

function checkShipsPC() {
    for (let i = 0; i < ships.length; i++) {
        if (ships[i].length === 0) {
            ships[i].status = 1;
        }
    }
};

function updateShipListPC() {
    n = [];

    for (let i = 0; i < ships.length; i++) {
        if (ships[i].status === 1) {
            whichShip = i;
            document.getElementById(ships[i].ship).style.display = "none";
            for (let j = 0; j < grid.length; j++) {
                if (grid[j].ship === ships[whichShip].ship) {
                    n.push(grid[j].square)
                }
            }      
        }
    }

    for (let i = 0; i < n.length; i++) {
        document.getElementById(n[i]).innerHTML = "<img src='style/britney.gif' width=45px height=45px/>";
    }

    n=[];
};

function checkIfAllSunkPC() {
    if (Object.values(ships).every(element => element.status === 1)) {
        return true
    } else {
        return false
    }
};

function showResultsUserWins() {
    document.getElementById('music').src = "style/theEnd.mp3";
    document.getElementById('music').play();
    user= document.getElementById("username").value
    document.getElementById("welcome").style.display="none";
    document.getElementById('gameDisplay').style.display="none";
    document.getElementById('gameDisplayPC').style.display="none";
    document.getElementById('showResults').style.display = 'block';
    document.getElementById('results').innerHTML = 'Nice job ' + user + '! You have successfully destroyed your enemy with ' + shots + ' shots!';
    document.getElementById('obama').src = "style/giphy.gif";
};

function showResultsPCWins() {
    document.getElementById('music').src = "style/boo.mp3";
    document.getElementById('music').play();
    user= document.getElementById("username").value
    document.getElementById("welcome").style.display="none";
    document.getElementById('gameDisplay').style.display="none";
    document.getElementById('gameDisplayPC').style.display="none";
    document.getElementById('showResults').style.display = 'block';
    document.getElementById('results').innerHTML = 'Ooh... ' + user + '! Your enemy has defeated you!';
    document.getElementById('obama').src = "style/boo.gif";
};

function chooseBoomGif () {
    x = Math.floor(Math.random()*3)
    j = "style/boom" + x + ".gif";
    document.getElementById("shot").src = j;
    document.getElementById('shot').style.display = "block";
    setTimeout("document.getElementById('shot').style.display = 'none';", 1200)
};

function chooseWaterGif () {
    x = Math.floor(Math.random()*3)
    j = "style/water" + x + ".gif";
    document.getElementById("shot").src = j;
    document.getElementById('shot').style.display = "block";
    setTimeout("document.getElementById('shot').style.display = 'none';", 1500)
};

function showSplash() {
    chooseWaterGif()
    document.getElementById('music').src = "style/splash.mp3";
    document.getElementById('music').play();
};

function showBomb() {
    chooseBoomGif()
    document.getElementById('music').src = "style/bomb.mp3";
    document.getElementById('music').play();
};

function pcWins() {
    shipsUser = [
        {id: 00, ship: 'destroyerUser', length: '2', status: 3},
        {id: 01, ship: 'submarineUser', length: '3', status: 3},
        {id: 02, ship: 'cruiserUser', length: '3', status: 3},
        {id: 03, ship: 'battleshipUser', length: '4', status: 3},
        {id: 04, ship: 'carrierUser', length: '5', status: 3},
    ];
    checkIfAllSunkUser() ? showResultsPCWins() : false;
};

function userWins() {
    ships= [
        {id: 00, ship: 'destroyer', length: '2', status: 1},
        {id: 01, ship: 'submarine', length: '3', status: 1},
        {id: 02, ship: 'cruiser', length: '3', status: 1},
        {id: 03, ship: 'battleship', length: '4', status: 1},
        {id: 04, ship: 'carrier', length: '5', status: 1},
    ];
    checkIfAllSunkPC() ? showResultsUserWins() : false;
};

function playAgain() {

    shots = 0;
    document.getElementById('shots').innerHTML = shots;

    f = 0;

    ships = [
        {id: 00, ship: 'destroyer', length: '2', status: 0},
        {id: 01, ship: 'submarine', length: '3', status: 0},
        {id: 02, ship: 'cruiser', length: '3', status: 0},
        {id: 03, ship: 'battleship', length: '4', status: 0},
        {id: 04, ship: 'carrier', length: '5', status: 0},
    ];

    for (let i = 0; i < ships.length; i++) {
        document.getElementById(ships[i].ship).style.display = "list-item";
    };

    shipsUser = [
        {id: 00, ship: 'destroyerUser', length: '2', status: 0},
        {id: 01, ship: 'submarineUser', length: '3', status: 0},
        {id: 02, ship: 'cruiserUser', length: '3', status: 0},
        {id: 03, ship: 'battleshipUser', length: '4', status: 0},
        {id: 04, ship: 'carrierUser', length: '5', status: 0},
    ];

    for (let i = 0; i < shipsUser.length; i++) {
        document.getElementById(shipsUser[i].ship).style.display = "list-item";
    };

    grid = [
        {id: 00, square: 'A1', status: 0, ship: ''},
        {id: 01, square: 'A2', status: 0, ship: ''},
        {id: 02, square: 'A3', status: 0, ship: ''},
        {id: 03, square: 'A4', status: 0, ship: ''},
        {id: 04, square: 'A5', status: 0, ship: ''},
        {id: 05, square: 'A6', status: 0, ship: ''},
        {id: 06, square: 'A7', status: 0, ship: ''},
        {id: 07, square: 'A8', status: 0, ship: ''},
        {id: 08, square: 'B1', status: 0, ship: ''},
        {id: 09, square: 'B2', status: 0, ship: ''},
        {id: 10, square: 'B3', status: 0, ship: ''},
        {id: 11, square: 'B4', status: 0, ship: ''},
        {id: 12, square: 'B5', status: 0, ship: ''},
        {id: 13, square: 'B6', status: 0, ship: ''},
        {id: 14, square: 'B7', status: 0, ship: ''},
        {id: 15, square: 'B8', status: 0, ship: ''},
        {id: 16, square: 'C1', status: 0, ship: ''},
        {id: 17, square: 'C2', status: 0, ship: ''},
        {id: 18, square: 'C3', status: 0, ship: ''},
        {id: 19, square: 'C4', status: 0, ship: ''},
        {id: 20, square: 'C5', status: 0, ship: ''},
        {id: 21, square: 'C6', status: 0, ship: ''},
        {id: 22, square: 'C7', status: 0, ship: ''},
        {id: 23, square: 'C8', status: 0, ship: ''},
        {id: 24, square: 'D1', status: 0, ship: ''},
        {id: 25, square: 'D2', status: 0, ship: ''},
        {id: 26, square: 'D3', status: 0, ship: ''},
        {id: 27, square: 'D4', status: 0, ship: ''},
        {id: 28, square: 'D5', status: 0, ship: ''},
        {id: 29, square: 'D6', status: 0, ship: ''},
        {id: 30, square: 'D7', status: 0, ship: ''},
        {id: 31, square: 'D8', status: 0, ship: ''},
        {id: 32, square: 'E1', status: 0, ship: ''},
        {id: 33, square: 'E2', status: 0, ship: ''},
        {id: 34, square: 'E3', status: 0, ship: ''},
        {id: 35, square: 'E4', status: 0, ship: ''},
        {id: 36, square: 'E5', status: 0, ship: ''},
        {id: 37, square: 'E6', status: 0, ship: ''},
        {id: 38, square: 'E7', status: 0, ship: ''},
        {id: 39, square: 'E8', status: 0, ship: ''},
        {id: 40, square: 'F1', status: 0, ship: ''},
        {id: 41, square: 'F2', status: 0, ship: ''},
        {id: 42, square: 'F3', status: 0, ship: ''},
        {id: 43, square: 'F4', status: 0, ship: ''},
        {id: 44, square: 'F5', status: 0, ship: ''},
        {id: 45, square: 'F6', status: 0, ship: ''},
        {id: 46, square: 'F7', status: 0, ship: ''},
        {id: 47, square: 'F8', status: 0, ship: ''},
        {id: 48, square: 'G1', status: 0, ship: ''},
        {id: 49, square: 'G2', status: 0, ship: ''},
        {id: 50, square: 'G3', status: 0, ship: ''},
        {id: 51, square: 'G4', status: 0, ship: ''},
        {id: 52, square: 'G5', status: 0, ship: ''},
        {id: 53, square: 'G6', status: 0, ship: ''},
        {id: 54, square: 'G7', status: 0, ship: ''},
        {id: 55, square: 'G8', status: 0, ship: ''},
        {id: 56, square: 'H1', status: 0, ship: ''},
        {id: 57, square: 'H2', status: 0, ship: ''},
        {id: 58, square: 'H3', status: 0, ship: ''},
        {id: 59, square: 'H4', status: 0, ship: ''},
        {id: 60, square: 'H5', status: 0, ship: ''},
        {id: 61, square: 'H6', status: 0, ship: ''},
        {id: 62, square: 'H7', status: 0, ship: ''},
        {id: 63, square: 'H8', status: 0, ship: ''},
    ];
    
    for (let i = 0; i < grid.length; i++) {
        document.getElementById(grid[i].square).style.border = "1px solid white";
        document.getElementById(grid[i].square).innerHTML = "";
    };
    
    gridUser = [
        {id: 00, square: 'I1', status: 0, ship: ''},
        {id: 01, square: 'I2', status: 0, ship: ''},
        {id: 02, square: 'I3', status: 0, ship: ''},
        {id: 03, square: 'I4', status: 0, ship: ''},
        {id: 04, square: 'I5', status: 0, ship: ''},
        {id: 05, square: 'I6', status: 0, ship: ''},
        {id: 06, square: 'I7', status: 0, ship: ''},
        {id: 07, square: 'I8', status: 0, ship: ''},
        {id: 08, square: 'J1', status: 0, ship: ''},
        {id: 09, square: 'J2', status: 0, ship: ''},
        {id: 10, square: 'J3', status: 0, ship: ''},
        {id: 11, square: 'J4', status: 0, ship: ''},
        {id: 12, square: 'J5', status: 0, ship: ''},
        {id: 13, square: 'J6', status: 0, ship: ''},
        {id: 14, square: 'J7', status: 0, ship: ''},
        {id: 15, square: 'J8', status: 0, ship: ''},
        {id: 16, square: 'K1', status: 0, ship: ''},
        {id: 17, square: 'K2', status: 0, ship: ''},
        {id: 18, square: 'K3', status: 0, ship: ''},
        {id: 19, square: 'K4', status: 0, ship: ''},
        {id: 20, square: 'K5', status: 0, ship: ''},
        {id: 21, square: 'K6', status: 0, ship: ''},
        {id: 22, square: 'K7', status: 0, ship: ''},
        {id: 23, square: 'K8', status: 0, ship: ''},
        {id: 24, square: 'L1', status: 0, ship: ''},
        {id: 25, square: 'L2', status: 0, ship: ''},
        {id: 26, square: 'L3', status: 0, ship: ''},
        {id: 27, square: 'L4', status: 0, ship: ''},
        {id: 28, square: 'L5', status: 0, ship: ''},
        {id: 29, square: 'L6', status: 0, ship: ''},
        {id: 30, square: 'L7', status: 0, ship: ''},
        {id: 31, square: 'L8', status: 0, ship: ''},
        {id: 32, square: 'M1', status: 0, ship: ''},
        {id: 33, square: 'M2', status: 0, ship: ''},
        {id: 34, square: 'M3', status: 0, ship: ''},
        {id: 35, square: 'M4', status: 0, ship: ''},
        {id: 36, square: 'M5', status: 0, ship: ''},
        {id: 37, square: 'M6', status: 0, ship: ''},
        {id: 38, square: 'M7', status: 0, ship: ''},
        {id: 39, square: 'M8', status: 0, ship: ''},
        {id: 40, square: 'N1', status: 0, ship: ''},
        {id: 41, square: 'N2', status: 0, ship: ''},
        {id: 42, square: 'N3', status: 0, ship: ''},
        {id: 43, square: 'N4', status: 0, ship: ''},
        {id: 44, square: 'N5', status: 0, ship: ''},
        {id: 45, square: 'N6', status: 0, ship: ''},
        {id: 46, square: 'N7', status: 0, ship: ''},
        {id: 47, square: 'N8', status: 0, ship: ''},
        {id: 48, square: 'O1', status: 0, ship: ''},
        {id: 49, square: 'O2', status: 0, ship: ''},
        {id: 50, square: 'O3', status: 0, ship: ''},
        {id: 51, square: 'O4', status: 0, ship: ''},
        {id: 52, square: 'O5', status: 0, ship: ''},
        {id: 53, square: 'O6', status: 0, ship: ''},
        {id: 54, square: 'O7', status: 0, ship: ''},
        {id: 55, square: 'O8', status: 0, ship: ''},
        {id: 56, square: 'P1', status: 0, ship: ''},
        {id: 57, square: 'P2', status: 0, ship: ''},
        {id: 58, square: 'P3', status: 0, ship: ''},
        {id: 59, square: 'P4', status: 0, ship: ''},
        {id: 60, square: 'P5', status: 0, ship: ''},
        {id: 61, square: 'P6', status: 0, ship: ''},
        {id: 62, square: 'P7', status: 0, ship: ''},
        {id: 63, square: 'P8', status: 0, ship: ''},
    ];

    for (let i = 0; i < gridUser.length; i++) {
        document.getElementById(gridUser[i].square).style.border = "1px solid white";
        document.getElementById(gridUser[i].square).innerHTML = "";
    };

    document.getElementById('showResults').style.display = 'hidden';

    document.getElementById("instructionsUser").innerHTML = "";
    let para = document.createElement("p");
    para.id = "welcomeUser"
    let node = document.createTextNode("Welcome aboard @" + user + " !");
    para.appendChild(node)
    let para2 = document.createElement("p");
    let node2 = document.createTextNode("Please place all your ships. To do so, please follow the steps:");
    para2.id = "text1"
    para2.appendChild(node2)
    let para3 = document.createElement("p");
    let node3 = document.createTextNode("1. Click on one of the Ships of the 'Remaining ships' list on your left.");
    para3.id = "text2"
    para3.appendChild(node3)
    let para4 = document.createElement("p");
    let node4 = document.createTextNode("2. Click on the first field of the map you would like to place it.");
    para4.id = "text3"
    para4.appendChild(node4)
    let para5 = document.createElement("p");
    let node5 = document.createTextNode("Once you are done, please click the Next button.");
    para5.id = "text4"
    para5.appendChild(node5)
    let para6 = document.createElement("button");
    let node6 = document.createTextNode("Next");
    para6.id = "nextBtn"
    para6.appendChild(node6)
    let element = document.getElementById("instructionsUser");
    element.appendChild(para);
    element.appendChild(para2);
    element.appendChild(para3);
    element.appendChild(para4);
    element.appendChild(para5);
    element.appendChild(para6);
    nextBtn.addEventListener("click", checkAllShipsUserPlaced);
   
    document.getElementById("yourInstructions").innerHTML = "";

    let parent = document.getElementById("yourInstructions");
    let para7 = document.createElement("p");
    let node7 = document.createTextNode("Your enemy has already placed his fleet in the map. Please click on the field you would like to fire.");
    para7.id = "text5"
    para7.appendChild(node7)
    let para8 = document.createElement("p");
    let node8 = document.createTextNode("If you are lucky, a bang will be seen! If you miss your shoot, water will be spilled...");
    para8.id = "text6"
    para8.appendChild(node8)
    let para9 = document.createElement("p");
    let node9 = document.createTextNode("When all of the squares of a ship have been hit, the ship will sunk and it will disappear from the Ship list on the left.");
    para9.id = "text7"
    para9.appendChild(node9)
    let para10 = document.createElement("p");
    let node10 = document.createTextNode("Good luck comrade!");
    para10.id = "text8"
    para10.appendChild(node10)
    parent.appendChild(para7);
    parent.appendChild(para8);
    parent.appendChild(para9);
    parent.appendChild(para10);

    startGame()
};
