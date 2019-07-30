//Podías enseñar un mensaje cuando no se encuentren vuelos que se ajusten a lo que el user ha pedido, por ejemplo un precio demasiado bajo. 
//Cuando el usuario es admin y introduce un vuelo, tienes que controlar que el id que ponga no sea repetido, o poner tu directamente un id sin preguntar al usuario.


var flights = [
    { id: 01, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 02, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 03, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 04, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 05, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 06, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 07, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 08, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 09, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 10, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 11, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false },
    { id: 12, to: 'Barcelona', from: 'Lleida', cost: 40, scale: false },
    { id: 13, to: 'Mallorca', from: 'Lleida', cost: 90, scale: true },
    { id: 14, to: 'Tel-Aviv', from: 'Barcelona', cost: 150, scale: false },
    { id: 15, to: 'Andorra', from: 'Lleida', cost: 60, scale: false }
];

function Aerolinea(){

    var userLevel = '';
    var userName = prompt("Hi there! first, what's your user name?");
    while (userName =='' || userName == null || userName == ' '){
        userName = prompt("You must enter a user name!");
    }

    console.log("\n" + "Hi, " + userName + '!' + "\n"+ "\n");
    console.log("let's check the flights available:" + "\n");

    availableFlights();
    avgFligthsCost();    
    flightsWithScale();
    lastFlightsDest();
    userLevel = userEntryLevel(userLevel, userName);

    if (userLevel == 'ADMIN'){
        adminUserFunc();
    }else if(userLevel == 'USER'){
        userFunc();
    }
    
    console.log("\n" + "Bye " + userName + "!" + "\n");
}

function availableFlights(){
        
    for (var i = 0; i < flights.length; i++){
        if (flights[i].scale == true){
            console.log("Flight ID: " + flights[i].id + " FROM: " + flights[i].from + " TO: " + flights[i].to + ' wich costs: ' + flights[i].cost + "$ with scale.");
        } else {
            console.log("Flight ID: " + flights[i].id + " FROM: " + flights[i].from + " TO: " + flights[i].to + ' wich costs: ' + flights[i].cost + "$ with no scale.");
        }
        
    }
}

function avgFligthsCost(){
    
    var sumCost = 0;
    var avgCost = 0;

    for (var i = 0; i < flights.length; i++){
        sumCost += flights[i].cost;
    }

    avgCost = sumCost/flights.length;
    
    console.log("\n" + "the average cost of the all the flights is: " + avgCost.toFixed(2) + "$" + "\n" + "\n");

}

function flightsWithScale(){

    var flightsScaleNum = 0;
    
    for (var i = 0; i < flights.length; i++){
        if (flights[i].scale == true){
            flightsScaleNum += 1;    
        }
        
    }

    console.log("\n" + "there are " + flightsScaleNum + " flights that make a scale." + "\n" + "\n");
    console.log("\n" + "let's see the flights with scale:");

    for (var j = 0; j < flights.length; j++){
        if (flights[j].scale == true){
            console.log("Flight ID: " + flights[j].id + " FROM: " + flights[j].from + " TO: " + flights[j].to + ' wich costs: ' + flights[j].cost + "$ with scale.");
        }
    }

}

function lastFlightsDest(){
    
    console.log("\n" + "The destinations of the last 5 flights of the day are:");

    for (var lastFlights = flights.length - 5; lastFlights < flights.length; lastFlights++){
        console.log("Destination " + lastFlights + ": " + flights[lastFlights].to);
    }
}

function userEntryLevel(userLevel, userName){
    
    userLevel = prompt("Are you ADMIN or USER?");
    if(userLevel != null){
        userLevel = userLevel.toUpperCase();
    }
    

    while (userLevel !== 'ADMIN' && userLevel !== 'USER'){
        userLevel = prompt("WRONG ENTRY! Please, write if you are ADMIN or USER:");
        if(userLevel != null){
            userLevel = userLevel.toUpperCase();
        }    
    }

    switch(userLevel){
        case 'ADMIN':
            console.log("\n" + "Hi " + userName + ", you entered as Admin." + "\n" + "\n");
            break;

        case 'USER':
            console.log("\n" + "Hi " + userName + ", you entered as User." + "\n" + "\n");
            break;

        default:
            console.log("\n" + "operation aborted!" + "\n" + "\n");
            break;
    }

    return userLevel;
}

function adminUserFunc(){
    
    var question = '';

    while(question != 'Q'){
        question = prompt("Do you want to Create (C) or Delete (D) flights? insert (Q) to quit.");
        if (question != null){
            question = question.toUpperCase();
        }

        while(question != 'C' && question != 'D' && question != 'Q'){
            question = prompt("INCORRECT ENTRY! Do you want to Create (C) or Delete (D) flights? insert (Q) to quit.");
            if (question != null){
                question = question.toUpperCase();
            }
        }
    
        switch(question){
            case 'C':
                createFlights();
            break;
            
            case 'D':
                deleteFlights();
            break;
        }
    }
    

    /*
    question = prompt("Do you want to Create (C) or Delete (D) flights? insert (E) to exit.");
    if (question != null){
        question = question.toUpperCase();
    }
    
    while(question != 'C' && question != 'D' && question != 'E'){
        question = prompt("INCORRECT ENTRY! Do you want to Create (C) or Delete (D) flights? insert (E) to exit.");
        if (question != null){
            question = question.toUpperCase();
        }
    } 
    */
}

