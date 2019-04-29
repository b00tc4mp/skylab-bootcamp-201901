
let color ="red"//Variables globales
let player1="";
let player2="";
let ready=false;
let cpu=false;

let lineWin=[   ["","","","","","",""],// Simulacion de tablero
                ["","","","","","",""],
                ["","","","","","",""],
                ["","","","","","",""],
                ["","","","","","",""],
                ["","","","","","",""],
            ]
//-----------------------------------------------------------------------funciones de seleccion de juego-----------------------------------------------------------------------
function newGame(){
    
    reset();
    player1="";
    player2="";
    $("mensajes").innerHTML=""
    $("gameInfo").style.visibility= "visible";
}

function gameSolo(){
    
    $("gameInfo").style.visibility= "hidden";
    $("gameInfo2").style.visibility= "visible";
    $("player1").value="";
    $("player2").value="";
    
}
function gameSoloStart(){

    $("gameInfo2").style.visibility= "hidden";
    player1= $("player1").value;
    player2= $("player2").value;
    $("gameInfo").style.visibility= "hidden";
    $("nombreJugador1").innerHTML=player1;
    $("nombreJugador2").innerHTML=player2;
    $("turnoJugador").innerHTML="Jugador Rojo";
    $("turnoJugador").style.color="red";
    cpu= false;
}

function gameCpu(){
    $("gameInfo").style.visibility= "hidden";
    $("gameInfo3").style.visibility= "visible";
    player1= $("player1.1").value;
    $("nombreJugador1").innerHTML=player1;
    $("nombreJugador2").innerHTML="CPU";
    $("turnoJugador").innerHTML="Jugador Rojo";
    $("turnoJugador").style.color="red";
    ready=true;
}
function gameCpuStart(){
    cpu=true;
    $("gameInfo3").style.visibility= "hidden";
}
 // -------------------------------------------------------------------------funciones de reset---------------------------------------------------------------------------------------  
function reset(){
    for(let i=0;i<6;i++){
        var a= $(i).querySelectorAll(".colum1");
        a[0].style.backgroundColor = "white";
        var b= $(i).querySelectorAll(".colum2");
        b[0].style.backgroundColor = "white";
        var c= $(i).querySelectorAll(".colum3");
        c[0].style.backgroundColor = "white";
        var d= $(i).querySelectorAll(".colum4");
        d[0].style.backgroundColor = "white";
        var e= $(i).querySelectorAll(".colum5");
        e[0].style.backgroundColor = "white";
        var f= $(i).querySelectorAll(".colum6");
        f[0].style.backgroundColor = "white";
        var g= $(i).querySelectorAll(".colum7");
        g[0].style.backgroundColor = "white";
    }
    $("mensajes").innerHTML="";
    $("turnoJugador").innerHTML="Jugador Rojo";
    $("turnoJugador").style.color="red";
    ready=true;
    col0 = new Colum(5,".colum1",0,0,false,false) 
    col1 = new Colum(5,".colum2",1,0,false,false)
    col2 = new Colum(5,".colum3",2,0,false,false)
    col3 = new Colum(5,".colum4",3,0,false,false)
    col4 = new Colum(5,".colum5",4,0,false,false)
    col5 = new Colum(5,".colum6",5,0,false,false)
    col6 = new Colum(5,".colum7",6,0,false,false)

    lineWin=[   ["","","","","","",""],
                ["","","","","","",""],
                ["","","","","","",""],
                ["","","","","","",""],
                ["","","","","","",""],
                ["","","","","","",""],
            ]
}

function fullColum(){
    $("gameInfo4").style.visibility= "hidden";
    ready = true;
}
            
function $(element){
    return document.getElementById(element);
}
//-------------------------------------------------------------------------------funciones y class del juego ---------------------------------------------------------------

class Colum{
    constructor(nav,name,infoPos,red,full,done){//creador de objetos para cada uno de los botones de las columnas
        this.nav = nav;
        this.name = name;
        this.infoPos = infoPos;
        this.red = red;
        this.full = full;
        this.done = done;
        
    }
  
