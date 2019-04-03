
var total = "";
var newNumber = true;
var lastButton = '';
var lastOperate = false;
var operate = false;

var operation = document.getElementById("operation");
var screenResult = document.getElementById("result");

function calc(button){

    if(button != "="){
        operate();
    }else{
        result();
    }
    lastButton = button;
}

function operate(){
    
    checkLast();

    if (operation.innerHTML == "0"){
        operationZero();            
    }else {
        operationNoZero();
        
    }

    if (screenResult.innerHTML== "0" || newNumber == true){
        screenResultZero();
    }else{
        screenResultNoZero();
    }
}

function checkLast(){
    if (lastButton == "+" || lastButton == "-" || lastButton == "*" || lastButton == "/"){ // marcamos si habiamos pulsado boton de opreacion en el pulsado anterior
        lastOperate = true;
    } else{
        lastOperate = false; 
    }
    if(button == "+" || button == "-" || button == "*" || button == "/"){ //marcamos si hemos pulsado boton de operacion
        operate = true;
        newNumber = true;
        lastValue = operation.innerHTML;
    } else{
        operate = false;
    }
}

function operationZero(){
    if (!operate) {
        if(button == "."){
            operation.innerHTML = 0 + button;
        }else{
            operation.innerHTML = button;
        }
    }else if(operate && total!= 0 && total != 'undefined'){
        operation.innerHTML = total + button;
    }else{
        operation.innerHTML = "0";
    }
}

function operationNoZero(){
    if (operate == true && lastOperate == false){
        operation.innerHTML += button;
    }else if(screenResult.innerHTML.length<13 && operate == false){
        operation.innerHTML += button;
    }
}

function screenResultZero(){
    if(button == "."){
        screenResult.innerHTML = "0" + button;
    }else if(!operate){
        screenResult.innerHTML = button;
    }else{
        screenResult.innerHTML = "0";
    }
    newNumber = false;
}

function screenResultNoZero(){
    if(screenResult.innerHTML.length<13){
        screenResult.innerHTML += button;
    }
}

function result(){
    if (operation.innerHTML.length != ''){
        total = eval(operation.innerHTML)
        if (total <= "9999999999999"){
            
            screenResult.innerHTML = total;
            if(screenResult.innerHTML.length>13){
                screenResult.innerHTML = screenResult.innerHTML.substring(0,14);
                total = screenResult.innerHTML;
            } 
        }else{
            screenResult.innerHTML = "Error";
        }             
    }else{
        screenResult.innerHTML = "0";
    } 
    operation.innerHTML = "0";
    lastValue = "0";
    newNumber = true;
}

function clearFunction(clearComand){

    console.log("pressed!");
    console.log(clearComand);

    switch (clearComand){
        case 'C':
            operation.innerHTML = lastValue;
            screenResult.innerHTML = 0;
            break;
        case 'AC':
            operation.innerHTML = 0;
            screenResult.innerHTML = 0;
            lastValue = 0;
            break;
    }
}

function clicked(id){
    id.style.boxShadow = "inset 2px 2px lightgray";
}

function unclicked(id){
    id.style.boxShadow = "2px 2px lightgray";
}
