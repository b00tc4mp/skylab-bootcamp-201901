for (var i=0; i<9; i++){
    if(fila1[i]=== number){
        posicio = fila1.indexOf(number)
        //fila1.splice(posicio,1)
        posicio1 +=1

        console.log("numberRandom =>" + numberRandom)
        console.log("totalNumbers =>" + totalNumbers)
        console.log("number =>" + number)
        console.log("posicio1 =>" + posicio)
        console.log("---total posicio1 => " + posicio1)
        console.log("moves => " + moves)

        document.getElementsByClassName("fila1")[posicio].style.backgroundColor = "green";
    }else if(fila2[i]=== number){
        posicio = fila2.indexOf(number)
        posicio2 +=1
        //fila2.splice(posicio,1)
        console.log("numberRandom =>" + numberRandom)
        console.log("totalNumbers =>" + totalNumbers)
        console.log("number =>" + number)
        console.log("posicio2 =>" + posicio)
        console.log("---total posicio2 => " + posicio2)
        console.log("moves => " + moves)
    
        document.getElementsByClassName("fila2")[posicio].style.backgroundColor = "green";
    }else if(fila3[i]=== number){
        posicio = fila3.indexOf(number)
        //fila3.splice(posicio,1)
        posicio3 +=1
        console.log("numberRandom =>" + numberRandom)
        console.log("totalNumbers =>" + totalNumbers)
        console.log("number =>" + number)
        console.log("posicio3 =>" + posicio)
        console.log("---total posicio3 => " + posicio3)
        console.log("moves => " + moves)

        document.getElementsByClassName("fila3")[posicio].style.backgroundColor = "green";
    }

 
}
}


for (var i=0; i<10; i++){
    if(fila1[i]=== number){
        posicio = fila1.indexOf(number)
        fila1.splice(posicio,1)
        posicio1 +=1

        console.log("numberRandom =>" + numberRandom)
        console.log("totalNumbers =>" + totalNumbers)
        console.log("number =>" + number)
        console.log("posicio1 =>" + posicio)
        console.log("---total posicio1 => " + posicio1)
        console.log("moves => " + moves)

        document.getElementsByClassName("fila1")[posicio].style.backgroundColor = "green";
    }else if(fila2[i]=== number){
        posicio = fila2.indexOf(number)
        posicio2 +=1
        fila2.splice(posicio,1)
        console.log("numberRandom =>" + numberRandom)
        console.log("totalNumbers =>" + totalNumbers)
        console.log("number =>" + number)
        console.log("posicio2 =>" + posicio)
        console.log("---total posicio2 => " + posicio2)
        console.log("moves => " + moves)
    
        document.getElementsByClassName("fila2")[posicio].style.backgroundColor = "green";
    }else if(fila3[i]=== number){
        posicio = fila3.indexOf(number)
        fila3.splice(posicio,1)
        posicio3 +=1
        console.log("numberRandom =>" + numberRandom)
        console.log("totalNumbers =>" + totalNumbers)
        console.log("number =>" + number)
        console.log("posicio3 =>" + posicio)
        console.log("---total posicio3 => " + posicio3)
        console.log("moves => " + moves)

        document.getElementsByClassName("fila3")[posicio].style.backgroundColor = "green";
    }

 
}
}




for (var i=0; i<10; i++){
    if(fila1[i]=== number){
        posicio = fila1.indexOf(number)
        posicio1 +=1

        console.log("numberRandom =>" + numberRandom)
        console.log("totalNumbers =>" + totalNumbers)
        console.log("number =>" + number)
        console.log("posicio1 =>" + posicio)
        console.log("---total posicio1 => " + posicio1)
        console.log("moves => " + moves)

        document.getElementsByClassName("fila1")[posicio].style.backgroundColor = "green";
    }else if(fila2[i]=== number){
        posicio = fila2.indexOf(number)
        posicio2 +=1
        console.log("numberRandom =>" + numberRandom)
        console.log("totalNumbers =>" + totalNumbers)
        console.log("number =>" + number)
        console.log("posicio2 =>" + posicio)
        console.log("---total posicio2 => " + posicio2)
        console.log("moves => " + moves)
    
        document.getElementsByClassName("fila2")[posicio].style.backgroundColor = "green";
    }else if(fila3[i]=== number){
        posicio = fila3.indexOf(number)
        posicio3 +=1
        console.log("numberRandom =>" + numberRandom)
        console.log("totalNumbers =>" + totalNumbers)
        console.log("number =>" + number)
        console.log("posicio3 =>" + posicio)
        console.log("---total posicio3 => " + posicio3)
        console.log("moves => " + moves)

        document.getElementsByClassName("fila3")[posicio].style.backgroundColor = "green";
    }
 

}
}

if(posicio1 ===5 & posicio2 ===5 & posicio3 ===5){
    alert("bingo")
    document.getElementById('bingo').style="display:block;"
    document.getElementById("bingo").value =  "Bingo! FELICIDADES!!"
}else if (posicio1 ===5){
    alert("linia1!")
    document.getElementById('linia').style="display:block;"
    document.getElementById("linia").value =  "Linia!"
}else if (posicio2 ===5){
    alert("linia2!")
    document.getElementById('linia').style="display:block;"
    document.getElementById("linia").value =  "Linia!" 
}else if (posicio3 ===5){
    alert("linia3!")
    document.getElementById('linia').style="display:block;"
    document.getElementById("linia").value =  "Linia!"  
    }
}  



