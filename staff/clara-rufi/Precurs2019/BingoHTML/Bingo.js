document.getElementById('cartro').style="display:none;"
document.getElementById('welcome').style="display:block;"
document.getElementById('requestlikeCarton').style="display:none;"
document.getElementById('Yes').style="display:none;"
document.getElementById('No').style="display:none;"
document.getElementById('questionCarton').style="display:none;"
document.getElementById('number').style="display:none;"
document.getElementById('aleatoryNumber').style="display:none;"
document.getElementById('getNumber').style="display:none;"

var columna1 = []
var columna2 = [] 
var columna3 = [] 
var columna4 = [] 
var columna5 = [] 
var columna6 = [] 
var columna7 = [] 
var columna8 = [] 
var columna9 = [] 

fila1 = []
fila2 = []
fila3 = []

nameUser = []

function login(){

if (document.getElementById("nameUser").value !== "")
nameUser.push(document.getElementById("nameUser").value)
}



function play(){

document.getElementById('cartro').style="display:block;"
document.getElementById('welcome').style="display:none;"

// columna1
for (var k=0; k<3; k++){
var number1 = (Math.ceil(Math.random ()*10))
    if (k===0){
        document.getElementsByClassName("a")[k].style.backgroundColor = "Black";
        columna1.push(0)
        fila1.push(0) 
    }else if (k===1){
        document.getElementsByClassName("a")[k].style.backgroundColor = "Black";
        columna1.push(0)
        fila2.push(0) 
    }else if (columna1.indexOf(number1) === -1){
        columna1.push(number1)
        document.getElementsByClassName("a")[k].value += number1
        fila3.push(number1) 
  }
}

// columna2
for (var k=0; k<3; k++){
    var number2 = (Math.floor(Math.random ()*(21-11))+11); //Retorna un entero aleatorio entre min (incluido) y max (excluido)
        if (k===0){
            document.getElementsByClassName("b")[k].style.backgroundColor = "Black"; 
            columna2.push(0) 
            fila1.push(0) 
        }else if (number2 === columna2[k-1]+1 || number2 === columna2[k-1]-1|| columna2.indexOf(number2) !== -1){
            k= k-1
        }else if (k===1 && columna2.indexOf(number2) === -1){
            columna2.push(number2)
            fila2.push(number2)
            document.getElementsByClassName("b")[k].value += number2 
        }else if (k===2 && columna2.indexOf(number2) === -1){
            columna2.push(number2)
            fila3.push(number2)
            document.getElementsByClassName("b")[k].value += number2 
        }
}

//columna3
for (var k=0; k<3; k++){
    var number3 = (Math.floor(Math.random ()*(31-21))+21)
        if (k===0){
        columna3.push(number3)
        fila1.push(number3)
        document.getElementsByClassName("c")[k].value += number3
        }else if (k===1){
        document.getElementsByClassName("c")[k].style.backgroundColor = "Black";
        columna3.push(0)
        fila2.push(0) 
        }else if (k===2){
        document.getElementsByClassName("c")[k].style.backgroundColor = "Black";
        columna3.push(0)
        fila3.push(0) 
        }
}
//columna4
for (var k=0; k<3; k++){
    var number4 = (Math.floor(Math.random ()*(41-31))+31)
        if ( k===2){
            document.getElementsByClassName("d")[k].style.backgroundColor = "Black";
            columna4.push(0)  
            fila3.push(0)
        }else if (number4 === columna4[k-1]+1 || number4 === columna4[k-1]-1|| columna4.indexOf(number4) !== -1){
            k= k-1
        }else if (k===0 && columna4.indexOf(number4) === -1){
            columna4.push(number4)
            fila1.push(number4)
            document.getElementsByClassName("d")[k].value += number4 
        }else if (k===1 && columna4.indexOf(number4) === -1){
            columna4.push(number4)
            fila2.push(number4)
            document.getElementsByClassName("d")[k].value += number4 
}
}
// columna5
for (var k=0; k<3; k++){
    var number5 = (Math.floor(Math.random ()*(51-41))+41); //Retorna un entero aleatorio entre min (incluido) y max (excluido)
        if (k===0){
            document.getElementsByClassName("e")[k].style.backgroundColor = "Black"; 
            columna5.push(0)
            fila1.push(0)
        }else if (k===1 && columna5.indexOf(number5) === -1){
            columna5.push(number5)
            fila2.push(number5)
            document.getElementsByClassName("e")[k].value += number5
        }else if (k===2 && columna5.indexOf(number5) === -1){
            columna5.push(number5)
            fila3.push(number5)
            document.getElementsByClassName("e")[k].value += number5
}
}

//columna6
for (var k=0; k<3; k++){
    var number6 = (Math.floor(Math.random ()*(61-51))+51)
        if (k===0){
        columna6.push(number3)
        fila1.push(number6)
        document.getElementsByClassName("f")[k].value += number6
        }else if (k===1){
        document.getElementsByClassName("f")[k].style.backgroundColor = "Black";
        columna6.push(0)
        fila2.push(0) 
        }else if (k===2){
        document.getElementsByClassName("f")[k].style.backgroundColor = "Black";
        columna6.push(0)
        fila3.push(0) 
        }
}

// columna7
for (var k=0; k<3; k++){
    var number7 = (Math.floor(Math.random ()*(71-61))+61); //Retorna un entero aleatorio entre min (incluido) y max (excluido)
        if (k===1){
            document.getElementsByClassName("g")[k].style.backgroundColor = "Black"; 
            columna7.push(0) 
            fila2.push(0) 
        }else if (number7 === columna7[k-2]+1 || number7 === columna7[k-2]-1|| columna7.indexOf(number7) !== -1){
            k= k-1
        }else if (k===0 && columna7.indexOf(number7) === -1){
            columna7.push(number7)
            fila1.push(number7)
            document.getElementsByClassName("g")[k].value += number7
        }else if (k===2 && columna7.indexOf(number7) === -1){
            columna7.push(number7)
            fila3.push(number7)
            document.getElementsByClassName("g")[k].value += number7
        } 
}


// columna8
for (var k=0; k<3; k++){
    var number8 = (Math.floor(Math.random ()*(81-71))+71); 
        if (k===0){
            document.getElementsByClassName("h")[k].style.backgroundColor = "Black"; 
            columna8.push(0) 
            fila1.push(0) 
        }else if (number8 === columna8[k-1]+1 || number8 === columna8[k-1]-1|| columna8.indexOf(number8) !== -1){
            k= k-1
        }else if (k===1 && columna8.indexOf(number8) === -1){
            columna8.push(number8)
            fila2.push(number8)
            document.getElementsByClassName("h")[k].value += number8
        }else if (k===2 && columna8.indexOf(number8) === -1){
            columna8.push(number8)
            fila3.push(number8)
            document.getElementsByClassName("h")[k].value += number8
}
}
//columna9
for (var k=0; k<3; k++){
    var number9 = (Math.floor(Math.random ()*(91-81))+81)
        if ( k===2){
            document.getElementsByClassName("i")[k].style.backgroundColor = "Black";
            columna9.push(0)
            fila3.push(0)    
        }else if (number9 === columna9[k-1]+1 || number9 === columna9[k-1]-1|| columna9.indexOf(number9) !== -1){
            k= k-1
        }else if (k===0 && columna9.indexOf(number9) === -1){
            columna9.push(number9)
            fila1.push(number9)
            document.getElementsByClassName("i")[k].value += number9
        }else if (k===1 && columna9.indexOf(number9) === -1){
            columna9.push(number9)
            fila2.push(number9)
            document.getElementsByClassName("i")[k].value += number9 
        } 
}

document.getElementById('requestlikeCarton').style="display:block;"
document.getElementById('questionCarton').style="display:block;"
document.getElementById("requestlikeCarton").value =  nameUser + ", te gusta este cartón o quieres uno de nuevo?"
document.getElementById('Yes').style="display:block;"
document.getElementById('No').style="display:block;"
}

