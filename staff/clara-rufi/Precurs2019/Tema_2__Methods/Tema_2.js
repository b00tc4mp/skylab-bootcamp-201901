
/*a) Puedes contar cuantas letras tiene tu nombre?
 My Name has 4 letters */

var myName = "Clara";

console.log("My name has " + myName.length + " letters") 

/*b) Añade tu apellido e indica en que posición del string empieza (prueba a buscar el espacio entre el nombre y el apellido):
Your last name starts on position 5*/

var myName = "Clara Rufí";
var myString = myName.indexOf(" ");
console.log("Your last name starts on position " + myString) //Your last name starts on position 5

/*c) Ahora, con tu apellido y nombre en la misma variable, muestra solo el nombre (lo que haya antes del espacio):
 My Name is Tony */

var myName = "Clara Rufí";
var space = myName.indexOf(" ") //Asi la variable myString puede funcionar con cualquier nombre, 1er mirando donde termina el espacio en blanco
var myString = myName.slice(0,space);
console.log("My name is " + myString) //My name is Clara

//d) Ahora, solo tu apellido.
    // My lastname is Stark

var myName = "Clara Rufí";
var space = myName.indexOf(" ")
var myString = myName.slice(space, myName.length);
console.log("My last name is" + myString); //My last name is Rufí

//d1) Iguala el resultado a una variable nueva e imprímela por pantalla.
    // Tony Stark, Stark

var myName = "Clara Rufí";
var myFirstString = "Clara Rufí";
var space = myFirstString.indexOf(" ") //Asi la variable myString puede funcionar con cualquier nombre, 1er mirando donde empieza el espacio en blanco
var myNewString = myFirstString.slice(space, myFirstString.length);
console.log(myFirstString +", " + myNewString)  //Clara Rufí,  Rufí


//e) Ahora, reemplaza tu nombre por "Mr/Ms" y vuelve a mostrar la variable con los cambios.
//console.log(myNewString) // Hello, Mr. Stark 

var myName = "Clara Rufí";
var myFirstString = "Mrs";
var space = myName.indexOf(" ")
var myNewString = myName.slice(space, myName.length);
console.log("Hello" +", " + myFirstString + myNewString); //Hello, Mrs Rufí

//f) Selecciona tu apellido y transfórmalo a MAYÚSCULAS.
//console.log(mySelection) // my lastname is STARK

var myName = "Clara Rufí";
var space = myName.indexOf(" ")
var myString = myName.slice(space, myName.length);
console.log("My last name is" + myString.toUpperCase()); //My last name is RUFÍ

//g) Ahora declara una variable nueva e igualala a la anterior variable sumándole, además, un mensaje.
//var something = myFirstString + "is awesome"
//console.log(something) \\ "Tony is awesome"

var myName = "Clara Rufí";
var space = myName.indexOf(" ")   
var myFirstString = myName.slice(0,space);
var meAwesome = myFirstString + " is awesome";
console.log(meAwesome) //Clara is awesome

//h) Ahora, puedes seleccionar la inicial de tu nombre y apellido y mostrarlas por pantalla?
//console.log(myFirstLastnameLetters) // S.Y

var myName = "Clara Rufí";
var space = myName.indexOf(" ");
var myFirstLastnameLetters = myName.charAt(0) + "." + myName.charAt(space +1);
console.log(myFirstLastnameLetters); //C.R



/*_________________________________________________________________________________________________________________________________*/  
ARRAYS
/*_________________________________________________________________________________________________________________________________*/  


//a) Declara tu nombre completo en una array y muéstralo por pantalla separando cada letra por "/"
//console.log(myName) // T/O/N/Y/S/T/A/R/K



var myName = ["Clara Rufí"];
var myName = myName[0]
myName = myName.replace(/\s/g,"");
myName = myName.split(""); //["C", "l", "a", "r", "a", "R", "u", "f", "í"]
myName = myName.join("/"); //"C/l/a/r/a/R/u/f/í"
console.log(myName.toUpperCase()); 

//o bé:

var myNameArray = ["Clara Rufí"];
myName = myNameArray[0].split(' ') // ['Clara', 'Rufí']
myName = myName.join('') // ['ClaraRufí']
myName = myName.split('') // ['C','l...]
myName = myName.join("/");
console.log(myName.toUpperCase()); // 'C/L/A/R/A/R/U/F/Í


//b) Ahora solo selecciona tu apellido y muestra cada letra separada por "|"
//console.log(myName) // S|T|A|R|K

var myName = ["Clara Rufí"];
var myNamestr = myName[0];
var positionLastName = myNamestr.indexOf(" ");
var lastName = myNamestr.slice(positionLastName +1, myNamestr.length);
var lastName = lastName.split ("");
var lastName = lastName.join ("|");
console.log(lastName.toUpperCase()); //R|U|F|Í


//c) Ahora muestra cada letra de tu nombre con su posición (necesitarás un bucle for)
//console.log(myName) // 1º T, 2º O, 3º N, 4º Y

