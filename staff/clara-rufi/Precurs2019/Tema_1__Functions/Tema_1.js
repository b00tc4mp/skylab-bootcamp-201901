//a) Primero, creamos una función que nos cree un saludo, pasa tu nombre como parámetro y devuélvelo por la consola.
/*
function (myName){
    console.log('hello + myName')//output: 'hello myName'
}
*/

function name(myName){
    console.log("hello " + myName)
}

name("Clara"); //hello Clara

//b) Intenta retornar los valores en lugar de usar console.log

/*
function (myName){
    return 'hello + myName' // output: 'hello myName'
}
*/
function name(myName){
    return "hello " + myName
}

name("Clara"); //"hello Clara"

//c) Ahora, añade tu edad y concaténala al return
//return 'myMessage' //output: 'hello myName, you're myAge years old.'

function name(myName, myAge){
    return "hello " + myName + "," + " you're " + myAge + " years old."
}

name("Clara", 32); //"hello Clara, you're 32 years old."



//d) Iguala tu función a una variable y ejecútala
/*
var MyFunction = ... //output: 'hello myName, you're myAge years old.'
myFunction()
*/

function name(myName, myAge){
    return "hello " + myName + "," + " you're " + myAge + " years old."
}
let greetings = name("Clara", 32);  //"hello Clara, you're 32 years old."


/*e) Ahora declara otra funcion que devuelva tu edad y asigna su resultado a otra variable, 
intenta imprimir sus dos resultados concatenados.

myName() + myAge() //output: IronMan 40*/

function ageUser (number){
    return number 
}
let myAge =  ageUser(40);


function nameUser (name){
    return name
}
let myName = nameUser ("Ironman");

console.log(myName + " " + myAge) ;  // Ironman 40


/*f) Ahora, todas las variables deberían ser pasadas como parámetro a las funciones.
var...
var...
myName(param1) + myAge(param2) //output: IronMan 43*/


function nameUser (name){
    return name
}
let param1 = nameUser ("Ironman");

function ageUser (number){
    return number
}
let param2 =  ageUser(43);

function informationUser(){
    return param1 + " " + param2
}

informationUser(param1,param2); //Ironman 43

/*g) Intenta englobar todas las funciones en una sola funcion padre, el return de dicha función padre deberá ser la llamada 
a las funciones hijas

function ... (){
    var x = myName(param1)
    var y = myAge(param2)
    return x + y
} //output: IronMan 40*/

function informationUser(){
	function nameUser (name){
    	return name
}
let param1 = nameUser ("Ironman");

	function ageUser (number){
    	return number
}
let param2 =  ageUser(40);
return param1 + " " + param2
}

informationUser();  //Ironman 40

/*h) Haz otra función hija que solo devuelva un número random, ese número random será el argumento que 
se pasará como parámetro a la función age()

return x + y // output: IronMan 6457689*/

function informationUser(){
	function nameUser (name){
    	return name
}
let param1 = nameUser ("Ironman");

    function ageUser (numberRandom){
    numberRandom = (Math.floor(Math.random ()*10000000) + 1)
    return numberRandom
}
let paramRandom = ageUser();
return param1 + " " + paramRandom
} 
informationUser(); // Ironman 4873041

  

/*i) Al return de la función name(), concaténale otro mensaje

return x + y // output: Tony Stark...aka IRONMAN, 34...Sure you're Tony Stark? */

function ageUser (numberRandom){
    numberRandom = (Math.floor(Math.random ()*50) + 1)
    if (numberRandom <=20){
        return  numberRandom + "....You are not Tony Stark!"
    }else if (numberRandom >=21 || numberRandom <=50){
        return  numberRandom + "....Sure you're Tony Stark?"
    }
    return numberRandom
}

  //"Tony Stark...aka IronMan, 14....You are not Tony Stark!"


/*j) Ahora, modifica el return de la función padre para que devuelva sus datos en un mensaje amigable

return x + y // output: The first function returns: 'Tony Stark...aka IRONMAN',
 The second function returns: '34...Sure you're Tony Stark?*/


 function informationUser(){
    function nameUser (name){
        return name
    }
    let paramname = nameUser("Tony Stark...aka IRONMAN");

    function ageUser (numberRandom){
    numberRandom = (Math.floor(Math.random ()*50) + 1)
    if (numberRandom <=20){
        return  numberRandom + "....You are not Tony Stark!"
    }else if (numberRandom >=21 || numberRandom <=50){
        return  numberRandom + "....Sure you're Tony Stark?"
    }
	return numberRandom
    }
	let paramage = ageUser();
    return " The first function returns: " + paramname + ", The second function returns: " + ageUser();
}

informationUser(); // " The first function returns: Tony Stark...aka IRONMAN, The second function returns: 23....Sure you're Tony Stark?"


/*k) Modifica la primera función y la función padre para, si el parámetro introducido no es tu nombre, no siga 
con la segunda llamada

return x + y // output: "The first function returns: Hulk... You're not IRONMAN!"*/

function informationUser(){
    
    function ageUser (numberRandom){
    numberRandom = (Math.floor(Math.random ()*50) + 1)
    if (numberRandom <=20){
        return  numberRandom + "....You are not Tony Stark!"
    }else if (numberRandom >=21 || numberRandom <=50){
        return  numberRandom + "....Sure you're Tony Stark?"
    }
    
    return numberRandom   
    }
    let paramage = ageUser();

    function nameUser (name){
        if (name.toLowerCase() === "ironman"){
            return "The first function returns: " + name + ".......aka IRONMAN" + " The second function returns: " + paramage
        }else{
            return "The first function returns: " + name + "... You're not IRONMAN!"           
    }
    }
    let paramname = nameUser("Hulk");
    return paramname
}

informationUser();  //"The first function returns: Hulk... You're not IRONMAN!"