 navigation(){
    
   
    if(this.nav===0){
        this.full= true;
        
    }
   
    if(ready === true){
        if(this.nav>=0){
    
            lineWin[this.nav][this.infoPos] = color //marca cada posicion del array qeu simula el tablero con el color del jugador 

            var x= $(this.nav).querySelectorAll(this.name);
            x[0].style.backgroundColor = color;

            this.nav--;

            if(color=== "red"){
                $("turnoJugador").innerHTML="Jugador Amarillo";
                $("turnoJugador").style.color="yellow";
                color="yellow"
                this.red++
            }
            else{
                $("turnoJugador").innerHTML="Jugador Rojo";
                $("turnoJugador").style.color="red";
                color="red"
                this.red=0;
            }
        }
        else{
            $("gameInfo4").style.visibility= "visible";// muestra cuando columna esta llena
            ready = false;
        }
        
        }
        if(this.red === 3){// para decirle al modo cpu que el jugador tiene tres fichas iguales 
             this.done =true;
        }        
        checkWinner()           
     
}

}

let col0 = new Colum(5,".colum1",0,0,false,false) 
let col1 = new Colum(5,".colum2",1,0,false,false)
let col2 = new Colum(5,".colum3",2,0,false,false)
let col3 = new Colum(5,".colum4",3,0,false,false)
let col4 = new Colum(5,".colum5",4,0,false,false)
let col5 = new Colum(5,".colum6",5,0,false,false)
let col6 = new Colum(5,".colum7",6,0,false,false)

//------------------------------------------------------------------------- funciones modo vs cpu-----------------------------------------------------------------


function cpuCol0(){
    
    if(col0.done=== false && col1.full=== false ){
      col1.navigation();
    }
  else if(col0.done === true && col0.full === false){ 
      col0.navigation();
      col0.done= false;
    }
  else if(col0.full === false){
      cpuCol1();
  }
    
}
function cpuCol1(){

    if(col1.done=== false && col2.full=== false ){
        col2.navigation();
      }
    else if(col1.done === true && col1.full === false){ 
        col1.navigation();
        col1.done= false;
      }
    else if(col1.full === false){
        cpuCol2();
    }
}

function cpuCol2(){

    if(col2.done=== false && col3.full=== false ){
        col3.navigation();
      }
    else if(col2.done === true && col2.full === false){ 
        col2.navigation();
        col2.done= false;
      }
    else if(col2.full === false){
        cpuCol3();
    }
}

function cpuCol3(){

    if(col3.done=== false && col4.full=== false ){
        col4.navigation();
      }
    else if(col3.done === true && col3.full === false){ 
        col3.navigation();
        col3.done= false;
      }
    else if(col3.full === false){
        cpuCol4();
    }
}
function cpuCol4(){

    if(col4.done=== false && col5.full=== false ){
        col3.navigation();
      }
    else if(col4.done === true && col4.full === false){ 
        col4.navigation();
        col4.done= false;
      }
    else if(col4.full === false){
        cpuCol5();
    }
}

function cpuCol5(){

    if(col5.done=== false && col6.full=== false ){
        col4.navigation();
      }
    else if(col5.done === true && col5.full === false){ 
        col5.navigation();
        col5.done= false;
      }
    else if(col5.full === false){
        cpuCol6();
    }
      
}

