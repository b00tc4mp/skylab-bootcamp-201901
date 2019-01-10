
var bingoCard = [
    { number: GenerateNumRandomCarton(), matched: false },
    { number: GenerateNumRandomCarton(), matched: false },
    { number: GenerateNumRandomCarton(), matched: false },
    { number: GenerateNumRandomCarton(), matched: false },
    { number: GenerateNumRandomCarton(), matched: false },
    //next line
    { number: GenerateNumRandomCarton(), matched: false },
    { number: GenerateNumRandomCarton(), matched: false },
    { number: GenerateNumRandomCarton(), matched: false },
    { number: GenerateNumRandomCarton(), matched: false },
    { number: GenerateNumRandomCarton(), matched: false },
    //next line
    { number: GenerateNumRandomCarton(), matched: false },
    { number: GenerateNumRandomCarton(), matched: false },
    { number: GenerateNumRandomCarton(), matched: false },
    { number: GenerateNumRandomCarton(), matched: false },
    { number: GenerateNumRandomCarton(), matched: false }
];

function GenerateNumRandomCarton(){
        numRandomcarton = Math.floor(Math.random()*(20)+1);
        return numRandomcarton; 
}

var name;
var numRandom;
var usados = [];
var carton=[];

var linea1 = false;
var linea2 = false;
var linea3 = false;
var completed=false;

var contadorTurnos=0;

var showCarton=true;

for(var i = 0; i<bingoCard.length; i++){
    carton.push(bingoCard[i].number);
}

function PedirNombre(){
    name=prompt('Nombre de Jugador:')
    console.log('Hola ' + name);
}

function AskTurn(){
    if(completed==false){
        if(confirm('Nuevo Turno')){
            NewTurn()
        }else{
            console.log('Ciao!')
        }
    }else{
        return alert('BINGOOOOO!!!!' + ' en ' + contadorTurnos + ' turnos') + RePlay();
    }
}

function NewTurn(){
    contadorTurnos+=1; 
    GenerateNumRandom()
    for(var i = 0; i <carton.length; i++){
        if(numRandom == carton[i]){
            carton[i] = 'x';
            showCarton=true;
        }
    }
    
    if(carton[0]=='x' && carton[1]=='x' && carton[2]=='x' && carton[3]=='x' && carton[4]=='x' && linea1==false){
        console.log('LINEAA!!!');
        linea1=true;
    }
    if(carton[5]=='x' && carton[6]=='x' && carton[7]=='x' && carton[8]=='x' && carton[9]=='x' && linea2==false){
        console.log('LINEAA!!!');
        linea2=true;
    }
    if(carton[10]=='x' && carton[11]=='x' && carton[12]=='x' && carton[13]=='x' && carton[14]=='x' && linea3==false){
        console.log('LINEAA!!!');
        linea3=true;
    }
    if(linea1==true && linea2==true && linea3==true){
        completed=true;
    }
    if(showCarton==true){
        console.log(carton.slice(0,5) + "\n" + carton.slice(5,10) + '\n' +  carton.slice(10,15));
        showCarton=false;
    }
    AskTurn()
}


function GenerateNumRandom(){
    
    for(var i=0; i<10; i++){
        numRandom = Math.floor(Math.random()*(20)+1);
        if(usados.indexOf(numRandom)==-1){
            usados.push(numRandom);
            return numRandom + alert(numRandom); 
        }else{
            i--;
        }
    }
}

function RePlay(){
    if(completed==true){
        if(confirm('Deseas volver a jugar?')){
            Bingo();
        }
    }
}

function Bingo(){
    PedirNombre() + AskTurn()
}

Bingo();

