

var player1="";
var player2="";
var ready=false;// para obligar al jugador a usar el boton de juego nuevo;)
var yellowPlayer=false;
var redPlayer=true;
var color="red";
var nav1=5;// empezamos de 5 para empezar desde abajo de cada columna por el enlace con las id de la tabla
var nav2=5;
var nav3=5;
var nav4=5;
var nav5=5;
var nav6=5;
var nav7=5;
var draw=0; //para saber el empate
var lineNav=0;//para navegar por las diferentes lineas
var col1Full=false;// avisar de que columna esta llena de fichas
var col2Full=false;
var col3Full=false;
var col4Full=false;
var col5Full=false;
var col6Full=false;
var col7Full=false;
var diagonal1=[{id:0,info1:"",info2:"",info3:"",info4:""},//objeto simulando las diagonales de izq a derecha  que equivalen a las fichas sean rojas o amarillas 
               {id:1,info1:"",info2:"",info3:"",info4:"",info5:""},
               {id:2,info1:"",info2:"",info3:"",info4:"",info5:"",info6:""},
               {id:3,info2:"",info3:"",info4:"",info5:"",info6:"",info7:""},//los info estan ordenados basandose en el info de las lineas asi simula un tablero real 
               {id:4,info3:"",info4:"",info5:"",info6:"",info7:""},
               {id:5,info4:"",info5:"",info6:"",info7:""}]

var diagonal2=[{id:0,info4:"",info5:"",info6:"",info7:""},// diagoneles de derecha a izq
              {id:1,info3:"",info4:"",info5:"",info6:"",info7:""},
              {id:2,info2:"",info3:"",info4:"",info5:"",info6:"",info7:""},
              {id:3,info1:"",info2:"",info3:"",info4:"",info5:"",info6:""},
              {id:4,info1:"",info2:"",info3:"",info4:"",info5:"",},
              {id:5,info1:"",info2:"",info3:"",info4:""},]


var lineWin=[{id:0,info1:"",info2:"",info3:"",info4:"",info5:"",info6:"",info7:""},//objeto simulando las lineas que equivalen al tablero de juego 
             {id:1,info1:"",info2:"",info3:"",info4:"",info5:"",info6:"",info7:""},
             {id:2,info1:"",info2:"",info3:"",info4:"",info5:"",info6:"",info7:""},
             {id:3,info1:"",info2:"",info3:"",info4:"",info5:"",info6:"",info7:""},
             {id:4,info1:"",info2:"",info3:"",info4:"",info5:"",info6:"",info7:""},
             {id:5,info1:"",info2:"",info3:"",info4:"",info5:"",info6:"",info7:""}]

            

function $(element){
    return document.getElementById(element);
}

//por si se empata

function tablas(){
    
    if(draw === 7){
        $("mensajes").innerHTML="Empate!!!!";
    }
}


//Reset de fichas pero conservando jugadores-----------------------------------------------------------------------------------------------

