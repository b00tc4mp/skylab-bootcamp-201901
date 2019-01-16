/*a) Escribe una funcion en la que, declarando una array con los numeros del 1 al 9, muestres por pantalla los numeros 
unidos por parejas (1-2, 2-3, 3-4...), además, cada elemento de la pareja deberá estar multiplicada por 2.

function showNums(){
    var nums = [1,2,3,4,5,6,7,8,9]
    for(var i = 0; i < nums.length-1; i++){
        var pairs = []
        ...
    }
}
// output =>
//1ª pareja 2 - 4
//2ª pareja 4 - 6
//3ª pareja 6 - 8
//4ª pareja 8 - 10
//5ª pareja 10 - 12
//6ª pareja 12 - 14
//7ª pareja 14 - 16
//8ª pareja 16 - 18*/


function showNums(){
    var nums = [1,2,3,4,5,6,7,8,9]
    for(var i=0; i<nums.length-1; i++){
        console.log(i+1 + "ª pareja " + nums[i]*2 + " - " + nums[i +1]*2)
    }
}
showNums();

VM71:4 1ª pareja 2 - 4
VM71:4 2ª pareja 4 - 6
VM71:4 3ª pareja 6 - 8
VM71:4 4ª pareja 8 - 10
VM71:4 5ª pareja 10 - 12
VM71:4 6ª pareja 12 - 14
VM71:4 7ª pareja 14 - 16
VM71:4 8ª pareja 16 - 18


/*a1) La funcion debería aceptar la array a tratar como argumento.

function showNums(1,2,3,4,5){
    var nums = arguments...
    nums.map(...)
}
// output =>
// 1ª pareja 2 - 4
// 2ª pareja 4 - 6
// 3ª pareja 6 - 8
//...*/

function showNums(){  
    for(var i=0; i<arguments.length-1; i++){
        console.log(i+1 + "ª pareja " + arguments[i]*2 + " - " + arguments[i +1]*2)
    }
}
showNums(1,2,3,4,5,6,7,8,9,10,11,12)

1ª pareja 2 - 4
VM565:3 2ª pareja 4 - 6
VM565:3 3ª pareja 6 - 8
VM565:3 4ª pareja 8 - 10
VM565:3 5ª pareja 10 - 12
VM565:3 6ª pareja 12 - 14
VM565:3 7ª pareja 14 - 16
VM565:3 8ª pareja 16 - 18
VM565:3 9ª pareja 18 - 20
VM565:3 10ª pareja 20 - 22
VM565:3 11ª pareja 22 - 24

// o bé, utilitzant el map()

function showNums(){  
    nums = [1,2, 3,4,5,6,7,8,9,10,11,12]
    var numbers = nums.map(function(nums){
        return nums *2       
    });
    for(var i=0; i<numbers.length-1; i++){
        console.log(i+1 + "ª pareja " + numbers[i] + " - " + numbers[i +1])
    }
}    
showNums();

VM938:7 1ª pareja 2 - 4
VM938:7 2ª pareja 4 - 6
VM938:7 3ª pareja 6 - 8
VM938:7 4ª pareja 8 - 10
VM938:7 5ª pareja 10 - 12
VM938:7 6ª pareja 12 - 14
VM938:7 7ª pareja 14 - 16
VM938:7 8ª pareja 16 - 18
VM938:7 9ª pareja 18 - 20
VM938:7 10ª pareja 20 - 22
VM938:7 11ª pareja 22 - 24


/*a2) Pasa también el numero a multiplicar a la función como argumento

function showNums(1,2,3,4,5,...,12){ //<= el último número de arguments lo podemos tratar como el numero multiplicador...
}
// output =>
// El numero escogido es: 12
// 1ª pareja 12 - 24
// 2ª pareja 24 - 36
// 3ª pareja 36 - 48
// 4ª pareja 48 - 60
// 5ª pareja 60 - 72
// ...*/

function showNums(){
	console.log("el número escogido es: " + [arguments.length])  
    for(var i=0; i<arguments.length-1; i++){
        console.log( i+1 + "ª pareja " + arguments[i]*[arguments.length] + " - " + arguments[i +1]*[arguments.length])
    }
}
showNums(1,2,3,4,5,6,7,8,9,10,11,12)

VM1057:2 el número escogido es: 12
VM1057:4 1ª pareja 12 - 24
VM1057:4 2ª pareja 24 - 36
VM1057:4 3ª pareja 36 - 48
VM1057:4 4ª pareja 48 - 60
VM1057:4 5ª pareja 60 - 72
VM1057:4 6ª pareja 72 - 84
VM1057:4 7ª pareja 84 - 96
VM1057:4 8ª pareja 96 - 108
VM1057:4 9ª pareja 108 - 120
VM1057:4 10ª pareja 120 - 132
VM1057:4 11ª pareja 132 - 144  //el número 12 no el passo a multiplicar per 12. 12 és el multiplicador.


/*a3) La función debería ser capaz de recibir el numero de parejas que queremos devolver del total.

function showNums(1,2,3,4,5,...,12, 3){ // <= ahora, el último numero lo podriamos tomar como el delimitador
}
// output =>
// El numero escogido es: 12
// Se quieren mostrar las 3 primeras parejas
// 1ª pareja 12 - 24
// 2ª pareja 24 - 36
// 3ª pareja 36 - 48*/


function showNums(){
    var last = arguments.length-1
    console.log("El número escogido es: " + [arguments.length-1])  
    console.log("Se quieren mostrar las " + arguments[last] + " primeras parejas") 
    for(var i = 0; i<3; i++){
        console.log( i+1 + "ª pareja " + arguments[i]*[arguments.length-1] + " - " + arguments[i +1]*[arguments.length-1])
    }
}
showNums(1,2,3,4,5,6,7,8,9,10,11,12, 3)

El número escogido es: 12
VM1653:4 Se quieren mostrar las 3 primeras parejas
VM1653:6 1ª pareja 12 - 24
VM1653:6 2ª pareja 24 - 36
VM1653:6 3ª pareja 36 - 48

