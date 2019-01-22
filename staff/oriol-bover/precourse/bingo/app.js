//ask user
function askUser(){
  //first enter user
  var name = prompt("Please enter your name");
  if (name != null) {
   user = new User(name);
   document.getElementById("title").innerHTML = "Hello " + user.name;
  }
}

//init user
function User(name){
  this.name = name;
  this.points = 0;
}

//init array users
var users = [];

//init card
function Card(id, number, matched){
  this.id = id;
  this.number = number;
  this.matched = matched;
}

//init bingo
function Bingo(){
    //properties
    this.turn = 0;
    this.line = false;
    this.bonusLine = false;
    this.used_numbers = [];
    this.bingoCard = [];

    //methods
    this.initCard = function(){
        var i = 0;
        var card_numbers = [];

        while ( i!= 15){
            var card_number = Math.floor(Math.random() * 100) + 1 ;

            //check if the new number is already into the card
            if(!card_numbers.includes(card_number)){

              //push the new number into the array
              card_numbers.push(card_number);

              //create new card number
              this.bingoCard.push(new Card( i+1, card_number, false));

              //set all numbers
              document.getElementById("card_"+ this.bingoCard[i].id).innerHTML = "<b>"+this.bingoCard[i].number+"</b>";
              i++;                  
            }
        }
    }

    this.generateNumber = function(){
        var number = Math.floor(Math.random() * 100) + 1;

        if(this.used_numbers.includes(number)){
            this.generateNumber();
        }else{
            var number_element = document.getElementById("selected-number");

            //check if visible the element
            if(number_element.hasAttribute("hidden")){
                number_element.removeAttribute("hidden");
            }

            number_element.innerHTML = "<span>"+number+"</span>"

            this.bingoCard.forEach(function(card){
                if(card.number == number){
                    document.getElementById("card_"+ card.id).classList.add("is-selected");
                }
            });

            this.turn ++;
            document.getElementById("turn").innerHTML = "Turn: " + this.turn;

            //join number to array
            this.used_numbers.push(number);

            //check line
            if(this.checkLine()){
              this.line = true;
              document.getElementById('line-modal').classList.add('is-active');
              if(this.turn <= 50){
                this.bonusLine = true;
              }
            }

            //check if the game  is finisihed
            if(this.checkComplete()){
              document.getElementById("end_game").classList.add("is-active");
            }
        }
    }

    this.checkLine = function(){
      if(!this.line){

        //get cells
        var cells1 = document.getElementById("line1").cells
        var cells2 = document.getElementById("line2").cells
        var cells3 = document.getElementById("line3").cells
        
        var c1_count = 0;
        for (let c1 = 0; c1 < cells1.length; c1++) {
          if(cells1[c1].classList.contains("is-selected")){
            c1_count ++;
          }
        }

        var c2_count = 0;
        for (let c2 = 0; c2 < cells2.length; c2++) {
          if(cells2[c2].classList.contains("is-selected")){
            c2_count ++;
          }
        }

        var c3_count = 0;
        for (let c3 = 0; c3 < cells3.length; c3++) {
          if(cells3[c3].classList.contains("is-selected")){
            c3_count ++;
          }
        }
        
        if(c1_count == cells1.length || c2_count == cells2.length || c3_count == cells3.length){
          return true;
        }
      }

      return false;
    }

    this.checkComplete = function(){
      //get all bingo numbers
      var td = document.getElementsByClassName("bingo-number");

      //get all elements selected
      var elements_selected = document.getElementsByClassName("is-selected");

      if(elements_selected.length == td.length){
        return true;
      }else{
        return false;
      }
    }
}

//initGame
function initGame(){
  document.getElementById("end_game").classList.remove("is-active");
  document.getElementById("selected-number").setAttribute("hidden","hidden");
  document.getElementById("turn").innerHTML = " ";

  td = document.getElementsByClassName("bingo-number");
  for (var i = 0; i < td.length; i++) {
      td[i].classList.remove("is-selected");
  }
  
  //save user
  user.points = (100 - bingo.turn ) * 10;
  bingo.bonusLine ? user.points += 50 : user.points += 25; 
  users.push(user);

  //init new user
  askUser();

  //restart bingo
  bingo.turn = 0;
  bingo.line = false;
  bingo.used_numbers = [];
  bingo.bingoCard = [];
  bingo.initCard();
  document.getElementById("next-number").setAttribute("hidden","hidden");
  setTimeout(function(){ document.getElementById("reload-card-modal").classList.add("is-active"); }, 3000);
}

//ranking function
function ranking(){

  var table_users = '';

  users.sort(function (a, b) {
    return b.points - a.points;
  });

  users.forEach(function(user){
    table_users +="<tr><td>"+user.name+"</td><td>"+user.points+"</td></tr>";
  });
  
  document.getElementById("ranking-body").innerHTML = table_users;
  document.getElementById("ranking-modal").classList.add("is-active");
}

//reload card function
function reload_card(){
  if (document.getElementById('no-cart').checked) {
    bingo.bingoCard = [];
    bingo.initCard();
    setTimeout(function(){ document.getElementById("reload-card-modal").classList.add("is-active"); }, 3000);
  }else{
    document.getElementById("next-number").removeAttribute("hidden");
  }
  
  document.getElementById("reload-card-modal").classList.remove("is-active");
}

askUser();
var bingo = new Bingo();
bingo.initCard();

//ask for another card
setTimeout(function(){ document.getElementById("reload-card-modal").classList.add("is-active"); }, 3000);