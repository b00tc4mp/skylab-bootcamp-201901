let num1 
let num2
let operator = ''


function  show(item){
    
    num2 = parseFloat(document.getElementById("results").innerHTML += item) 
   
    if(item === '+' || item === '-' || item === 'x' || item === '/'){
        operator = item
        document.getElementById("results").innerHTML = ''
        num1 = num2      
    } 
    return num1 , num2 , operator
}

function calculator(){
    let sum = num1 + num2
    let subs = num1 - num2
    let mult = num1 * num2
    let div = num1 / num2

    if(operator === '+'){
        if(Number.isInteger(num1 + num2) === true){
            document.getElementById("results").innerHTML = sum
        }else{
            document.getElementById("results").innerHTML = sum.toFixed(8)
        }
    }else if(operator === '-'){
        if(Number.isInteger(num1 - num2) === true){
            document.getElementById("results").innerHTML = subs
        }else{
            document.getElementById("results").innerHTML = subs.toFixed(8)
        }
    }else if(operator === 'x'){
        if(Number.isInteger(num1 * num2) === true){
            document.getElementById("results").innerHTML = mult
        }else{
            document.getElementById("results").innerHTML = mult.toFixed(8)
        }
    }else if(operator === '/'){
        if(Number.isInteger(num1 / num2) === true){
            document.getElementById("results").innerHTML = div
        }else{
            document.getElementById("results").innerHTML = div.toFixed(8)
        }
    }
}

function reset(){
    document.getElementById("results").innerHTML = ''
}