number = (Math.floor(Math.random ()*(91-1))+1)

for (var i=0; i<30; i++){
    if(fila1[i]=== number){
        posicio = cartro.indexOf(number)
        fila1[posicio] = " x "
        alert("aaaa")
        document.getElementsByid("fila33").style.backgroundColor = "green";
    }
}

#welcome{
    background-color: rgb(139, 23, 15);
    height: -webkit-fill-available;
    padding-top: 3%;
}

// espais random

var espais = [1,2,3]
var numEspai = espais.length
espaiAleatori = Math.floor(Math.random()*numEspai)
espaiBlanc =espais[espaiAleatori]


//versió americana (sense espais)

document.getElementById('cartro').style="display:none;"

var fila1 = []
    
function play(){
document.getElementById('cartro').style="display:block;"
document.getElementById('welcome').style="display:none;"

for (var k=0; k<5; k++){
    var number = Math.floor((Math.random()*(21-11)+11));
    if (fila1.indexOf(number) === -1){
        fila1.push(number)
        document.getElementsByClassName("a1")[k].value += number
        
    }else if(fila1.indexOf(number) !== -1){
        k=k-1
    }
  
}
}

//css

*{
    font-family: 'Open Sans', sans-serif;     
}

body{
    background-color: rgb(139, 23, 15);      
    margin-right: 5%;
    margin-left: 5%;
    border-width: 3px;
    max-width:100%;
    height:auto;  
}

h2{
    position: relative;
    top: 20px;
    left: 92px;
    font-size: 33px;
    font-weight: 700;
}

#cartro{
    height: 500px;
    width: 900px;
}

#play{
    height: 70px;
    width: 150px;
    border-radius: 10px;
    border-color: black;
    border-bottom-width: medium;
    border-left-width: medium;
    border-width: 3px;
    font-size: 14px;
    font-weight: 600;
    position: relative;
    top: 29px;
    left: 90px;
}

.columna1{
    display: grid;
    position: relative;
    width: 100px;
    height: 420px;
    bottom: -80px;
    left: 270px;
    grid-template-rows: 10% 18% 18% 18% 18% 18%;
    border: 3px solid black;
     
}


.columna2{
    display: grid;
    position: relative;
    width: 100px;
    height: 420px;
    bottom: 346px;
    left: 376px;
    grid-template-rows: 10% 18% 18% 18% 18% 18%;
    border: 3px solid black;
    border-left: 1px    
}


.columna3{
    display: grid;
    position: relative;
    width: 100px;
    height: 420px;
    bottom: 772px;
    left: 479px;
    grid-template-rows: 10% 18% 18% 18% 18% 18%;
    border: 3px solid black;
    border-left: 1px;  
}


.columna4{
    display: grid;
    position: relative;
    width: 100px;
    height: 420px;
    bottom: 1198px;
    left: 578px;
    grid-template-rows: 10% 18% 18% 18% 18% 18%;
    border: 3px solid black;   
}

.columna5{
    display: grid;
    position: relative;
    width: 100px;
    height: 420px;
    bottom: 1624px;
    left: 680px;
    grid-template-rows: 10% 18% 18% 18% 18% 18%;
    border: 3px solid black;   
}


.title{
  
    text-align: center;
    color:black;
    background-color: rgba(26, 151, 173, 0.856);
    font-weight: 800;
    width: 100px;
    border-bottom: 2px solid black;
}

.a1, .b1{
    background-color:rgba(243, 208, 11, 0.884);
    color: black;
    display: block;
    width: 100px;
    border: 1px black solid;
    text-align: center;
    font-size: 16px;
    font-weight: 800;
}

//html

<div id = "welcome">
    <h2>Bienvenido al Bingo!</h2>
    <button onclick= "play()" id = "play">Jugar!</button>
    </div>

    <div id = "cartro">   
    <div class="columna1">
        <div class = "title">B</div>
        <input class = "a1">
        <input class = "a1">
        <input class = "a1">
        <input class = "a1">
        <input class = "a1">
    </div>

    <div class="columna2">
        <div class = "title">I</div>
        <input class = "b1">
        <input class = "b1">
        <input class = "b1">
        <input class = "b1">
        <input class = "b1">
    </div>

    <div class="columna3">
        <div class = "title">N</div>
            <div class = "f11"></div>
            <div class = "f12"></div>
            <div class = "f13"></div>
            <div class = "f14"></div>
            <div class = "f15"></div>
    </div>

    <div class="columna4">
            <div class = "title">G</div>
            <div class = "f16"></div>
            <div class = "f17"></div>
            <div class = "f18"></div>
            <div class = "f19"></div>
            <div class = "f20"></div>
    </div>

   <div class="columna5">
            <div class = "title">O</div>
            <div class = "f21"></div>
            <div class = "f22"></div>
            <div class = "f23"></div>
            <div class = "f24"></div>
            <div class = "f25"></div>
    </div>
    </div>



<script src = "Bingo.js"></script>
</body>
</html>