function userFunc(){

    var purchased = 0;
    var flightsFiltered = [];
    var flightSearch = '';
    var purchaseFlight = 0;
    var flightsFound = 0;

    while (flightsFound == 0){

        var flightCost = prompt("Please, enter the price you want to search");
        
        if (flightCost != null){
            var flightCost = Number.parseInt(flightCost);
        }

        while(flightCost == null || Number.isNaN(flightCost) || flightCost == '' || flightCost == ' '){
            flightCost = prompt("INCORRECT ENTRY! You must enter a number. Enter the price you want to search please");
            if (flightCost != null){
                flightCost = Number.parseInt(flightCost);
            }
        }

        flightSearch = prompt("Now, enter if you want to see flights higher(H), lower(L) or equal(E) to the price entered, enter (Q) to quit");
        if (flightSearch != null){
            flightSearch = flightSearch.toUpperCase();
        }

        while(flightSearch != 'H' && flightSearch != 'L' && flightSearch != 'E' && flightSearch != 'Q'){
            flightSearch = prompt("INCORRECT ENTRY! Enter if you want to see flights higher(H), lower(L) or equal(E) to the price entered, enter (Q) to quit");
            if (flightSearch != null){
                flightSearch = flightSearch.toUpperCase();
            }
        }
        
    
        switch(flightSearch){
            case 'H':
                for (var i = 0; i < flights.length; i++){
                    if(flights[i].cost >= flightCost){
                        if (flightsFound == 0){flightsFound = 1;}
                        flightsFiltered.push(flights[i]);
                        if (flights[i].scale == true){
                            console.log("Flight ID: " + flights[i].id + " FROM: " + flights[i].from + " TO: " + flights[i].to + ' wich costs: ' + flights[i].cost + "$ with scale.");
                        } else {
                            console.log("Flight ID: " + flights[i].id + " FROM: " + flights[i].from + " TO: " + flights[i].to + ' wich costs: ' + flights[i].cost + "$ with no scale.");
                        }    
                    }   
                }
            break;
            
            case 'L':
                for (var i = 0; i < flights.length; i++){
                    if(flights[i].cost <= flightCost){
                        if (flightsFound == 0){flightsFound = 1;}
                        flightsFiltered.push(flights[i]);
                        if (flights[i].scale == true){
                            console.log("Flight ID: " + flights[i].id + " FROM: " + flights[i].from + " TO: " + flights[i].to + ' wich costs: ' + flights[i].cost + "$ with scale.");
                        } else {
                            console.log("Flight ID: " + flights[i].id + " FROM: " + flights[i].from + " TO: " + flights[i].to + ' wich costs: ' + flights[i].cost + "$ with no scale.");
                        }    
                    }
                }
            break;
            
            case 'E':
                for (var i = 0; i < flights.length; i++){
                    if(flights[i].cost == flightCost){
                        if (flightsFound == 0){flightsFound = 1;}
                        flightsFiltered.push(flights[i]);
                        if (flights[i].scale == true){
                            console.log("Flight ID: " + flights[i].id + " FROM: " + flights[i].from + " TO: " + flights[i].to + ' wich costs: ' + flights[i].cost + "$ with scale.");
                        } else {
                            console.log("Flight ID: " + flights[i].id + " FROM: " + flights[i].from + " TO: " + flights[i].to + ' wich costs: ' + flights[i].cost + "$ with no scale.");
                        }    
                    }
                }
            break;

            case 'Q':
                console.log("\n" + "Operation Aborted!" + "\n" + "\n");
                if (flightsFound == 0){flightsFound = 1;}
            break;
        }  
  
        if(flightsFiltered.length == 0 && flightSearch != 'Q'){
            console.log("Sorry, no flights found.");
        }
    }

    while(purchased == 0 && flightsFiltered.length > 0){
        var purchaseFlight = prompt("Enter the ID of the flight you want to purchase. Enter (Q) to quit without purchasing");
        if (purchaseFlight != null && purchaseFlight != 'Q' && purchaseFlight != 'q'){
            var purchaseFlight = Number.parseInt(purchaseFlight);
        }else if(purchaseFlight == 'q'){
            purchaseFlight = purchaseFlight.toUpperCase();
        }

        while(purchaseFlight == null || Number.isNaN(purchaseFlight) && purchaseFlight != 'Q' || purchaseFlight == '' || purchaseFlight == ' '){
            purchaseFlight = prompt("INCORRECT ENTRY! You must enter a number. Enter the ID of the flight you want to purchase. Enter (Q) to quit without purchasing");
            if (purchaseFlight != null && purchaseFlight != 'Q' && purchaseFlight != 'q'){
                purchaseFlight = Number.parseInt(purchaseFlight);
            }else if(purchaseFlight == 'q'){
                purchaseFlight = purchaseFlight.toUpperCase();
            }
        }

        if(purchaseFlight != 'Q'){
            for (var j = 0; j < flightsFiltered.length; j++){
                if (flightsFiltered[j].id == purchaseFlight){
                    console.log("\n" + "You purchased:" + "\n" + "\n" + "Flight ID: " + flightsFiltered[j].id + " FROM: " + flightsFiltered[j].from + " TO: " + flightsFiltered[j].to + ' wich costs: ' + flightsFiltered[j].cost + "$ with scale:" + flightsFiltered[j].scale + "\n" + "\n" + "Thanks for your purchase");
                    purchased = 1;
                }
            
            }
    
            if (purchased == 0){
                console.log("\n" + "ID not found!" + "\n" + "\n");
            }
        }else{
            console.log("\n" + "Purchase canceled" + "\n" + "\n");
            purchased = 1;
        }
        
    }

}

