//a)Declara tu nombre y muéstralo por consola:
var name = "Clara";
console.log(name) 

//b)Declara tu edad y muéstralo por consola:

var age = 32
console.log(age)

/*c)Declara tu nombre, tu apellido y tu edad en un array en diferentes posiciones y muéstrala por consola:
['Mark', 'Zuckerberg', 21]*/

var info = ["Clara", "Rufí", 32]
console.log(info) 

//d)Declara tu nombre y tu edad dentro de un objeto y muéstralo por consola:
/*{ name: 'Mark', age: 21}*/

var data = {name: "clara", age: 31};
console.log(data) 

//e)Ahora utiliza el array que has creado anteriormente para recorrerlo y mostrar una a una todas las posiciones del array.
/*
'Mark'
'Zuckerberg'
/21*/

var info = ["Clara", "Rufí", 32]
for (var i=0; i<info.length; i++){
    console.log(info[i]);
}
Clara
VM26:3 Rufí
VM26:3 32

/*f) Crea una estructura condicional que imprima el número mayor entre dos números.
var a = 25
var b = 12
if( a < b) ...
25*/

var a = 25
var b = 12

if (a<b){
    console.log(b)
}else{
    console.log(a)
}

/*f1) Crea otra condicion else if para contemplar la posibilidad de que los dos números sean iguales:
var a = 25
var b = 12
else if(...)
The numbers are equal*/


var a = 25
var b = 12
if (a===b){
    console.log("The numbers are equal")
}else if (a>b){
    console.log(a)
}else{
    console.log(b)
}

/*g) Crea una array de 5 numeros, y recorrela, mostrando además un mensaje cuando, esté a la mitad, muestre un mensaje 
'We are in the middle of loop'.

for(...){
    if(...){"We are in the middle of loop"}
}*/

var numbers = [1,2,3,4,5];
for(var i=0; i<=4; i++){
    if(i ===2){
        console.log("We are in the middle of loop");
    }else{
        console.log(numbers[i]);
    }
}

/*g1) Declara tu nombre y tu edad dos variables y crea un condicional para, en caso de no coincidir con tus datos, 
mostrar un error
Hint: https://www.w3schools.com/js/js_comparisons.asp (Logical Operators section)

var myName...
var myAge...
if(oneThing && otherThing...){"this is not you!"}
else{"Hi!! Glad to see u again!"}*/


var myName = "Clara";
var myAge = 32;

if(myName != "Clara" && myAge === 32){
    console.log("This is not you")
}else if(myName === "Clara" && myAge != 32){
    console.log("This is not you")   
}else{
    console.log("Hi!! Glad to see u again!");
}


/*h) Declara tu nombre y DNI en dos variables y crea un condicional para, en caso de que coincida uno de los dos datos, 
muestre un mensaje.

var myName...
var myId...
if(oneThing || otherThing...){console.log("Permission granted");}
else{console.log("Try again.");}*/

var myName = "Clara";
var myID = "47732058C";

if(myName ==="Clara" || myID === "47732058C"){
    console.log("Permission granted")
}else{
    console.log("Try again.");
}


/*i) Crea una array, introduce los datos anteriores y unos cuantos más de forma que al recorrer la array, 
muestre un mensaje cuando encuentre tus datos.

for(...){
   if(...){"We find your data!" + data[...]}
}*/


var data = ["Clara", "Ironman", 32, "Jofre", "Barcelona", 22 , "Hulk", "Londres", "Rufi"];

for (var i=0; i<data.length; i++){
    if(data[i]==="Clara"){
        console.log("We find your data! " + data[i]);
    }else if (data[i]==="Rufi"){
        console.log("We find your data! " + data[i]);
    }else if (data[i]=== 32){
        console.log("We find your data! " + data[i]);
    }else if (data[i]=== "Barcelona"){
        console.log("We find your data! " + data[i]);    
    }
 }

 We find your data! Clara
VM269:9 We find your data! 32
VM269:11 We find your data! Barcelona
VM269:7 We find your data! Rufi


 /*j) Crea un array de strings y recorre cada una de esos valores. Imprime cada caracter en una línea distinta.

var arr = ["hello","world","Skylab"];
for (var i = 0; i<arr.length;i++) {
    for (...) {
        console.log(...);
    }
}*/

var data = ["Clara", "cats", "Skylab", "Barcelona"];
var data = data.join("")

i si provem de fer split tb?podriem fer i<data.length???

for (var i=0; i<1; i++){
    for (var j=0; j<data.length; j++)
    console.log(data[j])
}

        C
VM706:6 l
VM706:6 a
VM706:6 r
VM706:6 a
VM706:6 c
VM706:6 a
VM706:6 t
VM706:6 s
VM706:6 S
VM706:6 k
VM706:6 y
VM706:6 l
VM706:6 a
VM706:6 b
VM706:6 B
VM706:6 a
VM706:6 r
VM706:6 c
VM706:6 e
VM706:6 l
VM706:6 o
VM706:6 n
VM706:6 a