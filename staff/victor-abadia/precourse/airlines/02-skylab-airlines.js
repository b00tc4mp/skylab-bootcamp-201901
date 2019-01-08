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

//console.log(flights[0]); //output: Bilbao

screen()

function welcome() {
    return prompt('Hello, what is your name?') //what's se podria escribir con what\'s - de esta manera no confunde la comilla simple con cierre u otro
}

function screen() {
    var name = welcome()
    if (name === '') {
        return screen()
    }
    console.log('Welcome ' + name)
    flights.forEach(function (flight) {
        console.log("El vuelo con origen " + flight.from + " y desitino " + flight.to + " tiene un coste de " + flight.cost + "€" + " y" + haveScale(flight.scale) + " realiza escala.");
    })
    
    media()
    totalScale()
    lastFlights()
}

function haveScale(scale) {
    if (scale) {
        return ''
    } else {
        return ' no'
    }

} 

function media(){
    var total = 0
    flights.forEach(function (flight){
    total += flight.cost
    })
    console.log('El coste total medio es de: ' + (total / flights.length).toFixed(2) + '€');
}

function totalScale(){
    var x = flights.filter(function (flight){
        return flight.scale === true
    })
    console.log('Hay ' + x.length + ' vuelos que hacen escala.')
}

function lastFlights(){
    var last = flights.slice(6,11)
    console.log('Los últimos ' + last.length + ' vuelos de hoy son:')
    last.forEach(function (flight) {
        console.log("vuelo con destino a "+ flight.to);
    })

}