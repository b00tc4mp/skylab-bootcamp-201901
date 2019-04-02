
function flightsDisplay(flights,name){
    var average = flightsws = 0;
    var modal = "Greetings "+name+"! this is the list of Flights avaible for today: \n\n";
    for(var i = 0; i<flights.length;i++){
        modal += "to: "+ flights[i].to+" from: "+flights[i].from+"  | Price: "+flights[i].cost;
        (flights[i].scale)? (modal+=" With scale/s \n",flightsws++) : modal+=" No scale \n"  ;
        average += flights[i].cost;
        if((flights.length-i)===5){
            modal += "LAST FLIGHTS: \n\n";
        };
    }
    modal+= "\n Average price for today is: "+(average/flights.length).toFixed(3)+"\n Flights with Scales: "+flightsws;
    return modal;
}
function dataHandler(flights) {
    var modal = "";
    for(var i = 0; i<flights.length;i++){
        modal +="ID: "+flights[i].id+" to: "+ flights[i].to+" from: "+flights[i].from+"  | Price: "+flights[i].cost;
        (flights[i].scale)? (modal+=" With scale/s \n",flightsws++) : modal+=" No scale \n";
    }
    return modal;
}
function admin(name,flights) {
    var loop = true;
    var op , todo;
    var newflight = [
        { id: 00, to: '', from: '', cost: 0, scale: false };
    ]
    while(loop){
        op=prompt("Hi Admin "+name+" you can modify the DB with the following commands\n\n - 'create' : you cand add more flights to DB \n - 'delete' : you can errase flights from DB \n - 'exit : exit application ");
        if(op==="create"){
            if(flights.length <= 15){
                newflight.id=flights.length;
                newflight.to=prompt("Insert departure");
                newflight.from=prompt("Insert destination");
                newflight.cost=prompt("Insert price").toString();
                newflight.scale=confirm("Have scales?");
                flights.push(newflight);
                alert("flight added Successfully! \n"+dataHandler(flights));
            }else{
                alert("Max quantity of Flights allowed are 15!")
            }
            
        }
        if(op==="delete"){
            if(flights.length > 0){
                todo=prompt("Insert ID of the Flight that will be erased");
                flights=flights.filter(flight => (flight.id).toString() !== todo);
                alert("flight erased Successfully!\n"+dataHandler(flights));
            }
            else{
                alert("Flights list is Empty!");
            }
        }
        if(op==="exit"){
            alert("See ya admin "+name+"!");
            return 0;
        }    
    }
}
function user(name,flights){
    op=prompt("Hi "+name+" before buy, you can see again our Flights sorted, please type one of the following commands\n\n - 'most': to see flightlist sorted from the most expensive\n - 'less': to see flightlist sorted from the cheapest\n - 'search' : to search flights with a especific price"); 
    sorted=flights; 
    if(op==="most"){
        sorted.sort(function(a, b){return b.cost - a.cost});
    }
    if(op==="less"){
        sorted.sort(function(a, b){return a.cost - b.cost});
    }
    if(op==="search"){
        todo=prompt("Insert a price to search");
        sorted=sorted.filter(flight => (flight.cost).toString() === todo);
        if(sorted.length<=0){
            alert("Sorry! we dont have results :(, here is our flights list");
            sorted=flights;
        }
    }
    var buy,find;
    while(true){
        buy=prompt(dataHandler(sorted)+"\n To buy, Please type ID of your desired flight");
        find=sorted.filter(flight => (flight.id).toString() === buy);
        if(find.length>0){
            alert("Thank You for Buy!, Enjoy your Travel!");
            return buy;
        }
        else{
            alert("Sorry! we cant find a flight with that id :(");
            find=sorted;
        }
    }
}
function skylabAirlines() {
    var name;
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
    name=prompt("Welcome to SkylabAirlines Service, What's your name?");
    confirm(flightsDisplay(flights,name));
    if(prompt("If youre admin, please type 'ADMIN', if not type a key to continue as a user")==='ADMIN'){
        admin(name,flights);
    }else{
        userBuy=user(name,flights);
    }
    return 0;
}
skylabAirlines();