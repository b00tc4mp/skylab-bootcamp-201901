let flights = [
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

function signIn (){

let passengerName = prompt("Please enter your username", "Username");
if (passengerName != null) {
    console.log("Hello " + passengerName + "! Welcome to Skylab Airlines! ");
    }
};

signIn();

function todaysFlights () {
    console.log("These are today's flights: ");
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].scale === false) {
        console.log(`The flight from ${flights[i].from} to ${flights[i].to} has a cost of ${flights[i].cost}€ and has no flight scales.` );
            } else {
            console.log(`The flight from ${flights[i].from} to ${flights[i].to} has a cost of ${flights[i].cost}€ and has flight scales.` );
        }
    }
};

todaysFlights();

function averageDailyRate () {
    let dailyRates = Number();
    for (let i = 0; i < flights.length; i++) {
        dailyRates += flights[i].cost;
    }
    console.log(`The average cost of today's flights is ${(dailyRates / flights.length).toFixed(2)}€.`);
};

averageDailyRate();

function scaleFlights () {
    console.log("These are today's flights with scales: ");
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].scale === true) {
        console.log(`The flight from ${flights[i].from} to ${flights[i].to}.` );
        } 
    }
};

scaleFlights();

function latestsFlights () {
    console.log("These are today's latest flights destinations: ");
    for (let i = flights.length-1; i >= 6; i--) {
        console.log(`${flights[i].to}.`);
    }
};

latestsFlights();


