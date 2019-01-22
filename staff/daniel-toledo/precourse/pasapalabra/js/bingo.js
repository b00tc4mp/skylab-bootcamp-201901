//BINGO - PRO


//--------------------------- FUNCIONES ----------------------------//
function GenerateRandom(){
    var random=Math.random()*30;
    random=Number(random.toFixed());
    return random
}

function generateCarton(){
    var bingoCard=[]; //Object donde guardo el carton
    var cartonList=[0]; // Lista con los numero del carton para que no se vuelvan a repetir, el 0 ya esta eliminado desde el principio
    for (var i=0; i<15; i++){ //Cartones de 15 numeros
        var int=true;
        while(int){
            var random=GenerateRandom();
            int=cartonList.includes(random);
            
        }
        cartonList.push(random)

        if (i<5){
            lin=1;
        }

        if (i>=5 && i<10){
            lin=2;
        }

        if(i>=10){
            lin=3;
        }

        var numero={
            number:random,
            matched:false,
            linea:lin
        }
        bingoCard.push(numero);
        
    }


    for (var i=0; i<bingoCard.length; i++){

        document.getElementById('pos'+i.toString()).innerHTML = bingoCard[i].number;
    }

    return bingoCard
}

function popLinea(){
    document.getElementById('linea').style.display='block';
    document.getElementById('numeros').style.display='none';
    linea=true;
    document.getElementById('siguiente').onclick= function() {
        document.getElementById('linea').style.display='none';
        document.getElementById('numeros').style.display='block';
        var random=nextTurn();
        match(random) //Miro si hay match
    };
    return linea
}

function bingo(){
    document.getElementById('bingo').style.display='block';
    
    endGame()
        
}


function match(num){
    acertaste=false
    for (var i=0; i<bingoCard.length; i++){
        if (bingoCard[i].number===num){
            document.getElementById('pos'+i.toString()).classList.add("acierto")
            bingoCard[i].matched=true;
            contadorBingo++;
            if (bingoCard[i].linea===1){
                contadorLinea.linea1++
            }
            if (bingoCard[i].linea===2){
                contadorLinea.linea2++
            }
            if (bingoCard[i].linea===3){
                contadorLinea.linea3++
            }
        }
    }

    if (!linea){
        for (var l in contadorLinea){
            if (contadorLinea[l]===5){
                popLinea()
            }
        }
    }

    if (contadorBingo===15){
        bingo()
    }

    return bingoCard;
}



function nextTurn(){

    var int=true;  //Miro un random que aun no haya salido
        while(int){
            var random=GenerateRandom();
            int=listRandom.includes(random);   
        }
    listRandom.push(random);
    turno++

    document.getElementById('ruleta').innerHTML = random; //pongo el random en pantalla
    return random

}

function newGame(){

    document.getElementById('bienvenida').style.display='none';
    document.getElementById('otroCarton').style.display='none';

    document.getElementById('ventana').style.display='block';
    document.getElementById('siguiente').style.display='block';

    document.getElementById('final').style.display='none';
    document.getElementById('volverJugar').style.display='none';

    return document.getElementById('name').value;

}

function endGame(){
    document.getElementById('numeros').style.display='none';

    document.getElementById('bienvenida').style.display='none';
    document.getElementById('otroCarton').style.display='none';

    document.getElementById('ventana').style.display='none';
    document.getElementById('siguiente').style.display='none';

    document.getElementById('final').style.display='block';
    document.getElementById('volverJugar').style.display='block';

      var ganador = {
            name: name,
            points: 30-turno,
        }

        ranking.push(ganador);
        ranking.sort(function (a, b) {
            return (b.points - a.points)
        })

        if (ranking.length>0){
            var rankingString='';
        }
        if (ranking.length===0){
            var rankingString='No hay ningun jugador registrado\n'
        }
        for (var i=0; i<ranking.length; i++){
            rankingString+= ranking[i].name + ' con ' + ranking[i].points.toString() + ' puntos.<br>'
        }

        document.getElementById('puntos').innerHTML=ganador.points;
        document.getElementById('ranking').innerHTML=rankingString;



}

function volverJugar(){
    
    for (var i=0; i<15; i++){
        document.getElementById('pos'+i.toString()).classList.remove('acierto')
    }

    document.getElementById('name').value='';
    document.getElementById('bingo').style.display='none';
    document.getElementById('numeros').style.display='block';

    document.getElementById('bienvenida').style.display='block';
    document.getElementById('otroCarton').style.display='block';

    document.getElementById('ventana').style.display='none';
    document.getElementById('siguiente').style.display='none';

    document.getElementById('final').style.display='none';
    document.getElementById('volverJugar').style.display='none';

}


//-----------------------------------MAIN GAME----------------------------//
    var listRandom=[0]; //No quiero que me genere el 0
    var contadorLinea={linea1:0,linea2:0,linea3:0};
    var contadorBingo=0;
    var lineaPuntos=0;
    var turno=0;
    var linea=false; //Una vez hago linea se vuele true y no mira si tengo mas lineas
    bingoCard=generateCarton();
    var ranking=[];



//ININCIO

    //Enviar nombre
    document.getElementById('enviarNombre').onclick= function() {
             name=newGame(); 
             random=nextTurn();
             match(random) //Miro si hay match        
    };

    //Enviar nombre con ENTER
    document.getElementById('name').addEventListener("keydown",(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == "13") {        
           name=newGame();
           var random=nextTurn();
            match(random) //Miro si hay match          
    }
    }));

    //Generar otro carton
    document.getElementById('otroCarton').onclick= function() {
            bingoCard=generateCarton();          
    };


//JUGANDO

    //Enviar respuesta
    document.getElementById('siguiente').onclick= function() {

            var random=nextTurn();
            match(random) //Miro si hay match
    };



//FINALIZAR
     document.getElementById('volverJugar').onclick= function() {
            listRandom=[0]; //No quiero que me genere el 0
            contadorLinea={linea1:0,linea2:0,linea3:0};
            contadorBingo=0;
            lineaPuntos=0;
            turno=0;
            linea=false; //Una vez hago linea se vuele true y no mira si tengo mas lineas
            bingoCard=generateCarton();
            
            volverJugar();
    };

//SALIR
 document.getElementById('salir').onclick= function() {
            window.location.href = "index.html"

    };


