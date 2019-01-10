
var result = ""

/*push numbers*/

function pushnumber(id){
    var result = document.getElementById('display').value;
    if (id === '0'){                                                /* entre '' pq ho passem a un string*/
        parseInt(document.getElementById('display').value=result + "0");
        result += '0';                                              /* el += afegeix a l'string sense comes => 3+4*/ 
    }else if(id === '1'){
        parseInt(document.getElementById('display').value=result + "1");
        result += '1';
    }else if(id === '2') {
        parseInt(document.getElementById('display').value=result + "2");
        result += '2';      
    }else if(id === '3') {
        parseInt(document.getElementById('display').value=result + "3");
        result += '3';      
    }else if(id === '4') {
        parseInt(document.getElementById('display').value=result + "4");
        result += '4';    
    }else if(id === '5') {
        parseInt(document.getElementById('display').value=result + "5");
        result += '5';  
    }else if(id === '6') {
        parseInt(document.getElementById('display').value=result + "6");
        result += '6';   
    }else if(id === '7') {
        parseInt(document.getElementById('display').value=result + "7");
        result += '7';    
    }else if(id === '8') {
        parseInt(document.getElementById('display').value=result + "8");
        result += '8';  
    }else if(id === '9') {
        parseInt(document.getElementById('display').value=result + "9");
        result += '9';         
    }
}

nextOperand = 0

function operation(id){
    
    var result = document.getElementById('display').value;
    if (id === '+'){
        parseInt(document.getElementById('display').value=result + "+");
        result += '+';
        nextOperand += 1;
    }else if (id === '-'){
        parseInt(document.getElementById('display').value=result + "-");
        result += '-'; 
        nextOperand += 1;
    }else if (id === 'x'){
        parseInt(document.getElementById('display').value=result + "x");
        result += 'x';
        nextOperand += 1;
    }else if (id === '/'){
        parseInt(document.getElementById('display').value=result + "/");
        result += '/';
        nextOperand += 1;
    }else if (id === '.'){
        parseInt(document.getElementById('display').value=result + ".");
        result += '.';    
    }else if (id === '√'){
        parseInt(document.getElementById('display').value=result + "√");
        result += '√';
    }else if (id === '<='){
        display.value = display.value.substring(0, display.value.length -1);  
    }else if (id === 'AC'){
        display.value = "";
        finalresult.value = "";
        nextOperand = 0;
    }
}


function calculate(){
   
    var result = document.getElementById('display').value;
    result = result.replace(/x/g, "*");

    if (nextOperand >=2){
        final = eval(result)
        finalresult.value = Math.round((final)*1000)/1000;

    }else if (result.indexOf("+") !== -1){
        numOperand= result.indexOf("+");
        var num1 = parseFloat(result.slice(0,numOperand))
        var num2 = parseFloat(result.slice(numOperand+1, result.length))
        finalresult.value =  Math.round((num1 + num2)*1000)/1000;
        }else if(result.indexOf("-") !== -1){
        numOperand= result.indexOf("-");
        var num1 = parseFloat(result.slice(0,numOperand))
        var num2 = parseFloat(result.slice(numOperand+1, result.length))
        finalresult.value =  Math.round((num1 - num2)*1000)/1000;

        }else if(result.indexOf("*") !== -1){
        numOperand= result.indexOf("*");
        var num1 = parseFloat(result.slice(0,numOperand))
        var num2 = parseFloat(result.slice(numOperand+1, result.length))
        finalresult.value =  Math.round((num1 * num2)*1000)/1000;

        }else if(result.indexOf("/") !== -1){
        numOperand= result.indexOf("/");
        var num1 = parseFloat(result.slice(0,numOperand))
        var num2 = parseFloat(result.slice(numOperand+1, result.length))
        if (num1 === 0 && num2 === 0){
            finalresult.value = "Infinity"
        }else{
            finalresult.value =  Math.round((num1 / num2)*1000)/1000;
        }
        }else if(result.indexOf("√") !== -1){
        numOperand= result.indexOf("√");
        var num1 = parseFloat(result.slice(0,numOperand))
        finalresult.value = Math.round(Math.sqrt(num1)*1000)/1000;
    }
 
}




