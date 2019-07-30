//Skylab Airlines!

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
function airlines(){
   let userName=askUserName();
   alert(`Hi ${userName}, \nWelcome to Skylab Airlines! \nPlease see the flights recommended for you.`);
   console.log(`*`.repeat(87));
   showFlights(flights);
   console.log(`*`.repeat(87));
   let avg=average();
   console.log(`The average of our flights is ${avg}€  `);
   console.log(`*`.repeat(87));
   withStop();
   console.log(`*`.repeat(87));
   console.log('Last flights of the day are:');
   lastFlights();
   let prof=askProfileUser();
}

function withStop(){
    
    for(let i=0;i<flights.length; i++){
       
        if(flights[i].scale==true){
       
        console.log(`The next flight has scales --> Fligth: ${flights[i].id} from ${flights[i].from} to ${flights[i].to} `);
        }
      
    }
    return
}

function average(){
    let sum=0;
    for(let i=0;i<flights.length; i++){
       
       sum+= flights[i].cost;
    }
    return Math.floor(sum/flights.length);
}

function showFlights(flightList){

    for(let i=0;i<flightList.length; i++){
        let scale='';
        if(flightList[i].scale==true){
        scale='has stops'
        }else{
        scale="has no stops.";    
        }
        console.log(`The flight id ${flightList[i].id} from ${flightList[i].from} to ${flightList[i].to} costs ${flightList[i].cost}€ and ${scale}`);
    }
    return
}
function askUserName(){
        let count=0;
        var name=prompt('Could you tell us your name,please?');
        for (let i=0; i<name.length;i++){
            count+= 1;
            if (name[i]==" "){
            break;
            }
        }
        let firstname=name.slice(0,count);

        return firstname;

}
function lastFlights(){

    let lastFlights=flights.slice(6,10);

    for(let i=0;i<lastFlights.length; i++){
        console.log(`To ${lastFlights[i].to}`);
    }
    return
}
function askProfileUser(){

    let profile=prompt('Please tell us if you are ADMIN or USER');
    if(profile.toLowerCase() === 'admin') {
        showOptionsAdmin();
    }else if(profile.toLowerCase() === 'user'){
        showOptionsUser();
    }else{
        alert('Sorry, we have not recognized your profile.')
        askProfileUser();
    }
    return
}

function showOptionsAdmin(){

    let option=prompt('What do you want to do? INSERT or DELETE flights');

    if (option=='INSERT'|| option=='Insert'|| option=='insert'){
        if(flights.length<15){
            insertFlight();
        }else{
            alert('You cannot enter new flights.');
        }
        
        showOptionsAdmin();
    }else if(option=='DELETE'|| option =='Delete'|| option=='delete'){
        let flightId=prompt('Please, tell us the flight ID');
        deleteFlight(flightId);
        showFlights(flights);
        showOptionsAdmin();
    }else if(option==null){
        alert('Bye')
    }else{
        alert('Sorry, we have not recognized your option.');
        showOptionsAdmin();
    }
    return
}
function deleteFlight(idFl){
   
    if(flights.length>0){ 
    let flag=true;
    for(let i=0;i<flights.length; i++){
         
         if(flights[i].id==idFl){
             alert(`You have just deleted ${flights[i].id}`);
             flights.splice(i, 1);
             flag=false;
         }
         
     }
     if (flag==true){
         alert(`Sorry we have not found the flight with ID ${idFl}`)
     }
 } else{
     alert('All flights have been deleted')
 }
     return
 }

function insertFlight(){
    
    let idNew=prompt('Id:');
    flights.forEach(function(obj){
        if(obj.id==idNew){
            alert(`Id ${idNew} already exists or it is incorrect, please try again`);
            idNew=prompt('Id:'); 
        }
     }); 
    let toNew=prompt('To:');
    let fromNew=prompt('From:');
    let costNew=prompt('Cost:');
    if(isNaN(costNew)){
        alert('This parameter is incorrect, please try again');
        costNew=prompt('Cost:');
    }
    let scaleNew=prompt('scale: True or False');
    let newFlight={id: parseInt(idNew), to: toNew, from: fromNew, cost: parseFloat(costNew), scale: Boolean(scaleNew)}
    alert(`You have entered flight id ${idNew} from ${fromNew} to ${toNew} costs ${costNew}€ and ${scaleNew}`);
    flights.push(newFlight);
    console.log(flights);
   
    return
}

function showOptionsUser(){
    let option=prompt('Compare and find your flight tickets \nSelect an option: LOWER prices, HIGHER prices, EQUAL prices');
    
    if (option=='LOWER'|| option=='Lower'|| option=='lower'){
        let lower=prompt('Are you looking for a flight with a price lower than...?');
        const lowerThan = flights.filter(flights => flights.cost < lower);
        if (lowerThan.length>0){
        console.log(`***************************************************************************************`);
        console.log('Results:');
        showFlights(lowerThan);
        let flightLSelected=prompt('Pick a flight, write the id');
        alert('Thanks for choosing our airline, see you soon');
        }else{
            alert('No results');
            showOptionsUser();
        }
        
    }else if(option=='HIGHER'|| option =='Higher'|| option=='higher'){
        let higher=prompt('Are you looking for a flight with a price higher than...?');
        const higherThan = flights.filter(flights => flights.cost > higher);
        if (higherThan.length>0){
        console.log(`***************************************************************************************`);
        console.log('Results:');
        showFlights(higherThan);
        let flightHSelected=prompt('Pick a flight, write the id');
        alert('Thanks for choosing our airline, see you soon');
        }else{
            alert('No results');
            showOptionsUser();
        }
    }else if(option=='EQUAL'|| option =='Equal'|| option=='equal'){
        let equal=prompt('Are you looking for a flight with a price equal to...?');
        const equalTo = flights.filter(flights => flights.cost == equal);
        if(equalTo.length>0){
        console.log(`***************************************************************************************`);
        console.log('Results:');
        showFlights(equalTo);
        let flightESelected=prompt('Pick a flight, write the id');
        alert('Thanks for choosing our airline, see you soon');
        }else{
            alert('No results');
            showOptionsUser(); 
        }
    }else if(option==null){
        alert('Bye')
    }else{
        alert('Sorry, we have not recognized your option.');
        showOptionsUser();
    }
    return
}



airlines()
