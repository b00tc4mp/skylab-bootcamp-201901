//user
var user = {
            name: '',
            admin: false
        }
  
 //flights
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

//load function
flightsTable(flights);

//ask name
    var name = prompt("Please enter your name");
    if (name != null) {
        user.name = name;
        document.getElementById("name").innerHTML = user.name;
    }



//flights table function
function flightsTable(flights_data){
    var flights_table = '';
    var scale_number = 0;
    var total = 0;


    flights_data.forEach(function(flight){
        var scale = (flight.scale) ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>';
        flights_table += '<tr><td>'+flight.id+'</td><td>'+flight.to+'</td><td>'+flight.from+'</td><td>'+flight.cost+' <i class="fas fa-euro-sign"></i></td><td>'+scale+'</td>';
        
        //admin control
        if(user.admin){
            flights_table += '<td><a href="javascript:{}" onclick="delete_flight('+flight.id+')"><i class="fas fa-trash-alt"></i></a></td></tr>';
        }
        
        
        //resume
        total += flight.cost;

        //scales
        if(flight.scale){
            scale_number += 1;
        }
    });

    document.getElementById("flight_register").innerHTML = flights_table;
    document.getElementById("scales").innerHTML = 'There are ' + scale_number.toString() + ' flights with scale';
    document.getElementById("resume").innerHTML = 'The total cost is ' + total.toString() + ' <i class="fas fa-euro-sign"></i>';
}


//activate admin modal
document.getElementById("admin_modal").classList.add("is-active");


//remove modal
function removeModal(){
    document.getElementById("add_flight_modal").classList.remove("is-active");
}

//set user role

 function set_role(){
     var section = document.getElementById('role_section');
     
    if (document.getElementById('admin_check').checked) {
        user.admin = true;
        var tr = document.getElementById('table').tHead.children[0], th = document.createElement('th');
            tr.appendChild(th);

        section.innerHTML = '<a class="button is-dark" onclick="add_flight_modal()">Add flight</a>';
    }else{
        section.innerHTML = `<div class="columns">
           <div class="column">
                <div class="control has-icons-left has-icons-right">
                    <input class="input" type="text" id="search_input" placeholder="Search"onkeyup="searchPrice()">
                    <span class="icon is-small is-left"><i class="fas fa-search"></i></span>
                </div>
           </div>
           <div class="column">
                <div class="control">
                    <div class="select">
                        <select id="select_search">
                            <option value="1">Bigger than..</option>
                            <option value="2">Equal</option>
                            <option value="3">Lower than..</option>
                        </select>
                    </div>
                </div>
           </div>
        </div>`;
    }

    flightsTable(flights);
    document.getElementById("admin_modal").classList.remove("is-active");
 }

//show modal add flight
function add_flight_modal(){
    document.getElementById('add_flight_modal').classList.add("is-active");
}

//add flight
function add_flight(){
    var flight = {
        id: (flights.length > 0) ?  flights[flights.length - 1].id + 1 : 0,
        to: document.getElementById('departure').value,
        from: document.getElementById('arrival').value,
        cost: isNaN(document.getElementById('cost').value) ? '' : parseInt(document.getElementById('cost').value),
        scale: document.getElementById('yes_scale').checked,
    }

    flights.push(flight);
    flightsTable(flights);
    document.getElementById("add_flight_modal").classList.remove("is-active");
}

//delete flight
function delete_flight(flight_id){
    for (let index = 0; index < flights.length; index++) {
        if(flights[index].id == flight_id){
            flights.splice(index,1);
        } 
    }

    flightsTable(flights);
}

//function search price
function searchPrice(){
   if(!isNaN(document.getElementById("search_input").value) && document.getElementById("search_input").value != ""){
         var filter_flights =  flights.filter(function(flight){
             console.log(document.getElementById("select_search").value);
             switch (parseInt(document.getElementById("select_search").value)) {
                case 1:
                    return flight.cost >= parseInt(document.getElementById("search_input").value);
                     break;
                case 2:
                    return flight.cost == parseInt(document.getElementById("search_input").value); 
                     break;
                case 3:
                    return flight.cost <= parseInt(document.getElementById("search_input").value);
                     break;
             }
        });
        
        console.log(filter_flights);
        flightsTable(filter_flights); 
   }else{
       flightsTable(flights);
   }
}