function reset(){
    for(let i=0;i<6;i++){//Poner en blanco todo el panel
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


//reset info datos recopilados

ready=true;
yellowPlayer=false;
redPlayer=true;
color="red";
nav1=5;
nav2=5;
nav3=5;
nav4=5;
nav5=5;
nav6=5;
nav7=5;
lineNav=0;
draw=0;
col1Full=false;
col2Full=false;
col3Full=false;
col4Full=false;
col5Full=false;
col6Full=false;
col7Full=false;
redCol=[0,0,0,0,0,0,0];
yellowCol=[0,0,0,0,0,0,0];

diagonal1=[{id:0,info1:"",info2:"",info3:"",info4:""},
            {id:1,info1:"",info2:"",info3:"",info4:"",info5:""},
            {id:2,info1:"",info2:"",info3:"",info4:"",info5:"",info6:""},
            {id:3,info2:"",info3:"",info4:"",info5:"",info6:"",info7:""},
            {id:4,info3:"",info4:"",info5:"",info6:"",info7:""},
            {id:5,info4:"",info5:"",info6:"",info7:""}]

diagonal2=[{id:0,info4:"",info5:"",info6:"",info7:""},
            {id:1,info3:"",info4:"",info5:"",info6:"",info7:""},
            {id:2,info2:"",info3:"",info4:"",info5:"",info6:"",info7:""},
            {id:3,info1:"",info2:"",info3:"",info4:"",info5:"",info6:""},
            {id:4,info1:"",info2:"",info3:"",info4:"",info5:"",},
            {id:5,info1:"",info2:"",info3:"",info4:""},]


lineWin=[{id:0,info1:"",info2:"",info3:"",info4:"",info5:"",info6:"",info7:""},
             {id:1,info1:"",info2:"",info3:"",info4:"",info5:"",info6:"",info7:""},
             {id:2,info1:"",info2:"",info3:"",info4:"",info5:"",info6:"",info7:""},
             {id:3,info1:"",info2:"",info3:"",info4:"",info5:"",info6:"",info7:""},
             {id:4,info1:"",info2:"",info3:"",info4:"",info5:"",info6:"",info7:""},
             {id:5,info1:"",info2:"",info3:"",info4:"",info5:"",info6:"",info7:""}]

$("mensajes").innerHTML="";//info de jugador pra el reset
$("turnoJugador").innerHTML="Jugador Rojo";
$("turnoJugador").style.color="red";
    
}

//empieza el juego-------------------------------------------------------------------------------------------------------------------------------

function newGame(){
    
reset();

player1="";
player2="";

$("mensajes").innerHTML=""//info jugador blanco

//info juego nuevo
player1=prompt("Nombre Jugador Rojo?")
player2=prompt("Nombre Jugador Amarillo?")
ready=true;
$("nombreJugador1").innerHTML=player1;
$("nombreJugador2").innerHTML=player2;
$("turnoJugador").innerHTML="Jugador Rojo";
$("turnoJugador").style.color="red";
    
}





//recogida de informacion por los diferentes botones------------------------------------------------------------------------------------------------------------



function col1(){

    if(nav1===0){//para acctivar el empate si se llenan todas las columnas y nadie ha ganado
        draw++;
        tablas();
    }

    if(ready === true){
        

        if(nav1 <0 && redPlayer=== true){//aparte de notificar que la columna esta llena tambien mantenemos el orden de la ficha que seguira sea roja o amarilla
            col1Full=true;
            redPlayer=true;
            yellowPlayer=false;
            alert("Columna llena!") //aviso linea llena
        }

        if(nav1 <0 && yellowPlayer===true){
                
            col1Full=true;
            redPlayer=false;
            yellowPlayer=true;
            alert("Columna llena!") //aviso linea llena
        }

        
      
        if(col1Full===false){

            if(redPlayer === true){
                color="red"
                redPlayer =false; // para cambiar de turno cada vez
                yellowPlayer=true;
                
            }
            else{
                color="yellow"
                yellowPlayer=false;
                redPlayer=true;
            }

            var x= $(nav1).querySelectorAll(".colum1");//selecionar dentro de cada fila una posicion para pintarla de rojo o amarillo
            x[0].style.backgroundColor = color;
            

            lineWin.forEach(function(item){//para navegar dentro del objeto que contine las  filas y lineas y escribir red o yellow segun la ficha
                if(item.id === nav1){
                    item.info1=color;
                }
            })
           
            if(nav1>2){ 
                diagonal1.forEach(function(item){//para rellenar el objeto de las diagonales
                    if(item.id === nav1-3){// -3 hace ref a que nav1 es 5 pero en el objeto de diagonales le corresponde el de id2 asi que se ajusta
                        item.info1 =color;
                    }
                })
            }
            if(nav1<3){//menor de 3 para evitar los huecos vacios
                diagonal2.forEach(function(item){
                    if(item.id === nav1+3){//se añade el +3 para que los huecos vacios de las daigonales que no puden formar 4 en linea sean contados aunque el id no exista en si.
                        item.info1 =color;
                    }
                })
            }
        }

    
            
        if(yellowPlayer===true && col1Full===false){
            $("turnoJugador").innerHTML="Jugador Amarillo";
            $("turnoJugador").style.color="yellow";
        }
        else if(col1Full=== false){
            $("turnoJugador").innerHTML="Jugador Rojo";
            $("turnoJugador").style.color="red";
        }
    
    lineNav=nav1//asignamos a la variable que recorrera cada linea , el valor de la variable que le cada columna asi  luego se leera la linea en la que se este jugando para comprobar ganador
    checkCol();
    checkLine1();
    checkDiagonals1();
    checkDiagonals2();
    nav1--;
    }
    
}
function col2(){
    
    if(nav2===0){
        draw++;
        tablas();
    }

    if(ready === true){

        if(nav2 <0 && redPlayer=== true){

            col2Full=true;
            redPlayer=true;
            yellowPlayer=false;
            alert("Columna llena!") 
        }
        if(nav2 <0 && yellowPlayer===true){
        
            col2Full=true;
            redPlayer=false;
            yellowPlayer=true;
            alert("Columna llena!") 
        }
    
        if(col2Full===false){
            
            if(redPlayer === true){
                color="red"
                redPlayer =false; 
                yellowPlayer=true;
                
            }
            else{
                color="yellow"
                yellowPlayer=false;
                redPlayer=true;
            }

            var x= $(nav2).querySelectorAll(".colum2");
            x[0].style.backgroundColor = color;
            

            lineWin.forEach(function(item){
                if(item.id === nav2){
                    item.info2=color;
                }
            })
           
            if(nav2>1){ 
                diagonal1.forEach(function(item){
                    if(item.id === nav1-2){
                        item.info2 =color;
                    }
                })
            }   
            if(nav2<4){
                diagonal2.forEach(function(item){
                    if(item.id === nav2+2){
                        item.info2 =color;
                    }
                })
            }
        }

        
        if(yellowPlayer===true && col2Full===false){
            $("turnoJugador").innerHTML="Jugador Amarillo";
            $("turnoJugador").style.color="yellow";
        }
        else if(col2Full=== false){
            $("turnoJugador").innerHTML="Jugador Rojo";
            $("turnoJugador").style.color="red";
        }
    
    lineNav=nav2;
    checkCol();
    checkLine1();
    checkDiagonals1();
    checkDiagonals2();
    nav2--;
    }
    
}

function col3(){

    if(nav3===0){
        draw++;
        tablas();
    }

    if(ready === true){

        if(nav3 <0 && redPlayer=== true){

            col3Full=true;
            redPlayer=true;
            yellowPlayer=false;
            alert("Columna llena!") 
        }
        if(nav3 <0 && yellowPlayer===true){
        
            col3Full=true;
            redPlayer=false;
            yellowPlayer=true;
            alert("Columna llena!") 
        }
    
        if(col3Full===false){
            
            if(redPlayer === true){
                color="red"
                redPlayer =false; 
                yellowPlayer=true;
                
            }
            else{
                color="yellow"
                yellowPlayer=false;
                redPlayer=true;
            }

            var x= $(nav3).querySelectorAll(".colum3");
            x[0].style.backgroundColor = color;
            

            lineWin.forEach(function(item){
                if(item.id === nav3){
                    item.info3=color;
                }
            })
           
            if(nav3>0){ 
                diagonal1.forEach(function(item){
                    if(item.id === nav3-1){
                        item.info3 =color;
                        }
                })
            }
            if(nav3<5){
                diagonal2.forEach(function(item){
                    if(item.id === nav3+1){
                        item.info3 =color;
                    }
                })
            }
            

        }
            
        if(yellowPlayer===true && col3Full===false){
            $("turnoJugador").innerHTML="Jugador Amarillo";
            $("turnoJugador").style.color="yellow";
        }
        else if(col3Full=== false){
            $("turnoJugador").innerHTML="Jugador Rojo";
            $("turnoJugador").style.color="red";
        }
    
    lineNav=nav3;
    checkCol();
    checkLine1();
    checkDiagonals1();
    checkDiagonals2();
    nav3--;
    }
    
}
function col4(){

    if(nav4===0){
        draw++;
        tablas();
    }

    if(ready === true){

        if(nav4 <0 && redPlayer=== true){

            col4Full=true;
            redPlayer=true;
            yellowPlayer=false;
            alert("Columna llena!") 
        }
        if(nav4 <0 && yellowPlayer===true){
        
            col4Full=true;
            redPlayer=false;
            yellowPlayer=true;
            alert("Columna llena!") 
        }
    
        if(col4Full===false){
            
            if(redPlayer === true){
                color="red"
                redPlayer =false; 
                yellowPlayer=true;
                
            }
            else{
                color="yellow"
                yellowPlayer=false;
                redPlayer=true;
            }

            var x= $(nav4).querySelectorAll(".colum4");
            x[0].style.backgroundColor = color;
            

            lineWin.forEach(function(item){
                if(item.id === nav4){
                    item.info4=color;
                }
            })
           
             
            diagonal1.forEach(function(item){
                if(item.id === nav4){
                    item.info4 =color;
                    }
            })
            diagonal2.forEach(function(item){
                if(item.id === nav4){
                    item.info4 =color;
                }
            })
            

        }
            
        if(yellowPlayer===true && col4Full===false){
            $("turnoJugador").innerHTML="Jugador Amarillo";
            $("turnoJugador").style.color="yellow";
        }
        else if(col4Full=== false){
            $("turnoJugador").innerHTML="Jugador Rojo";
            $("turnoJugador").style.color="red";
        }
    
    lineNav=nav4
    checkCol();
    checkLine1();
    checkDiagonals1();
    checkDiagonals2();
    nav4--
    
    }
    
}

function col5(){

    if(nav5===0){
        draw++;
        tablas();
    }

    if(ready === true){

        if(nav5 <0 && redPlayer=== true){

            col5Full=true;
            redPlayer=true;
            yellowPlayer=false;
            alert("Columna llena!") 
        }
        if(nav5 <0 && yellowPlayer===true){
        
            col5Full=true;
            redPlayer=false;
            yellowPlayer=true;
            alert("Columna llena!") 
        }
    
        if(col5Full===false){
            
            if(redPlayer === true){
                color="red"
                redPlayer =false; 
                yellowPlayer=true;
                
            }
            else{
                color="yellow"
                yellowPlayer=false;
                redPlayer=true;
            }

            var x= $(nav5).querySelectorAll(".colum5");
            x[0].style.backgroundColor = color;
            

            lineWin.forEach(function(item){
                if(item.id === nav5){
                    item.info5=color;
                }
            })
           
            if(nav5<5){
                diagonal1.forEach(function(item){
                    if(item.id === nav5+1){
                        item.info5 =color;
                    }
                })
            }
            if(nav5>0){
                diagonal2.forEach(function(item){
                    if(item.id === nav5-1){
                        item.info5 =color;
                    }
                })
            }

        }
            
        if(yellowPlayer===true && col5Full===false){
            $("turnoJugador").innerHTML="Jugador Amarillo";
            $("turnoJugador").style.color="yellow";
        }
        else if(col5Full=== false){
            $("turnoJugador").innerHTML="Jugador Rojo";
            $("turnoJugador").style.color="red";
        }
    
    lineNav=nav5
    checkCol();
    checkLine1();
    checkDiagonals1();
    checkDiagonals2();
    nav5--;
    
    }
    
}
function col6(){

    if(nav6===0){
        draw++;
        tablas();
    }

    if(ready === true){

        if(nav6 <0 && redPlayer=== true){

            col6Full=true;
            redPlayer=true;
            yellowPlayer=false;
            alert("Columna llena!") 
        }
        if(nav6 <0 && yellowPlayer===true){
        
            col6Full=true;
            redPlayer=false;
            yellowPlayer=true;
            alert("Columna llena!") 
        }
    
        if(col6Full===false){
            
            if(redPlayer === true){
                color="red"
                redPlayer =false; 
                yellowPlayer=true;
                
            }
            else{
                color="yellow"
                yellowPlayer=false;
                redPlayer=true;
            }

            var x= $(nav6).querySelectorAll(".colum6");
            x[0].style.backgroundColor = color;
            

            lineWin.forEach(function(item){
                if(item.id === nav6){
                    item.info6=color;
                }
            })
           
            if(nav6<4){
            diagonal1.forEach(function(item){
                if(item.id === nav6+2){
                    item.info6 =color;
                    }
                })
            }
            if(nav6>1){
                diagonal2.forEach(function(item){
                    if(item.id === nav6-2){
                        item.info6 =color;
                    }
                })
            }

        }
            
        if(yellowPlayer===true && col6Full===false){
            $("turnoJugador").innerHTML="Jugador Amarillo";
            $("turnoJugador").style.color="yellow";
        }
        else if(col6Full=== false){
            $("turnoJugador").innerHTML="Jugador Rojo";
            $("turnoJugador").style.color="red";
        }
    
    lineNav=nav6
    checkCol();
    checkLine1();
    checkDiagonals1();
    checkDiagonals2();
    nav6--;
    }
    
}
function col7(){

    if(nav7===0){
        draw++;
        tablas();
    }

    if(ready === true){

        if(nav7 <0 && redPlayer=== true){

            col7Full=true;
            redPlayer=true;
            yellowPlayer=false;
            alert("Columna llena!") 
        }
        if(nav7 <0 && yellowPlayer===true){
        
            col7Full=true;
            redPlayer=false;
            yellowPlayer=true;
            alert("Columna llena!") 
        }
    
        if(col7Full===false){
            
            if(redPlayer === true){
                color="red"
                redPlayer =false; 
                yellowPlayer=true;
                
            }
            else{
                color="yellow"
                yellowPlayer=false;
                redPlayer=true;
            }

            var x= $(nav7).querySelectorAll(".colum7");
            x[0].style.backgroundColor = color;
            

            lineWin.forEach(function(item){
                if(item.id === nav7){
                    item.info7=color;
                }
            })
           
             if(nav7<3){
                diagonal1.forEach(function(item){
                    if(item.id === nav7+3){
                        item.info7 =color;
                    }
                })
            }
            if(nav7>2){
                diagonal2.forEach(function(item){
                    if(item.id === nav7-3){
                        item.info7 =color;
                    }
                })
            }

        }
            
        if(yellowPlayer===true && col7Full===false){
            $("turnoJugador").innerHTML="Jugador Amarillo";
            $("turnoJugador").style.color="yellow";
        }
        else if(col7Full=== false){
            $("turnoJugador").innerHTML="Jugador Rojo";
            $("turnoJugador").style.color="red";
        }
    
    lineNav=nav7
    checkCol();
    checkLine1();
    checkDiagonals1();
    checkDiagonals2();
    nav7--;
    }
    
}




//comprobacion ganadores-------------------------------------------------------------------------------------------------

//variables fuera de la funcion debido a que se leen los datos uno a uno no a la vez
var redCol=[0,0,0,0,0,0,0];
var yellowCol=[0,0,0,0,0,0,0];

//Resultados columnas--------------------------------------------------------------------------------------------------------------------------------

function checkCol(){

    lineWin.forEach(function(item){
        if(item.info1 === "red"){
            redCol[0]++
            yellowCol[0]=0
        }
        else if(item.info1 === "yellow"){
            yellowCol[0]++;
            redCol[0]=0;
        }
        else if(item.info1 ===""){
            yellowCol[0]=0;
            redCol[0]=0;
        }
        if(item.info2 === "red"){
            redCol[1]++
            yellowCol[1]=0
        }
        else if(item.info2 === "yellow"){
            yellowCol[1]++;
            redCol[1]=0;
        }
        else if(item.info2 ===""){
            yellowCol[1]=0;
            redCol[1]=0;
        }
        if(item.info3 === "red"){
            redCol[2]++
            yellowCol[2]=0
        }
        else if(item.info3 === "yellow"){
            yellowCol[2]++;
            redCol[2]=0;
        }
        else if(item.info3 ===""){
            yellowCol[2]=0;
            redCol[2]=0;
        }
        if(item.info4 === "red"){
            redCol[3]++
            yellowCol[3]=0
        }
        else if(item.info4 === "yellow"){
            yellowCol[3]++;
            redCol[3]=0;
        }
        else if(item.info4 ===""){
            yellowCol[3]=0;
            redCol[3]=0;
        }
        if(item.info5 === "red"){
            redCol[4]++
            yellowCol[4]=0
        }
        else if(item.info5 === "yellow"){
            yellowCol[4]++;
            redCol[4]=0;
        }
        else if(item.info5 ===""){
            yellowCol[4]=0;
            redCol[4]=0;
        }
        if(item.info6 === "red"){
            redCol[5]++
            yellowCol[5]=0
        }
        else if(item.info6 === "yellow"){
            yellowCol[5]++;
            redCol[5]=0;
        }
        else if(item.info6 ===""){
            yellowCol[5]=0;
            redCol[5]=0;
        }
        if(item.info7 === "red"){
            redCol[6]++
            yellowCol[0]=0
        }
        else if(item.info7 === "yellow"){
            yellowCol[6]++;
            redCol[6]=0;
        }
        else if(item.info7 ===""){
            yellowCol[6]=0;
            redCol[6]=0;
        }
        
        
    })
    
  for(let i =0;i<redCol.length;i++){

    if(redCol[i]=== 4){
        $("mensajes").innerHTML="Jugador Rojo Ganador!"
        $("mensajes").style.color="red";
        $("turnoJugador").innerHTML="";
        ready=false;
    }
    if(yellowCol[i]===4){
        $("mensajes").innerHTML="Jugador Amarillo Ganador!"
        $("mensajes").style.color="yellow";
        $("turnoJugador").innerHTML="";
        ready=false;
    }
  }
}


//Resultados lineas--------------------------------------------------------------------------------------------------------------------------------------------------------


function checkLine1(){
    
var yellowLine1=0
var redLine1=0;
var tempLine= lineWin[lineNav]//extraemos todos los obejos de la array y despues itineramos dentro para saber cuantos hay rojos o amarillos usando el lineNav

for(prop in tempLine){
      
    if(tempLine[prop]==="red"){
        redLine1++
    }
    else if(tempLine[prop]==="yellow"){
        redLine1=0;
    }
    else{
        redLine1=0;
    }
    
    if(redLine1 === 4){
        $("mensajes").innerHTML="Jugador Rojo Ganador!"
        $("mensajes").style.color="red";
        $("turnoJugador").innerHTML="";
        ready=false;
    }

    if(tempLine[prop]==="yellow"){
        yellowLine1++
    }

    else if(tempLine[prop]==="red"){
        yellowLine1=0;
    }

    else{
        yellowLine1=0;
    }

    if(yellowLine1 === 4){
        $("mensajes").innerHTML="Jugador Amarillo Ganador!"
        $("mensajes").style.color="yellow";
        $("turnoJugador").innerHTML="";
        ready=false;
        
    }
    
}
}


//Resutados de las diagonales--------------------------------------------------------------------------------------------------------------------------------

function checkDiagonals1(){

var yellowDiagonal=0;
var redDiagonal=0;
var tempWin=false;//para que se pare el contenido del for si ya se obtiene un ganador



for(let i=5;i>=0;i--){ //mismo metodo que con las lineas pero añadiendo un for ya que no podemos unsar como puntero el nav

    if(tempWin=== false){
        var tempDiagonal=diagonal1[i]// la i hace referencia al id de la array de objetos de las daigonales por eso empiza desde 5 que seria el princio de la columna
               
        for(prop in tempDiagonal){

            if(tempDiagonal[prop]==="red"){
                redDiagonal++
                
                if(redDiagonal === 4){
                    $("mensajes").innerHTML="Jugador Rojo Ganador!";
                    $("mensajes").style.color="red";
                    $("turnoJugador").innerHTML="";
                    ready=false;
                    tempWin=true;
                }

            }
            else{
                redDiagonal=0;// reset para que no cuente el total de fichas iguales sino que sean 4 seguidas
            }
                    
            if(tempDiagonal[prop]==="yellow"){
                yellowDiagonal++

                if(yellowDiagonal === 4){
                    $("mensajes").innerHTML="Jugador Amarillo Ganador!";
                        $("mensajes").style.color="yellow";
                        $("turnoJugador").innerHTML="";
                        ready=false;
                        tempWin=true;
                        
                        
                    }
            }
            else{
                yellowDiagonal=0;
            }
                  
        }
    }
}
}

function checkDiagonals2(){

    var yellowDiagonal=0;
    var redDiagonal=0;
    var tempWin=false;
    
for(let i=5;i>=0;i--){ 

    if(tempWin=== false){
        var tempDiagonal=diagonal2[i]
            
        for(prop in tempDiagonal){
    
            if(tempDiagonal[prop]==="red"){
                redDiagonal++

                if(redDiagonal === 4){
                    $("mensajes").innerHTML="Jugador Rojo Ganador!"
                    $("mensajes").style.color="red";
                    $("turnoJugador").innerHTML="";
                    ready=false;
                    tempWin=true;
                    }
            }
            else{
                redDiagonal=0;
            }
    
            if(tempDiagonal[prop]==="yellow"){
                yellowDiagonal++

                if(yellowDiagonal === 4){
                    $("mensajes").innerHTML="Jugador Amarillo Ganador!"
                    $("mensajes").style.color="yellow";
                    $("turnoJugador").innerHTML="";
                    ready=false;
                    tempWin=true;
                    }
            }
            else{
                yellowDiagonal=0;
            }
    
                    
        }
    }
}
}