var myCompleteName = ["Clara Rufí"];
var myCompleteNamestr = myCompleteName[0];
var positionName = myCompleteNamestr.indexOf(" ");
var name = myCompleteNamestr.slice(0, positionName);
var lettersName = [];
for( var i=0; i<name.length; i++){
    lettersName.push(i+1+"º" + " " + name[i].toUpperCase())
}

console.log(lettersName);  // ["1º C", "2º L", "3º A", "4º R", "5º A"]


//d)Como en el ejercicio anterior, pero seleccionando tu apellido
//console.log(myLastName) // 5º S, 6º T, 7º A, 8º R, 9º K

var myCompleteName = ["Clara Rufí"];
var myCompleteNamestr = myCompleteName[0];
var positionLastName = myCompleteNamestr.indexOf(" ");
var name = myCompleteNamestr.slice(positionLastName+1, myCompleteNamestr.length);
var lettersLastName = [];
for( var i=0; i<name.length; i++){
    lettersLastName.push(i+1+"º" + " " + name[i].toUpperCase())
}

console.log(lettersLastName); //["1º R", "2º U", "3º F", "4º Í"]

//e) Puedes indicarme las iniciales de tu nombre y apellido? Como en el ejercicio h de la sección de strings
//console.log(myInitials) // T.S

var myName = ["Clara Rufí"];
myName = myName[0];
var space = myName.indexOf(" ");
var myInitials = myName.charAt(0) + "." + myName.charAt(space +1);
console.log(myInitials); //C.R

/*f) Ahora, reformula la array, introduciendo tu nombre en primera posición, tu apellido en segunda, y además añade en otra posicion 
tu edad. Muestra por pantalla solo tu nombre y tu edad en un solo mensaje.
console.log(mySelector) // My name is TONY and i'm 40 years old*/

var mySelector = ["Clara", "Rufí", 32];

console.log("My name is " + mySelector[0].toUpperCase() + " and i'm " + mySelector[2] + " years old"); //My name is CLARA and i'm 32 years old

/*g) Prepara una función para añadir tu City a la array, muestra un mensaje mostrando el contenido de toda la array, así 
aseguraremos los cambios.
console.log(myCityAdd) // City added to array! => Tony, Stark, 40, New York*/

var mySelector = ["Clara", "Rufí", 32];
function myCityAdd(city){
    mySelector.push(city);
    console.log("City added to array! => " + mySelector);
}

myCityAdd("New York"); //City added to array! => Clara,Rufí,32,New York


/*h) Crea ahora, una funcion para eliminar la variable City y asegura los cambios.
myCityAdd() // City added to array! => Tony, Stark, 40, New York
myCityDelete() // City deleted! => Tony, Stark, 40*/

var mySelector = ["Clara", "Rufí", 32, "New York"];

function myCityDelete(){
    mySelector.pop();
    console.log("City deleted! => " + mySelector);

}
myCityDelete(); //City deleted! => Clara,Rufí,32

//j) Ahora, elimina el nombre y asegura los cambios Resources: https://www.w3schools.com/jsref/jsref_shift.asp

var mySelector = ["Clara", "Rufí", 32];

function myNameDelete(){
    mySelector.shift();
    console.log("Name deleted! => " + mySelector);

}
myNameDelete(); //Name deleted! => Rufí,32


//k) Quiero volver a introducir mi nombre pero si lo introduzco utilizando push() estará en la última posición, 
//como podria hacer para introducirlo en la primera posición? 

var mySelector = ["Rufí", 32];

function insertName(name){
    mySelector.splice(0,0, name);
    console.log("Name inserted! => " + mySelector);
}

insertName("Clara"); //Name inserted! => Clara,Rufí,32

//o bé: 

var mySelector = ["Rufí", 32];

function insertName(name){
    mySelector.unshift(name);
    console.log("Name inserted! => " + mySelector);
}

insertName("Clara");


//l) Ahora, declara una array con los números del 0 a 10 y muestra cada número multiplicado por dos.
//numbers = [...]
//var multByTwo = numbers.map(...)

var numbers = [0,1,2,3,4,5,6,7,8,9,10];
var multByTwo = numbers.map(function(numbers){
     return numbers *2;
});
console.log(multByTwo); //[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]


/*l1) Reformula la función para que puedas especificar por cual número debería multiplicar cada elemento de la array.
var num = 3; // cada número se multiplicará por 3
function multByNum(num){
var arrayMult = numbers.map(...)
return arrayMult
}*/


var numbers = [0,1,2,3,4,5,6,7,8,9,10];
var num = 3;
function multByNum(num){
    arrayMult = numbers.map(function(numbers){
    return numbers * num
})
}

multByNum(num);
console.log(arrayMult); //[0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30]

//m) Podrías mostrarlos en el orden inverso? Resources: https://www.w3schools.com/jsref/jsref_sort.asp

var numbers = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30];

function descentNumbers(){
    numbers.sort(function(a, b){return b-a});
} 
descentNumbers();
console.log(numbers); //[30, 27, 24, 21, 18, 15, 12, 9, 6, 3, 0]

