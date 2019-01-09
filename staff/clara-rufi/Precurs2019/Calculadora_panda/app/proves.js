if (nextOperand.lenght >=2){
    currentOperand = nextOperand.length
    recalculate();
}

function recalculate(){

    if (nextOperand[currentOperand-1] === '+'){   /*mostrar ultim element de nextOperand*/
    var second = result.lastIndexOf('+')
    numberSecond = parseFloat(result.slice(second+1, result.length))
    finalresult.value =  Math.round((nextnumber + numberSecond)*1000)/1000;

    }else if (nextOperand[currentOperand-1] === '-'){
        finalresult.value =  "aa"

    }
}
//// 

if (nextOperand.length >=1){
    currentOperand = nextOperand.length

    if (nextOperand[currentOperand-1] === '+'){   /*mostrar ultim element de nextOperand*/
    var second = result.lastIndexOf('+')
    numberSecond = parseFloat(result.slice(second+1, result.length))
    finalresult.value =  Math.round((finalresult.value + numberSecond)*1000)/1000;
}else if (nextOperand[currentOperand-1] === '-'){
        finalresult.value =  "aa"
        alert("cc")
    }
}

/* nextOperand = "++**+/-"
currentOperand = nextOperand.length
aa = nextOperand[currentOperand-1]
"-"


result = "5+3+7"
var second = result.lastIndexOf('+')
console.log(second);        => 3

numberSecond = parseFloat(result.slice(second+1, result.length))        => 7


var result = "4+5+6"

nextnumber = ""
nextOperand = "++"

function calculate(){
    var result = document.getElementById('display').value;
    if (result.indexOf("+") !== -1){
        numOperand= result.indexOf("+");
        var num1 = parseFloat(result.slice(0,numOperand))
        var num2 = parseFloat(result.slice(numOperand+1, result.length))
        aa =  Math.round((num1 + num2)*1000)/1000;
        nextnumber += aa

    }else if(result.indexOf("-") !== -1){
        numOperand= result.indexOf("-");
        var num1 = parseFloat(result.slice(0,numOperand))
        var num2 = parseFloat(result.slice(numOperand+1, result.length))
        aa =  Math.round((num1 - num2)*1000)/1000;
        nextnumber += aa

    }
}    

if (nextOperand.length >=1){
    currentOperand = nextOperand.length
    recalculate();
}

function recalculate(){

    if (nextOperand[currentOperand-1] === '+'){   /*mostrar ultim element de nextOperand*/
        var second = result.lastIndexOf('+')
        numberSecond = parseFloat(result.slice(second+1, result.length))
        aa =  Math.round((nextnumber + numberSecond)*1000)/1000;
    
        }else if (nextOperand[currentOperand-1] === '-'){
            finalresult.value =  "aa"
    
        }
    }
    undefined
    var result = "4+5+6"
    
    nextnumber = ""
    nextOperand = "++"
    
    function calculate(){
        var result = document.getElementById('display').value;
        if (result.indexOf("+") !== -1){
            numOperand= result.indexOf("+");
            var num1 = parseFloat(result.slice(0,numOperand))
            var num2 = parseFloat(result.slice(numOperand+1, result.length))
            aa =  Math.round((num1 + num2)*1000)/1000;
            nextnumber += aa
    
        }else if(result.indexOf("-") !== -1){
            numOperand= result.indexOf("-");
            var num1 = parseFloat(result.slice(0,numOperand))
            var num2 = parseFloat(result.slice(numOperand+1, result.length))
            aa =  Math.round((num1 - num2)*1000)/1000;
            nextnumber += aa
    
        }
    }    
    
    if (nextOperand.length >=1){
        currentOperand = nextOperand.length
        recalculate();
    }
    
    function recalculate(){
    
        if (nextOperand[currentOperand-1] === '+'){   /*mostrar ultim element de nextOperand*/
        var second = result.lastIndexOf('+')
        numberSecond = parseFloat(result.slice(second+1, result.length))
        aa =  Math.round((nextnumber + numberSecond)*1000)/1000;
    console.log("bb")
        }else if (nextOperand[currentOperand-1] === '-'){
         console.log("cc") 
    
        }
    }

    mostra bb

/*
    switch(id) {
        case '+':
            break;
        case '-':
            break;
        default:
            result += id
            document.getElementById('display').value = parseInt(result);
            break;

    }



/* calculate*/

function calculate(){

    if (result.indexOf("+") !== -1){
        numOperand= result.indexOf("+");
        
        var num1 = parseInt(result.slice(0,numOperand))
        var num2 = parseInt(result.slice(numOperand+1, resSplit.length))
        display.value =  num1 + num2
    }else if(result.indexOf("-") !== -1){
        numOperand= result.indexOf("-");
        var num1 = parseInt(result.slice(0,numOperand))
        var num2 = parseInt(result.slice(numOperand+1, resSplit.length))
        display.value =  num1 - num2
    }



/*
function calculate(){
   var first = [];
   var second = [];

}


function clear(){

}

var screen = [];

function pushnumber(num){
    screen.push(num)
}

function showscreen(){
    console.log(screen)
}

html: 
<button onclick= "display.value += "-""" id = "-" value = "-">-</button>

<input type= "text" name = "display" id = "display" placeholder ="0" disabled>


/* 

"var str1=document.getElementById('resultado').value; if(str1 == '0'){document.getElementById('resultado').value=2}else{ var str2='2'; var res = str1.concat(str2);document.getElementById('resultado').value=res;}"
function showScreen(){

}

function pushnumber(x){
    document.getElementById(x).value;
   

}
}else if(result.indexOf("√") !== -1){
        resultSq = Math.sqrt(result);
        display.value =  Math.round(resultSq*1000)/1000; 
    }

arrel quadrada:

sqrt_2 = Math.sqrt(num2);
    result_sqrt2 = [Math.round((sqrt_2)*1000)/1000];

function clear(){
    display.value = "";
}

function backspace(){
    display.value = display.value.substring(0, display.value.length -1);
}

dos.onclick = function(e){
    var resultado = document.getElementById('resultado');
    resultado.textContent = resultado.textContent  + "2";
}
function aa(){
    parseInt(document.getElementById('display').value = 2);
}


    var n2 = document.getElementById("n2");
    console.log(n2)
    display.value = display.value + "2";
    console.log(value)
}


<input type="button" value="9"
 onClick="var str1=document.getElementById('resultado').value; 
 if(str1 == '0'){document.getElementById('resultado').value=9}
 else{ var str2='9'; var res = str1.concat(str2);document.getElementById('resultado').value=res;}"

function pushnumber(){

display.value += document.getElementById("numbers").value;
}

function pushnumber(){

    display.value = document.getElementById("-").value;

   
}