function createFlights(){

    var newFlight = {}
    
    if(flights.length < 15){
        var i = flights.length + 1;
        var newId = 0;

        while(newId == 0){
            var entry = prompt("To create a new flight, first enter the flight ID:");
        newId = flightEntryNum(entry);
        for (var j = 0; j < flights.length; j++){
            if(newId == flights[j].id){
                newId = 0;
                console.log("The ID you entered already exists! please, enter a new ID");
            }
        }
        }
        console.log("\n" + 'Entered ID is:' + newId + "\n" + "\n");
        newFlight.id = newId;
        
        entry = prompt("Now, enter the flight Destination:");
        var newDest = flightEntryStr(entry);
        console.log("\n" + 'Entered Destination is:' + newDest + "\n" + "\n");
        newFlight.to = newDest;

        entry = prompt("Now, enter the flight Origin:");
        var newOrig = flightEntryStr(entry);
        console.log("\n" + 'Entered Origin is:' + newOrig + "\n" + "\n");
        newFlight.from = newOrig;

        entry = prompt("Now, enter the cost of the flight :");
        var newCost = flightEntryNum(entry);
        console.log("\n" + 'Entered Destination is:' + newCost + "\n" + "\n");
        newFlight.cost = newCost;

        entry = prompt("finally, enter 'Y' if the flight has scale or 'N' if the flight doesn't have scale:");
        if (entry != null){
            entry = entry.toUpperCase();
        }
        
        var newScale = false
        while(entry != 'Y' && entry != 'N'){
            entry = prompt("You must enter 'Y' if the flight has scale or 'N' if the flight doesn't have scale:");
            if (entry != null){
                entry = entry.toUpperCase();
            }
        }
        switch(entry){
            case 'Y': 
                newScale = true;
                break;
            default :
                break;
        }
        console.log("\n" + 'you entered Scale = ' + newScale + "\n" + "\n");
        newFlight.scale = newScale;
        
        flights.push(newFlight);
        availableFlights();

    } else{
        console.log("\n" + "there are 15 flight entries created, please delete one entry before creating another" + "\n" + "\n");
    }
}

function deleteFlights(){

    var deleteFlightId = prompt("Please, enter the flight ID you wish to delete");
    if (deleteFlightId !== null){
        deleteFlightId = Number.parseFloat(deleteFlightId);
    }

    while(deleteFlightId == null || Number.isNaN(deleteFlightId) || deleteFlightId == '' || deleteFlightId == ' '){
        deleteFlightId = prompt('ERROR! You must enter a number.');
        if (deleteFlightId !== null){
            deleteFlightId = Number.parseFloat(deleteFlightId);
        }
    }

    var deleteFlightPos = flights.findIndex(array => array.id == deleteFlightId);
    if(deleteFlightPos == -1){
        console.log("\n" + "Flight ID not found!" + "\n" + "\n");
    } else{
        flights.splice(deleteFlightPos, 1);
        console.log("\n" + "Flight with ID:" + deleteFlightId + " deleted." + "\n" + "\n");
        availableFlights();    
    }
}

function flightEntryNum(entry){
        
    if (entry !== null){
    entry = Number.parseFloat(entry);
    }

    while(entry == null || Number.isNaN(entry) || entry == '' || entry == ' '){
        entry = prompt("ERROR! You must enter a number.");
        if (entry !== null){
            entry = Number.parseFloat(entry);
        }
    }

    return entry;
}

function flightEntryStr(entry){

    while(entry == null || entry == '' || entry == ' '){
        entry = prompt("ERROR! You must enter something:")
    }
    return entry;
}

Aerolinea();
