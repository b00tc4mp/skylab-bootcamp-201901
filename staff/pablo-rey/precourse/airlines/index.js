let flights = [
  { id: 0, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
  { id: 1, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
  { id: 2, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
  { id: 3, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
  { id: 4, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
  { id: 5, to: 'London', from: 'Madrid', cost: 200, scale: false },
  { id: 6, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
  { id: 7, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
  { id: 8, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
  { id: 9, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
  { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false },
];

function showFlights(flightsToShow, hideStatistics) {
  console.log('ID|From         |To           |Cost |Scale');
  console.log('--|-------------|-------------|-----|-----');
  flightsToShow.forEach(flight => {
    console.log(
      `${flight.id.toString().padStart(2)}|${flight.from.padEnd(13)}|${flight.to.padEnd(13)}|${flight.cost.toString().padStart(4)}€|${flight.scale ? 'Yes' : 'No'}`,
    );
  });
  console.log('--|-------------|-------------|-----|-----');
  if (!hideStatistics) {
    const averageCost = Math.round(
      flightsToShow.reduce((acc, flight) => acc + flight.cost, 0) / flightsToShow.length,
    );
    console.log(`                 Average cost |${averageCost.toString().padStart(4)}€` + '|');
    const flightsWithScale = flightsToShow.filter(flight => flight.scale).length;
    console.log(`           Flights with scale |     |${flightsWithScale}`);
    console.log('------------------------------------------');
    console.log(
      `Last 5 destinations of day: ${flightsToShow
        .slice(flightsToShow.length - 5)
        .map(flight => flight.to)}`,
    );
  }
}

/*
 ** ADMIN
 */

function adminConsoleCreate() {
  const yesNoRegEx = /[y|n]+/i;
  let id = NaN;
  const from = prompt('from: ');
  const to = prompt('to: ');
  let cost = NaN;
  let scale = '?';
  do {
    if (Number.isNaN(id)) {
      id = parseInt(prompt('id: '));
      if (flights.filter(flight => flight.id === id).length !== 0) {
        console.log(`id: ${id} is in use. You can't use it`);
        id = NaN;
      }
    }
    if (Number.isNaN(cost)) {
      cost = parseInt(prompt('cost: '));
    }
    if (!yesNoRegEx.test(scale)) {
      scale = prompt('scale (y/n): ');
    }
  } while (Number.isNaN(id) || Number.isNaN(cost) || !yesNoRegEx.test(scale));
  scale = scale.toLowerCase() === 'y';
  const flight = {
    id,
    from,
    to,
    cost,
    scale,
  };
  flights.push(flight);
  console.log('Record created');
  showFlights([flight], true);
}

function adminConsoleDelete() {
  const id = parseInt(prompt('insert flight id to delete: '));
  const index = flights.findIndex(flight => flight.id === id);
  if (index === -1) {
    alert('id not found. No deleted record');
  } else {
    showFlights([flights[index]], true);
    console.log('This record has been deleted');
    flights = [...flights.slice(0, index), ...flights.slice(index + 1)];
  }
}

function adminConsole() {
  let input;
  do {
    input = prompt(
      flights.length < 15 ? 'admin> (create/delete/list/quit)' : 'admin> (delete/list/quit)',
    );
    input = input !== null ? input.toLowerCase() : 'quit';
    switch (input) {
      case 'create':
        if (flights.length >= 15) {
          alert('You have reached max flight records');
        } else {
          adminConsoleCreate();
        }
        break;
      case 'delete':
        adminConsoleDelete();
        break;
      case 'list':
        showFlights(flights);
        break;
      case 'quit':
        break;
      default:
        alert('Please choose create, delete, list or quit.');
        break;
    }
  } while (input !== 'quit');
}

/*
 ** USER
 */

function userConsoleSearch() {
  let input;
  do {
    input = prompt('Cost condition (ex: >500, <400, =300 / quit)');
    if (input.toLowerCase() !== 'quit') {
      const price = parseInt(input.substring(1));
      if (Number.isNaN(price)) {
        alert('The price is not a number.');
      } else {
        let selectedFlights;
        switch (input[0]) {
          case '<':
            selectedFlights = flights.filter(flight => flight.cost < price);
            break;
          case '>':
            selectedFlights = flights.filter(flight => flight.cost > price);
            break;
          case '=':
            selectedFlights = flights.filter(flight => flight.cost === price);
            break;
          default:
            alert('You can use only <, > or =.');
            break;
        }
        if (selectedFlights != null) {
          input = 'quit';
          if (selectedFlights.length === 0) {
            console.log('No matches');
          } else {
            showFlights(selectedFlights, true);
          }
        }
      }
    }
  } while (input.toLowerCase !== 'quit');
}

function userConsoleBuy() {
  const id = parseInt(prompt('insert flight id to buy: '));
  const index = flights.findIndex(flight => flight.id === id);
  if (index === -1) {
    alert('id not found.');
    return false;
  }
  console.log('Gracias por su compra, vuelva pronto.');
  return true;
}

function userConsole() {
  let input;
  do {
    input = prompt('user> (search/buy/list/quit)');
    input = input !== null ? input.toLowerCase() : 'quit';
    switch (input) {
      case 'search':
        userConsoleSearch();
        break;
      case 'buy':
        userConsoleBuy();
        break;
      case 'list':
        showFlights(flights);
        break;
      case 'quit':
        break;
      default:
        alert('Please choose search, buy, list or quit.');
        break;
    }
  } while (input !== 'quit');
}

// MAIN

const userName = prompt('Username: ');
console.log(`Hello ${userName} \n`);

showFlights(flights);

let role;
do {
  role = prompt("What's your role? (ADMIN/USER/QUIT)");
  role = role ? role.toUpperCase() : 'QUIT';
} while (!/^ADMIN|USER|QUIT$/i.test(role));

if (role === 'ADMIN') {
  adminConsole();
} else if (role === 'USER') {
  userConsole();
}
console.log(`Bye ${userName}`);