function cpuCol6(){

    if(col6.done=== false && col5.full=== false ){
        col5.navigation();
      }
    else if(col6.done === true && col5.full === false){ 
        col6.navigation();
        col6.done= false;
      }
    else if(col6.full === false){
        cpuCol5();
    }
      
}
//------------------------------------------------------------------------------------------ funciones de los botones de cada columna----------------------------------------
function chip0(){
    
    if(cpu === false){
        col0.navigation();
    }
    if(cpu=== true ){
        col0.navigation();
        cpuCol0();
    }
  
}
function chip1(){

    if(cpu === false){
        col1.navigation();
    }
    if(cpu=== true){
        col1.navigation();
        cpuCol1();
    }
    
}
function chip2(){

    if(cpu === false){
        col2.navigation();
    }
    if(cpu=== true){
        col2.navigation();
        cpuCol2();
    }
    
}
function chip3(){

    if(cpu === false){
        col3.navigation();
    }
    if(cpu=== true){
        col3.navigation();
        cpuCol3();
    }
  
}
function chip4(){

    if(cpu === false){
        col4.navigation();
    }
    if(cpu=== true){
        col4.navigation();
        cpuCol4();
    }
 
}
function chip5(){
    if(cpu === false){
        col5.navigation();
    }
    if(cpu=== true){
        col5.navigation();
        cpuCol5();
    }
  
}
function chip6(){

    if(cpu === false){
        col6.navigation();
    }
    if(cpu=== true){
        col6.navigation();
        cpuCol6();
    }
    
}
//----------------------------------------------------------------------------- funciones para comprobacion del jugador ganador ------------------------------------------------------
function checkCol(){
let move=0
let red= 0;
let yellow=0;


while(move<7){// while junto con for para ir por cada casilla de cada columna  del array que simula el tablero

    for(let i=5;i>=0;i--){
        if(lineWin[i][move] === "red"){
            red++
            yellow=0
        }
        else if(lineWin[i][move]=== "yellow"){
            yellow++
            red=0;
            
        }
        else{
            red=0;
            yellow=0;
        }
        if(red===4){
            redWin()
        }
        else if(yellow === 4){
            yellowWin()
        }

    }
    move++
    red=0;
    yellow=0;
}
    
}
function checkLine(){// mismo que columna pero en las lineas
    let move=5
    let red= 0;
    let yellow=0;
    
    while(move>0){
        for(let i=0;i<=6;i++){
            if(lineWin[move][i] === "red"){
                red++
                yellow=0    
            }
            else if(lineWin[move][i]=== "yellow"){
                yellow++
                red=0;
            }
            else{
                red=0;
                yellow=0;
            }
            if(red===4){
                redWin()
            }
            else if(yellow === 4){
                yellowWin()
            }
        }
        move--;
        red=0;
        yellow=0;
    }
}
function checkD1(value1,value2,value3){// check de diagonales

let red=0
let yellow=0
        
while(value3<=5){
                
    for(let i=value1;i>=0;i--){
        if(lineWin[i][value2]==="red"){
            value2++;
            red++;
            yellow=0;
        }
        else if(lineWin[i][value2]==="yellow"){
            value2++;
            red=0;
            yellow++;
        }
        else{
            value2++;
            red=0;
            yellow=0;
        }
        if(red === 4){
            redWin();
        }
        else if(yellow===4){
            yellowWin();
        }
    }
    red=0;
    yellow=0;
    if(value3==2){
        value2 =1;
    }
    else if(value3 ==3){
        value2=2;
    }
    else if(value3 == 4){
        value2=3;
    }
    else{
        value2 =0;
    }
    if(value1 <5){
        value1++
    }
        value3++;  
}
}

function checkD2(value1,value2,value3){

let red=0
let yellow=0;    

while(value3<=5){
                
    for(let i=value1;i>=0;i--){
        if(lineWin[i][value2]==="red"){
            value2--;
            red++;
            yellow=0;
        }
        else if(lineWin[i][value2]==="yellow"){
            value2--;
            red=0;
            yellow++;
        }
        else{
            value2--;
            red=0;
            yellow=0;
        }
        if(red === 4){
            redWin();
        }
        else if(yellow===4){
            yellowWin();
        }
    }
    red=0;
    yellow=0;
    if(value3==2){
        value2 =5;
    }
    else if(value3 ==3){
        value2=4;
    }
    else if(value3 == 4){
        value2=3;
    }
    else{
        value2 =6;
    }
    if(value1 <5){
        value1++
    }
    value3++;  
    }
}
//------------------------------------------------------- funciones agrupadoras -----------------------------------------------------------------------------
function checkWinner(){
    checkD1(3,0,0);
    checkD2(3,6,0);
    checkCol();
    checkLine();
}
function redWin(){
    $("mensajes").innerHTML="Jugador Rojo Ganador!";
    $("mensajes").style.color="red";
    $("turnoJugador").innerHTML="";
    ready=false;
}
function yellowWin(){
    $("mensajes").innerHTML="Jugador Amarillo Ganador!"
    $("mensajes").style.color="yellow";
    $("turnoJugador").innerHTML="";
    ready=false;
}