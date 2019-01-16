
function sum(num1, num2){
    var r = num1 + num2;
    return num1 + '+' + num2 + '=' + r;
}

function restar(num1, num2){
    var r = num1 - num2;
    return num1 + '-' + num2 + '=' + r;
}

function multiplicacion(num1, num2){
    var r = num1 * num2;
    return num1 + '*' + num2 + '=' + r;
}

function division(num1, num2){
    var r = num1 / num2;
    if(isNaN(r)){
        r="indefinido";
       return num1 + "/" + num2 + "=" + r;
    }else{
        return num1 + '/' + num2 + '=' + +r.toFixed(3);
    }
}

function raiz(num1){
    var r= Math.sqrt(num1);
    return +r.toFixed(3);
}

function total(num1, num2){
        if(num1==null || num2==null){
            if(typeof num1 !=='number'){
                console.log("Esto no es un numero");
            }else{
                console.log(raiz(num1));
            } 
        }else if(typeof num1 === 'number'&& typeof num2==='number'){
        var arr = [sum(num1,num2), restar(num1, num2), multiplicacion(num1, num2), division(num1, num2)];
        console.log(arr);
        }else{
            console.log('Esto no es un numero');
        }
   
}

total ('pepe');