/*n) Puedes indicarme que letras se repiten de tu nombre y cuantas veces?
console.log(repeatLetters)  Tony Stark, the letter 'T' => 2 times.*/

var myName = ["Clara Rufí"];
var name = myName[0]
myName = myName[0].toUpperCase()
myName = myName.replace(/\s/g,"");
myName = myName.split("");  //console.log(myName); //["C", "L", "A", "R", "A", "R", "U", "F", "Í"]

var  repeatLetters = {};
    myName.forEach(function(i) { repeatLetters[i] = (repeatLetters[i]||0) + 1;}); //repeatLetters => {C: 1, L: 1, A: 2, R: 2, U: 1, …}
    for (prop in repeatLetters){
        if (repeatLetters[prop] > 1){
            console.log(name + ", the letter " + "'" +prop + "'" + " => " + repeatLetters[prop])
        }  
    }
/*Clara Rufí, the letter 'A' => 2
Clara Rufí, the letter 'R' => 2*/


/*n1) Ahora muestra por consola que letras NO se repiten y muestra tu nombre sin esas letras

console.log(repeatLetters) // Tony Stark, the letters => o, n, y, s, a, r, k are not repeated, the name is => Ony Sark*/

var myName = ["Clara Rufí"];
var name = myName[0]
myName = myName[0].toLowerCase()
myName = myName.replace(/\s/g,"");
myName = myName.split("");  //console.log(myName); //["c", "l", "a", "r", "a", "r", "u", "f", "í"]

var  repeatLetters = {};
var notrepeatLetters = [];

myName.forEach(function(i) { repeatLetters[i] = (repeatLetters[i]||0) + 1;}); // repeatLetters => {c: 1, l: 1, a: 2, r: 2, u: 1, …}
    for (prop in repeatLetters){
        if (repeatLetters[prop] <= 1){
		notrepeatLetters.push(prop);   
        } 		
    }
	console.log(name + ", the letters " + " => " + notrepeatLetters + " are not repeated, the name is" + " => " + notrepeatLetters ) 
//Clara Rufí, the letters  => c,l,u,f,í are not repeated, the name is => c,l,u,f,í


/*____________________________________________________________________________________________________________________________*/  

NUMBERS

/*_____________________________________________________________________________________________________________________________*/  

//a) Que hora es? Declara la hora como número y devuelvela como String
//console.log(myString + myNumberStringify) // I'ts 10.45 of morning

var time = 10.45;
var timeString = time.toString();
console.log("It's " + time + " of morning");  //It's 10.45 of morning

//b) Nono, que hora exactamente? Dime la hora sin minutos!
//console.log(myString) // It's around 10 of morning

var time = 10.45;
var aroundTime = Math.round(time);
console.log("It's around " + aroundTime + " of morning");

//c) Ahora, declara tu hora y muéstrala redondeada.
//console.log(...(10.34)) // 11!

var time = 10.45;
var aroundTime = Math.ceil(time);
console.log(aroundTime + "!");  //11!

//d) Hagamos una calculadora. Primero, la suma. Crea variables con valores distintos y súmalos.
//console.log(sum) //The sum of 7+3 is 10

var num1 = 7;
var num2 = 3;
var sum = num1+ num2;
console.log(sum);

//d1) Añade la resta...
//console.log(sum + rest) // The sum and rest of 7 and 3 is 10 and 4 

var num1 = 7;
var num2 = 3;
var sum = num1+ num2;
var rest = num1 - num2;
console.log("The sum and rest of " + num1 + " and " + num2 + " is " + sum + " and " + rest); 
//The sum and rest of 7 and 3 is 10 and 4

//d2) La multiplicación...
//console.log(sum + rest + mult) // 10, 4 and 21

var num1 = 7;
var num2 = 3;
var sum = num1+ num2;
var rest = num1 - num2;
var mult = num1*num2;
console.log(sum + ", " + rest + " and " + mult);  //10, 4 and 21

//d3) Y, por ultimo, la división.
//console.log(sum + rest + mult + div) // 10, 4, 21 and 2.3

var num1 = 7;
var num2 = 3;
var sum = num1+ num2;
var rest = num1 - num2;
var mult = num1*num2;
var div = Math.round((num1/num2)*10)/10;
console.log(sum + ", " + rest + ", " + mult + " and " + div); //10, 4, 21 and 2.3

//d4) Ahora, intenta multiplicar un número por una string, que devuelve?
//console.log(10*"hour") // ....?!

var num1 = 7;
console.log(num1*"hour"); //NaN = Not a number

//e) Podemos controlar este error con un condicional if?
//console.log(10*"hour") // You can't do this operation!


function mult(num1, num2){
    
    if(typeof num1 === "number" && typeof num2 === "number"){
        var result = num1*num2;
        console.log(result);
    }else{
        console.log("You can't do this operation!");
    }
}
mult(7, "hour"); //You can't do this operation!

