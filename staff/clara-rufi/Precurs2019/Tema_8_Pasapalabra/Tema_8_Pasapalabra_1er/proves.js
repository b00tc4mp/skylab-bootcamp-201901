
<div id = "scores">
    <div id = "userScore" ></div>


<button onclick= "showResults()" id = "showResults">Ranking</button>

function showResults(){
    if (Falladas.length >= 1 || Pasapalabra.length >= 1 ){
        document.getElementById("showQuestion").value = "Has acertado un total de " + numAcertadas + " letras y has fallado un total de " + numFalladas + " letras, pero ganas 1.000€ por participar!" 
        
    }else{
        document.getElementById("showQuestion").value = "No has fallado ninguna letra! Felicidades, has ganado el rosco y 3.000.000€!"
    }
}

document.getElementById('showResults').style="display:none;"
document.getElementById('resultsUsers').style="display:none;"
document.getElementById('showResults').style="display:block;"
document.getElementById('resultsUsers').style="display:block;"

#showResults{
    height: 40px;
    width: 140px;
    border-radius: 10px;
    border-color: black;
    border-bottom-width: medium;
    border-left-width: medium;
    border-width: 3px;
    font-size: 14px;
    font-weight: 600;
    position: relative;
    top: 250px;
    left: 140px;
}


#resultsUsers{
    background-color: rgba(2, 3, 49, 0.973);
    color: white;
    height: 500px;
    width: 900px;
    border: 1px solid #be2c53;
    position: relative;
    top: -230px;
    left: 110px;
   
}



numPalabra = Pasapalabra.length
repeatPasapalabra = 0

var r = document.getElementById("letters1");
r.getElementsByClassName("letter").posicionPasapalabra[n].style.backgroundColor = "limegreen";

function Okrepeat(){

    if (countTrys <= numPalabra){
            if (document.getElementById("userAnswer").value === "pasapalabra"){
            countTrys += 1
            r.getElementsByClassName("letter")[posicionPasapalabra].style.backgroundColor = "DarkOrange";
            repeatPasapalabra += 1
            document.getElementById("showQuestion").value = "";
            document.getElementById("userAnswer").value = "";

        }else if (document.getElementById("userAnswer").value !== respuestasPasapalabra[countTrys]){
        countTrys +=1
        r.getElementsByClassName("letter")[repPasapalabra].style.backgroundColor = "Crimson";
        repeatPasapalabra += 1
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";

    }else if (document.getElementById("userAnswer").value === respuestasPasapalabra[countTrys]){
        countTrys +=1
        Acertadas.push(y[n].innerHTML)
        r.getElementsByClassName("letter")[repPasapalabra].style.backgroundColor = "LimeGreen";
        repeatPasapalabra += 1
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";   
    }

    
    document.getElementById("showQuestion").value += Pasapalabra[countTrys-1];
    }else if (countTrys > numPalabra){
        document.getElementById("showQuestion").value += Pasapalabra[countTrys];   
    }
    console.log( "acertadas =>" + Acertadas)
    console.log( "numAcertadas =>" + numAcertadas)
}


  
  
  }else if(n>=3){
    document.getElementById("showQuestion").value = "";
    document.getElementById("userAnswer").value = "";
    if (Falladas.length >= 1 || Pasapalabra.length >= 1 ){
    document.getElementById("showQuestion").value = "Has acertado un total de " + numAcertadas + " letras y has fallado un total de " + numFalladas + " letras, pero ganas 1.000€ por participar!" 
    document.getElementById('repeatPasapalabra').style="display:block;"
    document.getElementById('acceptar').style="display:none;"
}else{
    document.getElementById("showQuestion").value = "No has fallado ninguna letra! Felicidades, has ganado el rosco y 3.000.000€!"
    document.getElementById('repeatPasapalabra').style="display:block;"
    document.getElementById('acceptar').style="display:none;"
    } 
}
// canviar color de fons:
// document.getElementsById("showQuestion").style.backgroundColor = "red";

//var r = document.getElementById("letters1"); // => canvi color canvi color lletres
//r.getElementsByClassName("letter")[n].style.backgroundColor = "DarkOrange";


function Okrepeat(){

    numTrys = numPalabra * 3
    alert("num palabra => " + numPalabra)
    alert("numTrys => " + numTrys)
    alert("countTrys => " + countTrys)
   
    if (countTrys <= numTrys){
        if (document.getElementById("userAnswer").value === "pasapalabra"){
        countTrys +=1
        alert(countTrys)
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";

        }else if (document.getElementById("userAnswer").value !== respuestasPasapalabra[countTrys]){
        
        countTrys +=1
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";

    }else if (document.getElementById("userAnswer").value === respuestasPasapalabra[countTrys]){
        countTrys +=1
     
        numPalabra.pop(Pasapalabra[countTrys])
        alert("num palabra => " + numPalabra)
        alert(countTrys)
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
       
    }
}




    if (countTrys <= numPalabra){
    document.getElementById("showQuestion").value += Pasapalabra[countTrys-1];
    }else if (countTrys > numPalabra){
        countTrys = 0
        document.getElementById("showQuestion").value += Pasapalabra[countTrys];   
  
}

}

function accept(){

    if (document.getElementById("userAnswer").value === "pasapalabra"){
        Pasapalabra.push(y[n].innerHTML)
        respuestasPasapalabra.push(b[n].innerHTML)       
        r.getElementsByClassName("letter")[n].style.backgroundColor = "DarkOrange";
        n +=1
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";

    }else if (document.getElementById("userAnswer").value !== b[n].innerHTML){
        Falladas.push(y[n].innerHTML)
        r.getElementsByClassName("letter")[n].style.backgroundColor = "Crimson";
        n +=1
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";

    }else if (document.getElementById("userAnswer").value === b[n].innerHTML){
        Acertadas.push(y[n].innerHTML)
        r.getElementsByClassName("letter")[n].style.backgroundColor = "LimeGreen";
        n +=1
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
    }

    
    if (n <= 2){
    document.getElementById("showQuestion").value += y[n].innerHTML;
    }else if(n>=3){
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
        if (Falladas.length >= 1 || Pasapalabra.length >= 1 ){
        document.getElementById("showQuestion").value = "Has acertado un total de " + numAcertadas + " letras y has fallado un total de " + numFalladas + " letras, pero ganas 1.000€ por participar!" 
        document.getElementById('repeatPasapalabra').style="display:block;"
        document.getElementById('acceptar').style="display:none;"
    }else{
        document.getElementById("showQuestion").value = "No has fallado ninguna letra! Felicidades, has ganado el rosco y 3.000.000€!"
        document.getElementById('repeatPasapalabra').style="display:block;"
        document.getElementById('acceptar').style="display:none;"
        } 
    }


numAcertadas = Acertadas.length

console.log("numAcertadas => " + numAcertadas);
numFalladas = Falladas.length

console.log("numFalladas => " + numFalladas);
numPalabra = Pasapalabra.length

console.log("numFalladas => " + numFalladas);


} 


