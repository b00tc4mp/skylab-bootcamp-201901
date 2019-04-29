
var bingoCard = [
  { number: 1 },
  { number: 7 },
  { number: 8 },
  { number: 9 },
  { number: 3 },
 
];
let bombo = [1,2,3,4,5,6,7,8,9,10];


function getRandom(){
  var indexBombo = Math.floor(Math.random()* bombo.length)
  numRandom = bombo[indexBombo]
  bombo.splice(indexBombo,1)
}

function askTurn(){
  return confirm('Vols seguir jugant?')     
}

function newTurn(numRandom){
  
  let card = []
  bingoCard.forEach(function(element){
    if(element.number === numRandom){
      element.number = 'X'
       
    }  
     card.push(element.number)      
  })

  if(card.every(elem => elem === 'X')){
      
    return 'BINGO' 
  } 
  return card.join('|')
    
}
 
function bingo(){
  let name = prompt('Com et dius?')
  console.log('Hola ' + name + '. Comença el Bingo!')
  console.log('El teu carto es:\n' + newTurn())

  while(askTurn()){
    getRandom()
    console.log('Ha sortit el numero: ' + numRandom)
    showChange = newTurn(numRandom)
    console.log(showChange) 
    if(showChange === 'BINGO'){
      let newGame = confirm('Vols fer una altre partida?')
      if(newGame){
         bingoCard = [
          { number: 1,},
          { number: 7 },
          { number: 8 },
          { number: 9 },
          { number: 3},
        ];
        bombo=[1,2,3,4,5,6,7,8,9,10]
      }else{
        return 'Ciao'
      }   
    }    
  }
  
   console.log('Ciao')  
}  

bingo()
