
var flights = [
    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];

const maxFlights = 15;

function skylabAirlines() {
    var userName = "";
    userName =  prompt("Please, enter your user name: ", "");
    if (userName == null || userName == "") {
        console.log ("\nBye, see you soon.");
    }
    else {
        console.log(`\nHello ${userName}`);
        console.log('\nThese are our fligths for today: ');
        printFlights(flights,true);
        var flightAverage = computeFlightAverage();
        console.log(`\nThe average cost of flights is ${flightAverage.toFixed(2)}€`);
        console.log('\nThese fligths make a stopover: ');
        var flightsWithStopover = flights.filter(flight => flight.scale);
        printFlights(flightsWithStopover,false);
        var numLastFlights = 5;
        console.log(`\nThese flights are the last ${numLastFlights} of the day: `);
        var lastFlights = lastNFlights(numLastFlights);
        printFlights(lastFlights,true);
        var typeOfUser = "";
        typeOfUser = prompt("Are you ADMIN or USER?  ", "");
        if (typeOfUser == null || typeOfUser == "") {
            console.log (`\nBye ${userName}, see you soon.`);
        }
        else {
            switch (typeOfUser.toUpperCase()) {
                case "ADMIN" :
                    adminOption(userName);
                    break;
                case "USER" :
                    userOption(userName);
                    break;
                default:
                    console.log("\nYou have entered an incorrect user type!");
                    console.log (`\nBye ${userName}, see you soon.`);
                    break;
            };
        };
    };
};



function lastNFlights(numLastFlights) {
    var lastFlights = [];
    for (var i = (flights.length - numLastFlights); i < flights.length; i++) {
        lastFlights.push(flights[i])
    };
    return lastFlights;
};

function printFlights(arrayflights,printScale) {
    arrayflights.forEach (flight => {
        printOneFlight(flight,printScale);
    });
};

function printOneFlight(flight,printScale) {
    console.log(`  The flight (ID) ${flight.id} with origin: ${flight.from} and destination: ${flight.to} has a cost of ${flight.cost}€ ` +
                (printScale ? (flight.scale ? "and makes a stopover." : "and does not make any stopover.") : "" )
                );
};


function computeFlightAverage() {
    var sumCost = 0;
    flights.forEach (flight => {
        sumCost += flight.cost;
    });
    return sumCost / flights.length;
};


function adminOption(userName) {
   var repeat = true;
   var adminOperation = "";
   while (repeat) {
        adminOperation = prompt("What operation do you want to do?\nCreate or delete a flight? C/D", "");
       if (adminOperation == null || adminOperation == "") {
           console.log (`\nBye ${userName}, see you soon.`);
           repeat = false;
       }
       else {
            switch (adminOperation.toUpperCase()) {
                case "C" :
                    createOption();
                    break;
                case "D" :
                    deleteOption();
                    break;
                default:
                    window.alert("You have entered an incorrect operation");
                    break;
            };
        };
   };
};


function createOption() {
   var flightTo = "";
   var flightFrom = "";
   var flightCost = 0;
   var flightScale = true;
   if (flights.length >= maxFlights) {
       window.alert("Maximum number of flights achieved. Can not create more.");
   } else {
        flightFrom = prompt("Enter the origin of the flight: ", "");
        if (flightFrom == null || flightFrom == "") {
            window.alert("You have entered an incorrect origen.");
        } else {
            flightTo = prompt("Enter the destination of the flight: ", "");
            if (flightTo == null || flightTo == "") {
                window.alert("You have entered an incorrect destination.");
            } else {
                flightCost = prompt("Enter the cost of the flight: ", "");
                if (flightCost == null || flightCost == "") {
                    window.alert("You have entered an incorrect cost.");
                } else {
                    if (isNaN(flightCost)) {
                        window.alert("You have entered an incorrect cost.");
                    } else {
                        flightScale = prompt("Flight with scale? (Y/N)", "");
                        if (flightScale == null || flightScale == "") {
                          window.alert("Value for scale is Y (yes) or N (no)");
                        } else {
                            if (flightScale.toUpperCase() !== "Y" && flightScale.toUpperCase() !== "N") {
                                window.alert("Value for scale must be Y (yes) or N (no)");
                            } else {
                                insertFlight(flights[flights.length - 1].id + 1,
                                             flightTo,
                                             flightFrom,
                                             Number(flightCost),
                                             (flightScale.toUpperCase() === "Y" ? true : false)
                                            );
                                console.log("\nThe flight has been created.\n");
                                printOneFlight(flights[flights.length - 1],true);
                            };
                        };
                    };
                };
            };
        };
   };
};