/*b) Volvemos a la numeros... Podrias hacer una funcion que mostrara por pantalla la serie Fibonacci? 
https://www.mathsisfun.com/numbers/fibonacci-sequence.html

function fibo(){}
// output: 0 1 1 2 3 5 8...*/

function fibo(){
    let number = [0,1];
    for (var i=0; i<20; i++){
        var number2 = number[i] + number[i+1]
        number.push(number2)
    }
    console.log(number);
    }
    fibo();

    //[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946]


    /*b2) Puedes añadir además, la posición de cada resultado?*/

function fibo(){
    console.log("Posición 0 => 0");
    console.log("Posición 1 => 1");
	let number = [0,1]
    for (var i=0; i<20; i++){
        var resultFibo = number[i] + number[i+1]
        number.push(resultFibo);
        console.log("Posición " + (2+i) + " => " + resultFibo);   
    }
    }
    fibo();  

            Posición 0 => 0
    VM203:3 Posición 1 => 1
    VM203:8 Posición 2 => 1
    VM203:8 Posición 3 => 2
    VM203:8 Posición 4 => 3
    VM203:8 Posición 5 => 5
    VM203:8 Posición 6 => 8
    VM203:8 Posición 7 => 13
    VM203:8 Posición 8 => 21
    VM203:8 Posición 9 => 34
    VM203:8 Posición 10 => 55
    VM203:8 Posición 11 => 89
    VM203:8 Posición 12 => 144
    VM203:8 Posición 13 => 233
    VM203:8 Posición 14 => 377
    VM203:8 Posición 15 => 610
    VM203:8 Posición 16 => 987
    VM203:8 Posición 17 => 1597
    VM203:8 Posición 18 => 2584
    VM203:8 Posición 19 => 4181
    VM203:8 Posición 20 => 6765
    VM203:8 Posición 21 => 10946

/*b3) Ahora, inserta los resultados en una array y muestralos todos juntos de una manera amigable.*/

