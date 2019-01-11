var x = document.getElementById("questions"); //question
var y = x.getElementsByTagName("li"); //question
var a = document.getElementById("answers"); //answer
var b = a.getElementsByTagName("li"); //answer
var r = document.getElementById("letters1"); //canvi color lletres


nameUser = []

function login(){

    if (document.getElementById("nameUser").value !== "")
        nameUser.push(document.getElementById("nameUser").value)
        console.log(nameUser)
        document.getElementById("welcome").value += "Bienvenido " + nameUser + " !!"
}


function start(){

    document.getElementById('loginUser').style="display:none;" //pq no es mostri
    document.getElementById('Okrepeat').style="display:none;"//pq no es mostri
    document.getElementById('repeatPasapalabra').style="display:none;"//pq no es mostri
    document.getElementById("showQuestion").value += y[0].innerHTML;
}


n = 0

var Acertadas = []
var Falladas = []
var Pasapalabra = []
var respuestasPasapalabra = []
var posicionPasapalabra = []

function accept(){
    var r = document.getElementById("letters1");
//console.log("n => " + n)
    if (document.getElementById("userAnswer").value === "pasapalabra"){
        //var r = document.getElementById("letters1").getElementsByClassName("letter"); //canviar class per "pasapalabra"
        //r[n].className = "pasapalabra";
        console.log("n => " + n)
        r.getElementsByClassName("letter")[n].style.backgroundColor = "DarkOrange";
        Pasapalabra.push(y[n].innerHTML)
        respuestasPasapalabra.push(b[n].innerHTML)
        posicionPasapalabra.push(n) 
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
        n+=1
        
    }else if (document.getElementById("userAnswer").value !== b[n].innerHTML){
        Falladas.push(y[n].innerHTML)
        //var r = document.getElementById("letters1").getElementsByClassName("letter"); //canviar class per "pasapalabra"
        //r[n].className = "fallada";
        r.getElementsByClassName("letter")[n].style.backgroundColor = "Crimson";
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
        n+=1

    }else if (document.getElementById("userAnswer").value === b[n].innerHTML){
        Acertadas.push(y[n].innerHTML)
        //var s = document.getElementById("letters1").getElementsByClassName("letter"); //canviar class per "pasapalabra"
        //s[n].className = "acertada";
        r.getElementsByClassName("letter")[n].style.backgroundColor = "limegreen";
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
        n+=1
    }
    
    if (n <= 4){
        
    document.getElementById("showQuestion").value += y[n].innerHTML;
    }else if(n>=5){
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";
        if (Falladas.length >= 1 || Pasapalabra.length >= 1 ){
        document.getElementById('repeatPasapalabra').style="display:block;"
        document.getElementById('acceptar').style="display:none;"
    }

numAcertadas = Acertadas.length
console.log("numAcertadas => " + numAcertadas);
numFalladas = Falladas.length
console.log("numFalladas => " + numFalladas);
numPalabra = Pasapalabra.length
console.log("numFalladas => " + numFalladas);
    } 
}

repeatQuestion = 0

function repeatPasapalabra(){

    document.getElementById('Okrepeat').style="display:block;"
    document.getElementById('repeatPasapalabra').style="display:none;"
    document.getElementById("showQuestion").value = ""
    
    console.log(Pasapalabra)
    console.log(Pasapalabra[0])
    console.log(respuestasPasapalabra)
    console.log("posicionPasapalabra" + posicionPasapalabra)
    if (Pasapalabra.length >= 1){
    
    document.getElementById("showQuestion").value += Pasapalabra[repeatQuestion];
    repeatQuestion += 1
   
    }
}

function Okrepeat(){

    if (repeatQuestion <= numPalabra){
            if (document.getElementById("userAnswer").value === "pasapalabra"){
                repeatQuestion += 1
            //r.getElementsByClassName("pasapalabra")[repeatQuestion].style.backgroundColor = "DarkOrange";
         
            document.getElementById("showQuestion").value = "";
            document.getElementById("userAnswer").value = "";

        }else if (document.getElementById("userAnswer").value !== respuestasPasapalabra[repeatQuestion]){
            repeatQuestion +=1
        r.getElementsByClassName("pasapalabra")[repeatQuestion].style.backgroundColor = "Crimson";
     
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";

    }else if (document.getElementById("userAnswer").value === respuestasPasapalabra[repeatQuestion]){
        repeatQuestion +=1
        Acertadas.push(y[n].innerHTML)
        var r = document.getElementById("letters1");
        r.getElementsByClassName("letter").posicionPasapalabra[n].style.backgroundColor = "limegreen";
       
        document.getElementById("showQuestion").value = "";
        document.getElementById("userAnswer").value = "";   
    }

    
    document.getElementById("showQuestion").value += Pasapalabra[repeatQuestion-1];
    }else if (repeatQuestion > numPalabra){
        document.getElementById("showQuestion").value += Pasapalabra[repeatQuestion];   
    }
    console.log( "acertadas =>" + Acertadas)
    console.log( "numAcertadas =>" + numAcertadas)
}



