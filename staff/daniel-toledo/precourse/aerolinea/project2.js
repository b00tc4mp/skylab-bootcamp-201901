//AEROLINEA - PRO

function aerolinea(){
    //Se preguntará por el nombre de usuario y dará la bienvenida.
    var name=prompt('Hola, Cual es su nombre?');
    var bienvenida= 'Hola, ' + name + '! Bienvenido a Skylab Airlaines. Aquí puedes observar todos los vuelos de hoy:';
    console.log(bienvenida);
    
    //El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
    var numScale=0
    for (var i=0; i<flights.length; i++){
        if (flights[i].scale===false){
            var scaleString = 'no realiza ninguna escala';
        }
        else{
            numScale++;
            var scaleString = 'realiza alguna escala';
        }
        console.log('El vuelo con origen: ' + flights[i].from + ', y destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + ' €, y ' + scaleString + '.');
    }

    //A continuación, el usuario verá el coste medio de los vuelos.
    var sum=0
    for (var i=0; i<flights.length; i++){
        var sum=sum+flights[i].cost;
    }
    var media=sum/flights.length;
    media = media.toFixed(2);
    console.log('El precio medio de nuestros vuelos es de: ' + media.toString() + '€.')

    //También podrá ver cuantos vuelos efectúan escalas.
    console.log('Tenemos ' + numScale.toString() + ' vuelos con escalas.')

    //Sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.
    var ultimoDia=flights[6].to;
    for (var i=7; i<flights.length; i++){
        if (i===flights.length-1){
            ultimoDia += ' y ' + flights[i].to;
        }
        else{
            ultimoDia += ', ' + flights[i].to;
        }
    }
    console.log('Nuestros ultimos destinos del dia son a: ' + ultimoDia);

//PRO!!! Después de ver toda la información el programa pedirá al usuario si es ADMIN/USER.

    function crearVuelo(){
        var newFlightId=prompt('Identificador del vuelo: ');
        newFlightId=Number(newFlightId)

        var newFlightTo=prompt('Destino del vuelo con id ' + newFlightId.toString() + ': ');
        var newFlightFrom=prompt('Origen del vuelo con id ' + newFlightId.toString() + ': ');
        
        var newFlightCost=prompt('Coste del vuelo con id ' + newFlightId.toString() + ': ');
        newFlightCost=Number(newFlightCost);
        
        var newFlightScale=prompt('El vuelo con id ' + newFlightId.toString() +' tiene escala? SI/NO')
            if (newFlightScale==='SI'){
                newFlightScale=true;
            }
            if (newFlightScale ==='NO'){
                newFlightScale=false;
            }
            /*else {
                newFlightScale=prompt('Porfavor respone SI o NO, en mayusculas')
            }*/

        var Newflights ={id:newFlightId, to:newFlightTo, from:newFlightFrom, cost:newFlightCost, scale:newFlightScale};
        flights.push(Newflights);
    }

    function borrarVuelo(){

        var idNum=prompt('Que vuelo querrías borrar, indicandonos su id?');
        idNum=Number(idNum);
        var resultado=[];
        for (var i=0; i<flights.length; i++){
            if (flights[i].id != idNum){
                resultado.push(flights[i])
            }
        }

        flights=resultado;

    }

    function amigable(list){

        for (var i=0; i<list.length; i++){
            if (list[i].scale===false){
                var scaleString = 'no realiza ninguna escala';
            }
            else{
                var scaleString = 'realiza alguna escala';
            }
            console.log('Con id = ' + list[i].id + '. El vuelo con origen: ' + list[i].from + ', y destino: ' + list[i].to + ' tiene un coste de ' + list[i].cost + '€, y ' + scaleString + '.');
        }
    }
   

    var admin=prompt(name + ', eres ADMIN/USER/SALIR?');
    admin=admin.toUpperCase();
  
//ADMIN

    if (admin === 'ADMIN'){
        
        var newDelate=prompt(name + ', que quieres hacer: CREAR/BORRAR/SALIR');
        newDelate=newDelate.toUpperCase();

    //Crear
        while (newDelate==='CREAR' || newDelate==='BORRAR'){
            
            if (newDelate==='CREAR'){

                if (flights.length<15){
                    
                    crearVuelo();
                    
                    newDelate=prompt('El vuelo fue creado, que quieres hacer: CREAR/BORRAR/SALIR');

                }

                else {
                    
                    alert('No puedes añadir mas de 15 vuelos por dia');
                    newDelate=prompt(name + ', que quieres hacer: CREAR/BORRAR/SALIR');
                }
            
            }

    //Borrar
            if (newDelate==='BORRAR'){
        
                borrarVuelo();

                newDelate=prompt('El vuelo fue borrado, que quieres hacer: CREAR/BORRAR/SALIR');
            }
        }

    //Salir
        if (newDelate==='SALIR'){

            console.log('Adios ' + name + ', hasta la proxima.')
        }

    }

//USER
        
    if (admin === 'USER'){
        precio=prompt('Buscar por precio: ');
        precio=Number(precio);
        barato=[];
        caro=[];
        igual=[];
        for (var i=0; i<flights.length; i++){
            if (precio>flights[i].cost){
                barato.push(flights[i]);
            }

            if (precio<flights[i].cost){
                caro.push(flights[i]);
            }

            if(precio===flights[i].cost){
                igual.push(flights[i]);
            }
        }

//Baratos
        if (barato.length!=0){
            console.log('Estos son los vuelos mas baratos de '+ precio.toString()+'€')
            amigable(barato);
         }
         else{
            console.log('No hay vuelos mas baratos de '+ precio.toString()+'€')
         }

//Caros
         if (caro.length!=0){
            console.log('Estos son los vuelos mas caros de '+ precio.toString()+'€')
            amigable(caro);
         }
         else{
            console.log('No hay vuelos mas caros de '+ precio.toString()+'€')
         }

//Iguales
        if (igual.length!=0){
            console.log('Estos son los vuelos iguales a '+ precio.toString()+'€')
            amigable(igual);
         }
         else{
            console.log('No hay ningun vuelo que cueste exactamente '+ precio.toString()+'€')
         }

//Comprar

     var comprar=prompt('Porfavor ' + name + ', selecciona el vuelo que desea comprar, indicandonos su id:')
        
        for (var i=0; i<flights.length; i++){
            
            if (flights[i].id===Number(comprar)){
                if (flights[i].scale===false){
                var scaleString = 'no realiza ninguna escala';
                }
                if (flights[i].scale===true){
                var scaleString = 'realiza alguna escala';
                }
               console.log('Usted a comprado el vuelo con origen: ' + flights[i].from + ', y destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + '€, y ' + scaleString + '.');
            }
        }
     console.log("Gracias por su compra, vuelva pronto.")

    }
//SALIR    

    if (admin==='SALIR'){

            console.log('Adios ' + name + ', hasta la proxima.')
     }


}



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
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false },
];

aerolinea()