function fibo(){
    resultFibo = ["Posición 0 => 0", " Posición 1 => 1 "];
    let number = [0,1]
    for (var i=0; i<20; i++){
        var result = number[i] + number[i+1]
        number.push(result);
        resFib = [" Posición " + (2+i) + " => " + result + " "]; 
        resultFibo += resFib;  
    }
    console.log(resultFibo);
    }
    fibo();  

    Posición 0 => 0, Posición 1 => 1  Posición 2 => 1  Posición 3 => 2  Posición 4 => 3  Posición 5 => 5  Posición 6 => 8  Posición 7 => 13  
    Posición 8 => 21  Posición 9 => 34  Posición 10 => 55  Posición 11 => 89  Posición 12 => 144  Posición 13 => 233  
    Posición 14 => 377  Posición 15 => 610  Posición 16 => 987  Posición 17 => 1597  Posición 18 => 2584  Posición 19 => 4181  
    Posición 20 => 6765  Posición 21 => 10946 

    //en canvi, si fem:

    function fibo(){
        resultFibo = ["Posición 0 => 0", " Posición 1 => 1 "];
        let number = [0,1]
        for (var i=0; i<20; i++){
            var result = number[i] + number[i+1]
            number.push(result);
            resFib = [" Posición " + (2+i) + " => " + result + " "]; 
            resultFibo.push(resFib);  
        }
        console.log(resultFibo);
        }
        fibo();  
    
        (22) ["Posición 0 => 0", " Posición 1 => 1 ", Array(1), Array(1), Array(1), Array(1), Array(1), Array(1), Array(1),
        pero si en el console.log("result" + resultFibo):

        function fibo(){
            resultFibo = ["Posición 0 => 0", " Posición 1 => 1 "];
            let number = [0,1]
            for (var i=0; i<20; i++){
                var result = number[i] + number[i+1]
                number.push(result);
                resFib = [" Posición " + (2+i) + " => " + result + " "]; 
                resultFibo.push(resFib);  
            }
            console.log("result: " + resultFibo);
            }
            fibo();  
    VM636:10 result: Posición 0 => 0, Posición 1 => 1 , Posición 2 => 1 , Posición 3 => 2 , Posición 4 => 3 , 
    Posición 5 => 5 , Posición 6 => 8 , Posición 7 => 13 , Posición 8 => 21 , Posición 9 => 34 , Posición 10 => 55 , 
    Posición 11 => 89 , Posición 12 => 144 , Posición 13 => 233 , Posición 14 => 377 , Posición 15 => 610 , Posición 16 => 987 ,
    Posición 17 => 1597 , Posición 18 => 2584 , Posición 19 => 4181 , Posición 20 => 6765 , Posición 21 => 10946 
 

/*b4) Ahora, el usuario debería ser capaz de especificar la posición de la serie hasta donde queremos llegar.

function fibo(10){}
//... 55 - pos 10º */

function fibo(userRound){
    resultFibo = ["Posición 0 => 0", " Posición 1 => 1 "];
    let number = [0,1]
    for (var i=0; i<25; i++){
        var result = number[i] + number[i+1]
        number.push(result); 
        round = 2+i
        if (round <=userRound){
            resFib = [" Posición " + round + " => " + result + " "];
        resultFibo += resFib;  
    }
    }
    console.log(resultFibo);
    }
    fibo(10); 

    Posición 0 => 0, Posición 1 => 1  Posición 2 => 1  Posición 3 => 2  Posición 4 => 3  Posición 5 => 5  Posición 6 => 8  
    Posición 7 => 13  Posición 8 => 21  Posición 9 => 34  Posición 10 => 55 

/*b5) Ahora, muestra los resultados en forma piramidal:

function fiboPymamid(num){}
0
0 1
0 1 1
0 1 1 2
0 1 1 2 3
0 1 1 2 3 5
0 1 1 2 3 5 8 //To position. num
0 1 1 2 3 5
0 1 1 2 3
0 1 1 2
0 1 1
0 1
0*/


function fiboPyramid(){
    let nu = [0]
    console.log(nu);
    let number = [0,1];
    console.log(number);
    
    for (var i=0; i<13; i++){
        var number2 = number[i] + number[i+1]
        number.push(number2)
        console.log(number);
    }
    	for (var j=0; number.length; j++){
        number.pop();
        console.log(number);	
    } 
   
}
fiboPyramid();

[0]
VM527:5 (2) [0, 1]
VM527:10 (3) [0, 1, 1]
VM527:10 (4) [0, 1, 1, 2]
VM527:10 (5) [0, 1, 1, 2, 3]
VM527:10 (6) [0, 1, 1, 2, 3, 5]
VM527:10 (7) [0, 1, 1, 2, 3, 5, 8]
VM527:10 (8) [0, 1, 1, 2, 3, 5, 8, 13]
VM527:10 (9) [0, 1, 1, 2, 3, 5, 8, 13, 21]
VM527:10 (10) [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
VM527:10 (11) [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
VM527:10 (12) [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
VM527:10 (13) [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
VM527:10 (14) [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
VM527:10 (15) [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]
VM527:14 (14) [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
VM527:14 (13) [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
VM527:14 (12) [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
VM527:14 (11) [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
VM527:14 (10) [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
VM527:14 (9) [0, 1, 1, 2, 3, 5, 8, 13, 21]
VM527:14 (8) [0, 1, 1, 2, 3, 5, 8, 13]
VM527:14 (7) [0, 1, 1, 2, 3, 5, 8]
VM527:14 (6) [0, 1, 1, 2, 3, 5]
VM527:14 (5) [0, 1, 1, 2, 3]
VM527:14 (4) [0, 1, 1, 2]
VM527:14 (3) [0, 1, 1]
VM527:14 (2) [0, 1]
VM527:14 [0]
VM527:14 []

/*c) Simple Scripting program. Crea un programa que transforme un número de 4 dígitos en otro diferente con las 
posiciones de los dígitos cambiadas, creandio un nuevo código. At Four call, should return the original value

var code = 3712;
function codeScript(code){}
//output:
 ⬇︎//First call to codeScript()
- 7123
 ⬇︎//Second call to codeScript()
- 1237
 ⬇︎//Third call to codeScript()
- 2371
// */

function codeScript(code){
console.log(code.split("")); //["3", "7", "1", "2"]

originalCode = []
for(var i=0; i<code.length; i++){
result = parseInt(code[i]);
originalCode.push(result);
}
console.log(originalCode); //[3, 7, 1, 2]

function firstCall(){
    first = originalCode.slice(1,4)
    first.push(originalCode[0]) 
    console.log("First: " + first); //[7, 1, 2, 3]
}
firstCall();

function secondCall(){
    second = first.slice(1,4)
    second.push(first[0]) 
    console.log("Second: " + second); //[1, 2, 3, 7]
}
secondCall();

function thirdCall(){
    third = second.slice(1,4)
    third.push(second[0]) 
    console.log("Third: " + third); //[1, 2, 3, 7]
}
thirdCall();

console.log("Original code: " + originalCode);
}
codeScript("3712");

/*2) Ahora, el usuario debería poder introducir como parámetro dos códigos a la vez y devolver los dos códigos 
encriptados (Los dos códigos se deberían encriptar en la misma función)

function codeScript(code1, code2){}*/

function codeScriptduo(code1, code2){
    console.log(code1.split("")); //["3", "7", "1", "2"]
    console.log(code2.split(""));

    originalCode1 = []
    originalCode2 = []
    for(var i=0; i<code1.length; i++){
    result = parseInt(code1[i]);
    originalCode1.push(result);
    }
    console.log(originalCode1); //[3, 7, 1, 2]
    
    for(var i=0; i<code2.length; i++){
        result2 = parseInt(code2[i]);
        originalCode2.push(result2);
        }
        console.log(originalCode2);
    function firstCall(){
        first = originalCode1.slice(1,4)
        first.push(originalCode1[0]) 
        console.log("Code1 => First: " + first); //[7, 1, 2, 3]
    }
    firstCall();
    function firstCall2(){
        first2 = originalCode2.slice(1,4)
        first2.push(originalCode2[0]) 
        console.log("Code2 => First: " + first2); //[7, 1, 2, 3]
    }
    firstCall2();
    
    function secondCall(){
        second = first.slice(1,4)
        second.push(first[0]) 
        console.log("Code1 => Second: " + second); //[1, 2, 3, 7]
    }
    secondCall();
    function secondCall2(){
        second2 = first2.slice(1,4)
        second2.push(first2[0]) 
        console.log("Code2 => Second: " + second2); //[1, 2, 3, 7]
    }
    secondCall2();
    function thirdCall(){
        third = second.slice(1,4)
        third.push(second[0]) 
        console.log("Code1 => Third: " + third); //[1, 2, 3, 7]
    }
    thirdCall();
    function thirdCall2(){
        third2 = second2.slice(1,4)
        third2.push(second2[0]) 
        console.log("Code2 => Third: " + third2); //[1, 2, 3, 7]
    }
    thirdCall2();
    console.log("Code1 =>Original code: " + originalCode1);
    console.log("Code2 =>Original code: " + originalCode2);
}
codeScriptduo("3712", "7894");

    Code1 => First: 7,1,2,3
    VM953:27 Code2 => First: 8,9,4,7
    VM953:34 Code1 => Second: 1,2,3,7
    VM953:40 Code2 => Second: 9,4,7,8
    VM953:46 Code1 => Third: 2,3,7,1
    VM953:52 Code2 => Third: 4,7,8,9
    VM953:55 Code1 =>Original code: 3,7,1,2
    VM953:56 Code2 =>Original code: 7,8,9,4


/*c3) Ahora, vamos a añadir un nivel más de seguridad. Despues de cambiar la posición de los dígitos, multiplicaremos 
a cada miembro por un numero cuya multiplicación no sea superior a 10. (Si es superior a 10, conseguiremos una 
multplicación de dos digitos y el código ya no sería de 4 valores)*/


function codeScript(code){
console.log(code.split("")); //["3", "7", "1", "2"]

originalCode = []
for(var i=0; i<code.length; i++){
result = parseInt(code[i]);
originalCode.push(result);
}
console.log(originalCode); 

function firstCall(){
    first = originalCode.slice(1,4)
    first.push(originalCode[0]) 
    console.log("First: " + first); 
    firstMult = first.map(function(first){
        return first*5
    });
    console.log("First mult by 5: " + firstMult);
}
firstCall();

function secondCall(){
    second = first.slice(1,4)
    second.push(first[0]) 
    console.log("Second: " + second); 
    secondMult = second.map(function(second){
        return second*5
    });
    console.log("Second mult by 5: " + secondMult);
}
secondCall();

function thirdCall(){
    third = second.slice(1,4)
    third.push(second[0]) 
    console.log("Third: " + third); 
    thirdMult = third.map(function(third){
        return third*5
    });
    console.log("Third mult by 5: " + thirdMult);
}
thirdCall();

console.log("Original code: " + originalCode);
}
codeScript("5679");

First: 6,7,9,5
VM976:18 First mult by 5: 30,35,45,25
VM976:25 Second: 7,9,5,6
VM976:29 Second mult by 5: 35,45,25,30
VM976:36 Third: 9,5,6,7
VM976:40 Third mult by 5: 45,25,30,35
VM976:44 Original code: 5,6,7,9

/*c4) Ahora, implementa en otra funcion aparte el decrypter(), que recibirá como argumento un código encriptado 
(y correspondientemente multiplicado en el apartado c3) y nos devuelva el código desencriptado.*/


function decrypter(code){
    numbertodecript = code
    let numDiv = numbertodecript.map(function(numbertodecript){
        return numbertodecript/5
    });
    function firstCall(){
        firstDecry= numDiv.slice(0,3)
        firstDecry.unshift(numDiv[3]) 
        console.log("First_Decript => " + firstDecry);
}
console.log("Num divided => " + numDiv)
firstCall();
    function secondCall(){
        secondDecry= firstDecry.slice(0,3)
        secondDecry.unshift(firstDecry[3]) 
        console.log("Second_Decript => " + secondDecry);
}
secondCall();
    function thirdCall(){
        thirdDecry= secondDecry.slice(0,3)
        thirdDecry.unshift(secondDecry[3]) 
        console.log("Third_Decript => " + thirdDecry);
        console.log("Code_Decrypted => " + thirdDecry);
}
thirdCall();
}
decrypter([45,25,30,35]);

Num divided => 9,5,6,7
VM1952:9 First_Decript => 7,9,5,6
VM1952:16 Second_Decript => 6,7,9,5
VM1952:22 Third_Decript => 5,6,7,9
VM1952:23 Code_Decrypted => 5,6,7,9

/*c5) Añade las dos funciones a la misma función padre, de forma que encripte y desencripte a la vez cuando termine de ejecutarse.
function codeScript(code1, code2){... codeDecrypt(code1Encrypt,code2Encrypt)}*/

function codeScriptduo(code1, code2){
    function codeDecriptduo(code1Encrypt, code2Encrypt){
    console.log ("ENCRIPTATION: ");
	console.log ("  ");
    code1.split("");
    code2.split("");

    originalCode1 = []
    originalCode2 = []
    for(var i=0; i<code1.length; i++){
    result = parseInt(code1[i]);
    originalCode1.push(result);
    }
    
    console.log("Code1 => Original code: " + originalCode1);
   
    for(var i=0; i<code2.length; i++){
        result2 = parseInt(code2[i]);
        originalCode2.push(result2);
        }
        
	console.log("Code2 => Original code: " + originalCode2);

    function firstCall(){
        first = originalCode1.slice(1,4)
        first.push(originalCode1[0]) 
        console.log("First_Encript => " + first); //[7, 1, 2, 3]
    }
    firstCall();
    function firstCall2(){
        first2 = originalCode2.slice(1,4)
        first2.push(originalCode2[0]) 
        console.log("First_Encript_2 => " + first2); //[7, 1, 2, 3]
    }
    firstCall2();
    
    function secondCall(){
        second = first.slice(1,4)
        second.push(first[0]) 
        console.log("Second_Encript => " + second); //[1, 2, 3, 7]
    }
    secondCall();
    function secondCall2(){
        second2 = first2.slice(1,4)
        second2.push(first2[0]) 
        console.log("Second_Encript_2 => " + second2); //[1, 2, 3, 7]
    }
    secondCall2();
    function thirdCall(){
        third = second.slice(1,4)
        third.push(second[0]) 
        console.log("Third_Encript => " + third); //[1, 2, 3, 7]
		thirdMult = third.map(function(third){
        return third*5
    });
    console.log("Third_Encript_mult by 5 => " + thirdMult);
}
    
    thirdCall();
    function thirdCall2(){
        third2 = second2.slice(1,4)
        third2.push(second2[0]) 
        console.log("Third_Encript_2 => " + third2); //[1, 2, 3, 7]
		thirdMult2 = third2.map(function(third2){
        return third2*5
    });
    console.log("Third_Encript_2_mult by 5 => " + thirdMult2);
}
    
    thirdCall2();
	
	console.log ("  ");
    console.log ("DESENCRIPTATION: ");
	console.log ("  ");
    code1Encrypt = thirdMult
    code2Encrypt = thirdMult2
    console.log("code1Encrypt => " + code1Encrypt)
    console.log("codeEncrypt_2 => " + code2Encrypt)
	
    let numDiv = code1Encrypt.map(function(code1Encrypt){
        return code1Encrypt/5
    });
	console.log("numDiv: " + numDiv)
	let numDiv2 = code2Encrypt.map(function(code2Encrypt){
        return code2Encrypt/5
    });
	console.log("numDiv2: " + numDiv2)

	function firstDecCall(){
        firstDecry= numDiv.slice(0,3)
        firstDecry.unshift(numDiv[3]) 
        console.log("First_Decript => " + firstDecry);
}
firstDecCall();
	function firstDecCall2(){
        firstDecry2= numDiv2.slice(0,3)
        firstDecry2.unshift(numDiv2[3]) 
        console.log("First_Decript_2 => " + firstDecry2);
}
firstDecCall2();
function secondDecCall(){
        secondDecry = firstDecry.slice(1,4)
        secondDecry.push(firstDecry[0]) 
        console.log("Second_Decript => " + secondDecry); //[1, 2, 3, 7]
    }
secondDecCall();
    function secondDecCall2(){
        secondDecry2 = firstDecry2.slice(1,4)
        secondDecry2.push(firstDecry2[0]) 
        console.log("Second_Decript_2 => " + secondDecry2); //[1, 2, 3, 7]
    }
secondDecCall2();
function thirdDecCall(){
        thirdDecry = secondDecry.slice(1,4)
        thirdDecry.push(secondDecry[0]) 
        console.log("Third_Decript =>  " + thirdDecry); //[1, 2, 3, 7]
    }
    thirdDecCall();
    function thirdDecCall2(){
        thirdDecry2 = secondDecry2.slice(1,4)
        thirdDecry2.push(secondDecry2[0]) 
        console.log("Third_Decript_2 => " + thirdDecry2); //[1, 2, 3, 7]
    }
    thirdDecCall2();

}
codeDecriptduo();
}
codeScriptduo("3712", "7894");

    
VM2847:3 ENCRIPTATION: 
VM2847:4   
VM2847:15 Code1 => Original code: 3,7,1,2
VM2847:22 Code2 => Original code: 7,8,9,4
VM2847:27 First_Encript => 7,1,2,3
VM2847:33 First_Encript_2 => 8,9,4,7
VM2847:40 Second_Encript => 1,2,3,7
VM2847:46 Second_Encript_2 => 9,4,7,8
VM2847:52 Third_Encript => 2,3,7,1
VM2847:56 Third_Encript_mult by 5 => 10,15,35,5
VM2847:63 Third_Encript_2 => 4,7,8,9
VM2847:67 Third_Encript_2_mult by 5 => 20,35,40,45
VM2847:72   
VM2847:73 DESENCRIPTATION: 
VM2847:74   
VM2847:77 code1Encrypt => 10,15,35,5
VM2847:78 codeEncrypt_2 => 20,35,40,45
VM2847:83 numDiv: 2,3,7,1
VM2847:87 numDiv2: 4,7,8,9
VM2847:92 First_Decript => 1,2,3,7
VM2847:98 First_Decript_2 => 9,4,7,8
VM2847:104 Second_Decript => 2,3,7,1
VM2847:110 Second_Decript_2 => 4,7,8,9
VM2847:116 Third_Decript =>  3,7,1,2
VM2847:122 Third_Decript_2 => 7,8,9,4


/*c6) El usuario podrá solo introducir letras, cada número del 0 al 9 corresponderá a varias letras. Podéis seguir este esquema.

var dictionary = {
    0: ['A', 'K', 'T', 'F', 'O', 'Y'],
    1: ['B', 'L', 'U', 'G', 'P', 'Z'],
    2: ['C', 'M', 'V', 'H', 'Q', '.'],
    3: ['D', 'N', 'W', 'I', 'R', ','],
    4: ['E', 'Ñ', 'X', 'J', 'S', ' '],
}
function codeScript("HI  ", "WE  ", "NEED", "HELP"){}
"HI__" = "dictionary[7][0]+dictionary[8][0]+dictionary[9][2]+dictionary[9][2]..."*/


var dictionary = [
    ['A', 'K', 'T', 'F', 'O', 'Y'],
    ['B', 'L', 'U', 'G', 'P', 'Z'],
    ['C', 'M', 'V', 'H', 'Q', '.'],
    ['D', 'N', 'W', 'I', 'R', ','],
    ['E', 'Ñ', 'X', 'J', 'S', ' ']
]

function codeScript(word){
codeArg =""
for(var p=0; p<arguments.length; p++){
codeArg += arguments[p] + " "
console.log("arg code => " + codeArg)
}
code = codeArg.split("");
console.log("code => " + code);
codeWord = []
encriptationScript = []
encriptationScript.push(code);
console.log("encriptationScript => " + encriptationScript);
for (var i= 0; i<codeArg.length; i++){
codeWord += codeArg[i]
}
console.log("codeWord => " + codeWord);

codePosition = "" 

for (var k= 0; k<codeWord.length; k++){
    for (var i=0; i<dictionary.length; i++){
        for (var j=0; j<dictionary[i].length; j++){
        if (codeWord[k] === dictionary[i][j]){
			
			numArray = dictionary.indexOf(dictionary[i])
            //console.log("Num array => " + numArray)
            posicio = dictionary[i].indexOf(codeWord[k])
            //console.log("Posició array => " + codeWord[k] + posicio)
            codePosition += "dictionary" + "[" + numArray + "]" + "[" + posicio + "]" 
        }

    }
}
}
console.log("codePosition => " + codePosition);
}
codeScript("HI  ", "WE  ", "NEED", "HELP")

/*codePosition => dictionary[2][3]dictionary[3][3]dictionary[4][5]dictionary[4][5]dictionary[4][5]dictionary[3][2]dictionary[4][0]
dictionary[4][5]dictionary[4][5]dictionary[4][5]dictionary[3][1]dictionary[4][0]dictionary[4][0]dictionary[3][0]dictionary[4][5]
dictionary[2][3]dictionary[4][0]dictionary[1][1]dictionary[1][4]dictionary[4][5]*/



/*d) Crea un programa que use la encriptacion Romana, como es? Si tenemos la palabra SKYLAB, la palabra encriptada será SLKAYB. 
Si divides la palabra original en 2 grupos obtienes:

SKY
LAB
Entonces, uniendo laletra i-ésima de cada grupo obtienes SLKAYB.

Entonces, el programa deberá recibir SKYLAB y retornar SLKAYB*/

function encript(str){
var partEnc1 = []
var partEnc2 = []
var newCode = []
for (var i=0; i<str.length; i++){
    if (i<3){
        partEnc1.push(str[i])
    }else{
        partEnc2.push(str[i])
    }
}
for (var i=0; i<partEnc1.length; i++){
    newCode.push(partEnc1[i])
    newCode.push(partEnc2[i])
}
console.log(newCode.join(""))
}
encript("SKYLAB"); //SLKAYB  

/*d2) Programa el desencriptador, pasa como parámetro SLKAYB y que devuelva SKYLAB.*/

function desencript(desencript){
    var partDes1 = []
    var partDes2 = []
    var partDes3 = []
    var newDesencript = []
    for (var i=0; i<desencript.length; i++){
        if (i<2){
            partDes1.push(desencript[i])
        }else if (i<4){
            partDes2.push(desencript[i])
        }else{
            partDes3.push(desencript[i])
    }
}
    for (var i=0; i<partDes1.length; i++){
        newDesencript.push(partDes1[i])
        newDesencript.push(partDes2[i])
        newDesencript.push(partDes3[i])
    }
    console.log(newDesencript.join(""))
}
desencript("SLKAYB") //SKYLAB

/*d3) Agrupa la función Encrypt y decrypt en una unica función, de forma que introduzcas como parámetro SKYLAB y 
devuelva SKYLAB (con todas las transformaciones internas hechas y mostrando, entre medias, la transformación)*/

function encriptDesencript(str){
    function encript(str){
        var partEnc1 = []
        var partEnc2 = []
        var newCode = []
        for (var i=0; i<str.length; i++){
            if (i<3){
                partEnc1.push(str[i])
            }else{
                partEnc2.push(str[i])
            }
        }
        for (var i=0; i<partEnc1.length; i++){
            newCode.push(partEnc1[i])
            newCode.push(partEnc2[i])
        }
        console.log("Código encriptado => " + newCode.join(""))
        }  
   

    function desencript(str){
        var partDes1 = []
        var partDes2 = []
        var partDes3 = []
        var newDesencript = []
        for (var i=0; i<str.length; i++){
            if (i<2){
                partDes1.push(str[i])
            }else if (i<4){
                partDes2.push(str[i])
            }else{
                partDes3.push(str[i])
        }
    }
        for (var i=0; i<partDes1.length; i++){
            newDesencript.push(partDes1[i])
            newDesencript.push(partDes2[i])
            newDesencript.push(partDes3[i])
        }
        console.log("Código desencriptado => " + newDesencript.join(""))
    }
  
    encriptar = encript(str)
    desencriptar = desencript(str)
    console.log(encriptar)
    console.log(desencriptar)
    }
encriptDesencript("SKYLAB");

//

function encriptDesencript(str){
    function encript(){
        var partEnc1 = []
        var partEnc2 = []
        var newCode = []
        for (var i=0; i<str.length; i++){
            if (i<3){
                partEnc1.push(str[i])
            }else{
                partEnc2.push(str[i])
            }
        }
        for (var i=0; i<partEnc1.length; i++){
            newCode.push(partEnc1[i])
            newCode.push(partEnc2[i])
        }
        console.log("Código encriptado => " + newCode.join(""))
        }  
    encript();

    function desencript(){
        var partDes1 = []
		console.log(partDes1);
        var partDes2 = []
		console.log(partDes2);
        var partDes3 = []
		console.log(partDes3);
        var newDesencript = []
        for (var i=0; i<str.length; i=i+2){
		console.log("str => " + str);
            if (i<2){
                partDes1.push(str[i])
            }else if (i<4){
                partDes2.push(str[i])
            }else{
                partDes3.push(str[i])
        }
    }
        for (var i=0; i<partDes1.length; i++){
            newDesencript.push(partDes1[i])
            newDesencript.push(partDes2[i])
            newDesencript.push(partDes3[i])
        }
        console.log("Código desencriptado => " + newDesencript.join(""))
    }
    desencript();
    }
encriptDesencript("SKYLAB");

////


function encriptDesencript(str){
    
    function encript(){
        var partEnc1 = []
        var partEnc2 = []
        var newCode = []
        for (var i=0; i<str.length; i++){
            if (i<str.length/2){
                partEnc1.push(str[i])
            }else{
                partEnc2.push(str[i])
            }
        }
        for (var i=0; i<partEnc1.length; i++){
            newCode.push(partEnc1[i])
            newCode.push(partEnc2[i])
        }
        console.log("Código encriptado => " + newCode.join(""))
        }  
   

    function desencript(encript){
        var partDes1 = []
		console.log(partDes1)
        var partDes2 = []
		console.log(partDes2)
        var partDes3 = []
		console.log(partDes3)
        var newDesencript = []
        for (var j=0; j<str.length; j++){
			console.log("str desencript => " + str);
            if (j<=1){
                partDes1.push(str[j])
            }else if (j<=3){
                partDes2.push(str[j])
            }else{
                partDes3.push(str[j])
        }
    }
        for (var m=0; m<partDes1.length; m++){
			console.log(partDes1.length)
            newDesencript.push(partDes1[m])
			console.log(partDes1[m])
            newDesencript.push(partDes2[m])
            newDesencript.push(partDes3[m])
        }
        console.log("Código desencriptado => " + newDesencript.join(""))
    }
  
    var encriptar = encript()
    var desencriptar = desencript()
    console.log(encriptar)
    console.log(desencriptar)
    }
encriptDesencript("SKYLAB");


//d4






















/*e) Crea un programa al que le introduces un número como parámetro del 0 al 100 y devuelve el número transformado a alfabeto normal, 
es decir:

sayItWithWords(5) => //output Five
sayItWithWords(23) => //output twenty-three
sayItWithWords(71) => //output seventy-one
Hint:

var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];*/

function sayItWithWords(number){
    var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
    var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
    firstNumber = []
    secondNumber = []
    resultUnits = units[number]
    
    if (number < 10){
		console.log(number);
        
        console.log("The number " + number + " in words is " + resultUnits)
    
    }else if (number > 10){
        var numberStr = number.toString().split('')

		for (var i =0; i<numberStr.length; i++){
			if(i<1){
			    firstNumber.push(numberStr[i])
    		}else{
			    secondNumber.push(numberStr[i])
   		 }
    }

	first = parseInt(firstNumber);
    console.log(first);
    second = parseInt(secondNumber);
    console.log(second);
    resultTeens = teens[second]

		if (number > 10 && number<20){
    	    console.log("The number " + number + " in words is " + resultTeens)
    	}else if(number>20){
            console.log("The number " + number + " in words is " + tens[first] + "-"+ units[second])
    }
    }
}
sayItWithWords(99)

/*e2) Ahora, el output debería ser capaz de, aparte de devolver el número traducido, devolver también los números por los 
que está formado:

sayItWithWords(5) => //output Five, five / 5
sayItWithWords(23) => //output twenty-three, twenty + three / 20 + 3
sayItWithWords(71) => //output seventy-one, seventy + one / 70 + 1*/

function sayItWithWords(number){
    var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
    var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
    firstNumber = []
    tensZero = []
    secondNumber = []
    resultUnits = units[number]
    
    if (number < 10){
		//console.log(number);
        console.log( resultUnits + ", " + resultUnits + " / " + number)
    
    }else if (number > 10){
        var numberStr = number.toString().split('')

		for (var i =0; i<numberStr.length; i++){
			if(i<1){
                firstNumber.push(numberStr[i])
                tensZero.push(numberStr[i] + 0)
                
    		}else{
			    secondNumber.push(numberStr[i])
   		 }
    }

    first = parseInt(firstNumber);
    //console.log(first);
    second = parseInt(secondNumber);
    //console.log(second);
    resultTeens = teens[second]

		if (number > 10 && number<20){
    	    console.log(resultTeens + " , " + resultTeens + " / " + tensZero + " + " + second)
    	}else if(number>20){
            console.log(tens[first] + "-" + units[second] + " , " + tens[first] + " + " + units[second] + " / " + tensZero + " + " + second)
    }
    }
}
sayItWithWords(29) //twenty-nine , twenty + nine / 20 + 9


/*e3) Cambia tu programa para que acepte cualquier número entre 0 y 1000.

sayItWithWords(500) => //output five hundred , five hundred  / 500
sayItWithWords(233) => //output two hundred thirty three, two hundred + thirty + three/ 200 + 30 + 3
sayItWithWords(498) => //output four hundred ninety eight, four hundred + ninety + eight/ 400 + 90 + 8*/

function sayItWithWords(number){
    var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
    var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
    
    firstNumber = []
    tensTen = []
    tensOneHundred = []
    Hundred = "hundred"
    secondNumber = []
    thirdNumber = []
    resultUnits = units[number]
    
    if (number < 10){
		//console.log(number);
        console.log( resultUnits + ", " + resultUnits + " / " + number)
    
    }else if (number > 10 && number <100){
        var numberStr = number.toString().split('')

		for (var i =0; i<numberStr.length; i++){
			if(i<1){
                firstNumber.push(numberStr[i])
                tensTen.push(numberStr[i] + 0)
    		}else if (i >0 && i <2){
                secondNumber.push(numberStr[i])
                
            }
        }
    }else if (number > 100){
        var numberStr = number.toString().split('')

        for (var i =0; i<numberStr.length; i++){
            if(i<1){
				firstNumber.push(numberStr[i])
                tensOneHundred.push(numberStr[i] + 0 + 0)
            }else if (i >0 && i <2){
				secondNumber.push(numberStr[i])
                tensTen.push(numberStr[i] + 0)  
            }else{
                thirdNumber.push(numberStr[i])
                }
            }
    }
    first = parseInt(firstNumber);
    //console.log(first);
    second = parseInt(secondNumber);
    //console.log(second);
    third = parseInt(thirdNumber)
	//console.log(third);
    resultTeens = teens[second]
    //console.log("tensTen => " + tensTen)
    //console.log("tensOneHundred => " + tensOneHundred)
        
		if (number > 10 && number<20){
    	    console.log(resultTeens + " , " + resultTeens + " / " + tensTen + " + " + second)
    	}else if(number>20 && number<100){
            console.log(tens[first] + "-" + units[second] + " , " + tens[first] + " + " + units[second] + " / " + tensTen + " + " + second)

		}else if(number> 100 &&  second === 0 && third=== 0){
			console.log("a => " + number)
             console.log(units[first] + " " + Hundred + units[third] + " , " + units[first] + " " +
            Hundred  + units[third] + "/ " + tensOneHundred ) 

        }else if(number> 100 &&  second === 0 && third !== 0){
			console.log("b => " + number)
            console.log(units[first] + " " + Hundred + " " + units[third] + " , " + units[first] + " " +
            Hundred + " + " + units[third] + "/ " + tensOneHundred + " + " + third )
		}else if(number> 100 && second === 1 && third !== 0) {
			console.log("e => " + number)
			console.log(number);
            console.log(units[first] + " " + Hundred + " " + teens[third] + " , " + units[first] + " " +
            Hundred + " + " + teens[third] + "/ " + tensOneHundred + " + " + tensTen + " + " + third )
        
		}else if(number> 100 &&  second !== 0 && third === 0){
			console.log("c => " + number)
            console.log(units[first] + " " + Hundred + " " + tens[second] + ", " + units[first] + " " +
            Hundred + " + " + tens[second] + "/ " + tensOneHundred + " + " + tensTen )  

        }else if(number> 100 && second !== 0 && third !== 0) {
			console.log("d => " + number)
			console.log(number);
            console.log(units[first] + " " + Hundred + " " + tens[second] + " " + units[third] + " , " + units[first] + " " +
            Hundred + " + " + tens[second] + " + " + units[third] + "/ " + tensOneHundred + " + " + tensTen + " + " + third )
        }
}
sayItWithWords(600) // six hundred , six hundred/ 600

/*f) Recibiendo el siguiente texto por parámetro a tu función... :

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
sunt in culpa qui officia deserunt mollit anim id est laborum.
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa 
quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas 
sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro 
quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt 
ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit 
laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil 
molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
Prepara dicha función para que modifique y devuelva el texto bajo estas reglas:
Signos de puntuación: -	"." => "," - "," => "" Palabras: - "dolor" => "potato" - "lorem" => "tomato" - "labor" => 
"cucumber" - "consequatur" => "garlic" - "ipsum" => "onion"*/


function text(definedtext){

    preconfiguredText = ""
    preconfiguredText += definedtext
    
    var replacedText = preconfiguredText.toLowerCase().replace(/\./g, ",").replace(/\,/g, " ").replace(/dolor/g, "potato").replace(/lorem/g, "Tomato").replace(/labor/g, "cucumber").replace(/consequatum/g, "garlic").replace(/ipsum/g, "onion");
    console.log(replacedText)
   }
   
  
text("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur");

/* replace => var replacedText = preconfiguredText.toLowerCase().replace(".", ",").replace(",", " ").replace("dolor", "potato")
només funciona 1vegada; fer .replace(/dolor/g, "potato") i funciona +d'1 vegada. 
quan s'ha de canviar el ., l'acaba canviant per una , */


/* Tomato onion potato sit amet  consectetur adipisicing elit  sed eiusmod tempor incididunt ut cucumbere et potatoe magna aliqua  
ut enim ad minim veniam  quis nostrud exercitation ullamco cucumberis nisi ut aliquip ex ea commodo consequat  duis aute irure 
potato in reprehenderit in voluptate velit esse cillum potatoe eu fugiat nulla pariatur  excepteur sint occaecat cupidatat non 
proident  sunt in culpa qui officia deserunt mollit anim id est cucumberum  sed ut perspiciatis unde omnis iste natus error sit 
voluptatem accusantium potatoemque laudantium  totam rem aperiam  eaque ipsa quae ab illo inventore veritatis et quasi architecto 
beatae vitae dicta sunt explicabo  nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit  sed quia consequuntur 
magni potatoes eos qui ratione voluptatem sequi nesciunt  neque porro quisquam est  qui potatoem onion quia potato sit amet  
consectetur  adipisci velit  sed quia non numquam eius modi tempora incidunt ut cucumbere et potatoe magnam aliquam quaerat 
voluptatem  ut enim ad minima veniam  quis nostrum exercitationem ullam corporis suscipit cucumberiosam  nisi ut aliquid ex ea 
commodi consequatur  quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur  vel 
illum qui potatoem eum fugiat quo voluptas nulla pariatur */


/*f1) Añade una funcionalidad que cuente cuantos cambios/coincidencias ha encontrado de cada palabra, 
y te los muestre de una forma amigable para el usuario*/

   

function words(definedtext){

    preconfiguredText = ""
    
    countDolor = 0
    countLorem = 0
    countLabor = 0
    countConsequatur = 0
    countIpsum = 0
    preconfiguredText += definedtext
    text = preconfiguredText.split(" ")  
	console.log("text => " + text);
	console.log(text.length);
  	console.log(preconfiguredText);
    for (var i=0; i<text.length; i++){
        
        if(text[i] === "dolor"){
        countDolor += 1
        }else if(text[i] === "lorem"){
        countLorem += 1
        }else if (text[i] === "labor"){
        countLabor += 1
        }else if (text[i] === "consequatur"){
		countConsequatur += 1
        }else if (text[i] === "ipsum"){	
         countIpsum += 1
        }    
    }

    
    console.log("La palabra " + "Dolor" + " se muestra => " + countDolor + " veces")
	console.log("La palabra " + "Lorem" + " se muestra => " + countLorem + " veces")
    console.log("La palabra " + "Labor" + " se muestra => " + countLabor + " veces")
    console.log("La palabra " + "Consequatur" + " se muestra => " + countConsequatur + " veces")
    console.log("La palabra " + "Ipsum" + " se muestra => " + countIpsum + " veces")
    
}


words("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur");


///////intentant fer un replace
/////

function text(definedtext){

    preconfiguredText = ""
    
    countDolor = 0
    countLorem = 0
    countLabor = 0
    countConsequatur = 0
    countIpsum = 0
    preconfiguredText += definedtext
    text = preconfiguredText.split(" ")
	console.log("text => " + text);
	console.log(text.length);
  	console.log(preconfiguredText);
    for (var i=0; i<text.length; i++){
        
        if(text[i] === "dolor"){
        replacedText = preconfiguredText.replace(/dolor/g, "potato")
        countDolor += 1
        }else if(text[i] === "lorem"){
        replacedText = preconfiguredText.replace(/lorem/g, "Tomato")
        countLorem += 1
        }else if (text[i] === "labor"){
        replacedText = preconfiguredText.replace(/labor/g, "cucumber")
        countLabor += 1
        }else if (text[i] === "consequatum"){
         replacedText = preconfiguredText.replace(/consequatum/g, "garlic")
		countConsequatur += 1
        }else if (text[i] === "ipsum"){
         replacedText = preconfiguredText.replace(/ipsum/g, "onion")	
         countIpsum += 1
        }    
    }
console.log("replacedText => " + replacedText)
    
    console.log("CountDolor => " + countDolor)
	console.log("CountLorem => " + countLorem)

    console.log("CountLabor => " + countLabor)
    console.log("CountConsequatur => " + countConsequatur)
    console.log("CountIpsum => " + countIpsum)
    
}

text("dolor dolor dolor lorem labor consequatum  ipsum ipsum dolor");