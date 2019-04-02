
   
   //Se preguntará por el nombre de usuario y dará la bienvenida.
    //El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
    //A continuación, el usuario verá el coste medio de los vuelos.
    //También podrá ver cuantos vuelos efectúan escalas.
    //Sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.


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
  var avPrice=0;
  var flightScale =[];
  var lastFlights =[];
  var dayFlights =[];

Welcome();
avCost();
lastDestinations();
yesScales();
flightsOfDay();
userAlert();
  
function Welcome(){//mensaje de bienvenida
  alert('This is SkylabArilines');
    var name = prompt('Whats your name?');
    alert('Welcome '+name);
}

function avCost(){//calcula el coste medio de todos los billetes
  flights.forEach(function(obj){
  avPrice += obj.cost;
  })
  avPrice = avPrice/11;
  avPrice = Number(avPrice.toFixed(2));
}

function lastDestinations(){//los destinos de los ultimos 5 vuelos
  
  flights.forEach(function(obj){
  if(obj.id > 5 ){
    lastFlights.push(obj.to);
  }
})
lastFlights = lastFlights.join(" \n ");
}

function yesScales(){// que vuelos tienen escala

  flights.forEach(function(obj){
       
       if(obj.scale === true){
          flightScale.push('The flight from:',obj.from,'with destination to:',obj.to);
          obj.scale ='YES';
        }
        
        else if(obj.scale === false){
           obj.scale ='NO';
        }
  }
  )
  flightScale = flightScale.join('\n ');
}
 
  function flightsOfDay(){// todos los vuelos del dia
    flights.forEach(function(obj){
      dayFlights.push('The flight from:',obj.from,'with destination to:',obj.to,'has scale status:',obj.scale,'at price of :',obj.cost,'euros');
    })
    dayFlights = dayFlights.join('\n ');
    }

function userAlert(){//muestra los mensajes con los datos al usuario
  alert('These are the flights of the day:\n '+dayFlights);
  alert('This is the average price of all flights:\n '+avPrice+'Euros');
  alert('These are the flights with scales:\n '+flightScale);
  alert('These are the last destinations of the day:\n '+lastFlights);
}

    
    
    
  
 
 
