// Project 2 - Skylab Airlines
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

let user = prompt("What's your name?");
console.log(`Hello ${user}, nice to see you!`);

console.log('---');
console.log('For today we have: ');
for (let flight of flights) {
  console.log(`The flight with an origin from: ${flight.from} to destination ${flight.to}, costs ${flight.cost} ${flight.scale ? 'and has stopovers' : 'and no stopovers'}.`);
}

const average = flights.reduce((total, flight) => total + flight.cost, 0) / flights.length;
console.log('---');
console.log(`The average cost for today's flights is ${average}`);

console.log('---');
const scales = flights.filter(flight => flight.scale);
console.log(`There are ${scales.length} flights with scales`);

console.log('---');
const lastFlights = flights.slice(Math.max(flights.length - 5));
const lastFlightsDestination = lastFlights.map(flight => flight.to);

console.log(`The last flights for tonight are: ${lastFlightsDestination.join(', ')}`);
