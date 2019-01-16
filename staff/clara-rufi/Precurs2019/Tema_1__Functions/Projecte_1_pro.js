/*Podrías hacer que le calculadora relizara operaciones sean cuales sean el numero de argumentos pasados a la funcion?

function sum() {
    var acc = 0;

    for (num in arguments) {
        console.log(num);

        acc += arguments[num];
    }

    return acc;
}

sum(2, 3, 4); // acc = 9
Después de hacer todas las operaciones, el programa deberá preguntar al usuario si desea volver a realizar otra operación,
volviendo a almacenar más resultados y mostrándolos.

calculator(n1,n2);

//Output => sum, subs, mult, div...
prompt("New numbers? y/n")
    Case "y" => calculator(n1,n2)
                //Output => sum1, subs1, mult1, div1, sum2, subs2, mult2, div2...
    Case "n" => "Bye!"*/



// les funcions per separat em funcionen, però posades a una funció general, no se com fer q funcioni.
//i si l'usuari, vol continuar introduint numeros, a on els posa?
var number1 = 5;
var number2 = 3;   
function result(number1, number2){
    
    function sum(){
        var acc = arguments[0];
        for (var i=1; i<arguments.length; i++){
        acc += arguments[i]  
        }
        return acc
    }
    
    function rest(){
        var acc = arguments[0];
        for (var i=1; i<arguments.length; i++){
        acc -= arguments[i]  
        }
        return acc
    }
    
    function mult(){
        var acc = arguments[0];
        for (var i=1; i<arguments.length; i++){
        acc *= arguments[i]   
        }
        return acc
    }
    
    function div(){
        var acc = arguments[0];
        for (var i=1; i<arguments.length; i++){
        acc /= arguments[i]  
        }
        return acc
    }


    sum(number1, number2);
    rest(number1, number2);
    mult(number1, number2);
    div (number1, number2);
}
console.log(result(2,3,4));  




///////////////////////////////////////////

function result(){
    
    function sum(){
        var acc = arguments[0];
        for (var i=1; i<arguments.length; i++){
        acc += arguments[i]  
        }
        return acc
    }
    
    function rest(){
        var acc = arguments[0];
        for (var i=1; i<arguments.length; i++){
        acc -= arguments[i]  
        }
        return acc
    }
    
    function mult(){
        var acc = arguments[0];
        for (var i=1; i<arguments.length; i++){
        acc *= arguments[i]   
        }
        return acc
    }
    
    function div(){
        var acc = arguments[0];
        for (var i=1; i<arguments.length; i++){
        acc /= arguments[i]  
        }
        return acc
    }


    sum();
    rest();
    mult();
    div ();
}

result(2,3,4);  


















    function rest(){
        var acc = arguments[0];
        for (var i=1; i<arguments.length; i++){
        acc -= arguments[i]  
        }
        return acc
    }
    rest(2,3,4)

    function mult(){
        var acc = arguments[0];
        for (var i=1; i<arguments.length; i++){
        acc *= arguments[i]   
        }
        return acc
    }
    mult(2,3,4)


    function div(){
        var acc = arguments[0];
        for (var i=1; i<arguments.length; i++){
        acc /= arguments[i]  
        }
        return acc
    }
    div(2,3,4)
    





    var number1 = 5;
    var number2 = 3;   
    function result(number1, number2){
        function sum(){
            var acc = arguments[0];
            for (var i=1; i<arguments.length; i++){
            acc += arguments[i]  
            }
            return acc
        }
        sum(number1, number2);
        function rest(){
            var acc = arguments[0];
            for (var i=1; i<arguments.length; i++){
            acc -= arguments[i]  
            }
            return acc
        }
        rest(number1, number2);
        function mult(){
            var acc = arguments[0];
            for (var i=1; i<arguments.length; i++){
            acc *= arguments[i]   
            }
            return acc
        }
        mult(number1, number2);
        function div(){
            var acc = arguments[0];
            for (var i=1; i<arguments.length; i++){
            acc /= arguments[i]  
            }
            return acc
        }
        div (number1, number2);
    }
    console.log(result); 




    var number1 = 5;
    var number2 = 3;   
    function result(number1, number2){
        function sum(number1, number2){
            var acc = arguments[0];
            for (var i=1; i<arguments.length; i++){
            acc += arguments[i]  
            }
            return acc
        } 
    }
    sum(2,3,4)