function insertFlight(flightsId, flightTo, flightFrom, flightCost, flightScale) {
    var newFlight = { id: 00, to: 'Origin', from: 'Destination', cost: 0, scale: false };
    newFlight.id = flightsId;
    newFlight.to = flightTo;
    newFlight.from = flightFrom;
    newFlight.cost = flightCost;
    newFlight.scale = flightScale
    flights.push(newFlight);
};

function deleteOption() {
    var idFlight = prompt("\nEnter the ID of the flight you want to delete: ", "");
    if (idFlight == null || idFlight == "") {
        window.alert("Elimination of the flight cancelled.");
    }
    else {
        if (isNaN(idFlight)) {
            window.alert("The ID flight is not a number.");
        } else {
            var flightIndex = searchFlightById(flights,Number(idFlight));
            if (flightIndex == 0) {
                window.alert("Flight not found.");
            } else {
                printOneFlight(flights[flightIndex],true);
                if (window.confirm("Do you want to delete this flight?")) {
                    deleteFlight(flightIndex);
                } else {
                    window.alert("Elimination of the flight cancelled.");
                };
            };
        };
    };
};



function searchFlightById(arrayFlights, idFlight) {
    var flightIndex = 0;
    while (flightIndex < arrayFlights.length && arrayFlights[flightIndex].id !== idFlight) {
        flightIndex ++;
    };
    if (flightIndex == arrayFlights.length) {
        flightIndex = 0
    };
    return flightIndex;
};


function deleteFlight(flightIndex) {
    flights.splice(flightIndex, 1);
};


function userOption(userName) {
    var costSearch = prompt("SEARCH FLIGHTS BY COST\nEnter the cost: ","");
    if (costSearch == null || costSearch == "") {
        window.alert("You have entered an incorrect cost.");
    } else {
        if (isNaN(costSearch)) {
            window.alert("You have entered an incorrect cost.");
        }
        else {
            var conditionSearch = prompt("Enter the condition:\n" +
                                         "  1   less than cost\n" +
                                         "  2   greater than cost\n" +
                                         "  3   equal to cost","");
            if (conditionSearch == null || conditionSearch == "") {
                window.alert("You have entered an incorrect condition for the search.");
            } else {
                var conditionFunc;
                switch (conditionSearch) {
                    case "1":
                        conditionFunc = (flightCost, referenceCost ) => flightCost < referenceCost;
                        break;
                    case "2":
                        conditionFunc = (flightCost, referenceCost) => flightCost > referenceCost;
                        break;
                    case "3":
                        conditionFunc = (flightCost, referenceCost) => flightCost == referenceCost;
                        break;
                    default:
                        window.alert("You have entered an incorrect condition for the search.");
                        return;
                }
                var flightsSearch = searchByCost(Number(costSearch),conditionFunc);
                console.log("\nThis is the result of the search: ");
                printFlights(flightsSearch,true);
                var idFlight = prompt("\nEnter the ID for the flight you want to book: ", "");
                if (idFlight == null || idFlight == "") {
                    window.alert("Booking cancelled.");
                } else {
                    if (isNaN(idFlight)) {
                        window.alert("The ID flight is not a number.");
                    } else {
                        var flightIndex = searchFlightById(flightsSearch, Number(idFlight));
                        if (flightIndex == 0) {
                            window.alert("Flight not found.");
                        } else {
                            console.log("\nThank you for booking: ");
                            printOneFlight(flightsSearch[flightIndex],true);
                            console.log("\nSee you soon!");
                        };
                    };
                };
            };
        };
    };
};


function searchByCost(referenceCost, filterFuntion) {
    return flights.filter(flight => filterFuntion(flight.cost, referenceCost));
};


skylabAirlines();