function No(){
    document.getElementById('requestlikeCarton').style="display:none;"
    document.getElementById('questionCarton').style="display:none;"
    document.getElementById('Yes').style="display:none;"
    document.getElementById('No').style="display:none;"
    columna1 = []
    columna2 = [] 
    columna3 = [] 
    columna4 = [] 
    columna5 = [] 
    columna6 = [] 
    columna7 = [] 
    columna8 = [] 
    columna9 = []
    fila1 = []
    fila2 = []
    fila3 = [] 
    for (var k=0; k<3; k++){
        document.getElementsByClassName("a")[k].value = "";
        document.getElementsByClassName("b")[k].value = "";
        document.getElementsByClassName("c")[k].value = "";
        document.getElementsByClassName("d")[k].value = "";
        document.getElementsByClassName("e")[k].value = "";
        document.getElementsByClassName("f")[k].value = "";
        document.getElementsByClassName("g")[k].value = "";
        document.getElementsByClassName("h")[k].value = "";
        document.getElementsByClassName("i")[k].value = "";   
    }
    play();
    }

  

function Yes(){
    document.getElementById('requestlikeCarton').style="display:none;"
    document.getElementById('questionCarton').style="display:none;"
    document.getElementById('Yes').style="display:none;"
    document.getElementById('No').style="display:none;"
    document.getElementById('number').style="display:block;"
    document.getElementById('aleatoryNumber').style="display:block;"
    document.getElementById('getNumber').style="display:block;"
    getNumber();
    
}

numberRandom = []

function getNumber(){
    number = (Math.floor(Math.random ()*(40-10))+10)
    
    if (numberRandom.indexOf(number) === -1){
        numberRandom.push(number)
        
        document.getElementById("aleatoryNumber").value = "numero => " + number
    }else if(numberRandom.indexOf(number) !== -1){
        getNumber()
    }
       
    
    for (var i=0; i<10; i++){
        if(fila1[i]=== number){
            posicio = fila1.indexOf(number)
            console.log(posicio)
            document.getElementsByClassName("fila1")[posicio].style.backgroundColor = "green";
        }else if(fila2[i]=== number){
            posicio = fila2.indexOf(number)
            console.log(posicio)
            document.getElementsByClassName("fila2")[posicio].style.backgroundColor = "green";
        }else if(fila3[i]=== number){
            posicio = fila3.indexOf(number)
            console.log(posicio)
            document.getElementsByClassName("fila3")[posicio].style.backgroundColor = "green";
        }
    } 
}



    
