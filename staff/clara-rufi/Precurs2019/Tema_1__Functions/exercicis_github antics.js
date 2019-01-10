/*e1) Intenta sumarle al resultado de tu segunda funcion, un numero random del 0-10 y conviertelo todo a un solo string.
myName() + (myAge() + myRandomNumber).toString()//output: IronMan 45*/

function ageUser (number){
    numberRandom = (Math.round(Math.random ()*10))
    return number + numberRandom
}
let myAge =  ageUser(40);
myAge = myAge.toString();


function nameUser (name){
    return name
}
let myName = nameUser ("Ironman");

informationUser = myName + " " + myAge
console.log(informationUser);                    //Ironman 49


/*f) Ahora, todas las variables deberían ser pasadas como parámetro a las funciones.
var...
var...
myName(param1) + myAge(param2) //output: IronMan 43*/


function nameUser (name){
    return name
}
let param1 = nameUser ("Ironman");

function ageUser (number){
    numberRandom = (Math.round(Math.random ()*10))
    return number + numberRandom
}
let param2 =  ageUser(43);

function informationUser(){
    return param1 + " " + param2
}

informationUser(param1,param2);


/*i) Ahora, limita el random de 0 a 50, Muestra un mensaje si el output age es < 20 y otro si es de 21 - 50

return x + y // output: IronMan 3...Sure you're Tony Stark?*/

function ageUser (numberRandom){
    numberRandom = (Math.floor(Math.random ()*50) + 1)
    if (numberRandom <=20){
        console.log("IronMan...." + numberRandom + " You are not Tony Stark?")
    }else if (numberRandom >=21 || numberRandom <=50){
        console.log("IronMan.... " + numberRandom + " Sure you're Tony Stark?" )
    }
    return numberRandom
}
ageUser();  //IronMan.... 28 Sure you're Tony Stark?


/*m) Vamos a complicarlo un poco... El número random debería generarse en otra función separada del padre. 
Retorna a la funcion padre y concaténalo en el return padre.

function GenerateRandom(){
    ...
    return randomNumber.
}

function father(){
    var numR = GenerateRandom()
    return ...numR()...
}*/

function generateRandom (number){
    randomNumber = (Math.floor(Math.random ()*10000000) + 1)
    return randomNumber
}


function fatherInformation(){ 
    let numR = generateRandom()
    return numR;  
}  
fatherInformation();   //5817080


/*n) Refactorizemos nuestro código dejando todas las funciones separadas del padre, 
éste último se encargará de llamarlas todas y mostrar sus resultados.

function father(){
    myFunction();
    myOtherFunction();
    myOtherVarFunction();
    return...
}*/
function fatherInformation(){

    function generateRandom (number){
        randomNumber = (Math.floor(Math.random ()*10000000) + 1)
        return randomNumber
    }
        let numR = generateRandom();

    function nameUser (name){
        return name 
    }
        let nameU = nameUser("Tony Stark...aka IRONMAN");

    function ageUser (number){
    return number 
    }
    let userA = ageUser(40);

    return  nameU + ", " + userA + ", " + "num random: " +  numR
}

fatherInformation(); //"Tony Stark...aka IRONMAN, 40, num random: 9026073"

/*ñ) Intenta hacer push de todos los resultados de las funciones a una array declarada en el padre,
 muestra los resultados de esta array como siempre.*/


function fatherInformation(){
    let resultFather = []

    function nameUser (name){
        return name 
    }
        resultFather.push(nameUser("Tony Stark...aka IRONMAN"));

    function generateRandom (number){
        randomNumber = (Math.floor(Math.random ()*10000000) + 1)
        return randomNumber
    }
        resultFather.push(generateRandom())

    function ageUser (number){
    return number 
    }
    resultFather.push(ageUser(40));
    return resultFather;
  
}

fatherInformation(); //["Tony Stark...aka IRONMAN", 3313352, 40]

/*o) Crea una funcion que llame a nuestra funcion father(), ésta, a parte de llamarla, 
deberá hacer otro push "hello from the dark side..." a la array que crea father(). Muestra toda la array completa.*/


function superFather(){
      
	let resF = ["hello from the dark side..."]

    function fatherInformation(){
        
        let resultFather = []
        resultFather = resF
	
        function nameUser (name){
            return name
         }
            resultFather.push(nameUser("Tony Stark...aka IRONMAN, "));


        function generateRandom (number){
            randomNumber = (Math.floor(Math.random ()*10000000) + 1)
            return randomNumber
        }
            resultFather.push(generateRandom() + ", ")

        function ageUser (number){
            return number
        }
        resultFather.push(ageUser(40));   
        console.log(resultFather);

    }
    
    fatherInformation()
}

superFather();   //["hello from the dark side...", "Tony Stark...aka IRONMAN, ", "6367220, ", 40]

// o bé:

function superFather(){
      
	let resF = ["hello from the dark side..."]

    function fatherInformation(){
        
        let resultFather = []
        resultFather.push(resF);
	
        function nameUser (name){
            return name
         }
            resultFather.push(nameUser("Tony Stark...aka IRONMAN, "));


        function generateRandom (number){
            randomNumber = (Math.floor(Math.random ()*10000000) + 1)
            return randomNumber
        }
            resultFather.push(generateRandom() + ", ")

        function ageUser (number){
            return number
        }
        resultFather.push(ageUser(40));   
        console.log(resultFather);

    }
    
    fatherInformation()
}

superFather(); //(4) [Array(1), "Tony Stark...aka IRONMAN, ", "1519126, ", 40]

/*p) 🔞 👊🏼 Llama a ésta nueva función dos veces, muestra sus resultados por pantalla y compara sus randomNums, mostrando un mensaje 
indicando cual es mayor. El nombre pasado por parámetro también deberá ser random entre una array de nombres, con lo cual, 
también deberás refactorizar las funciones hijas.
function gandFather(){
    var names = ['hulk', 'ironMan', '...']
    var selectedName...
    var selectedName2...
    if(father(selectedName) > father(selectedName2))
        ...
    else
        ...
    return father(selectedName).push().join()...
}*/


function father(){
    var resultFather1 = []
    var resultFather2 = []
    var names = ["Ironman", "Hulk", "Spiderman", "Thor", "Viuda negra", "BlackPanther"]
    var selectedName = []
        function generateRandom (number){
            randomNumber1 = Math.floor(Math.random ()*6)
            randomNumber2 = Math.floor(Math.random ()*6)
            resultFather1.push(randomNumber1)
            resultFather2.push(randomNumber2)
        }
        generateRandom();
        
    if (resultFather1 > resultFather2){
        console.log("resultFather1 => " + resultFather1[0] + ", is bigger than resultFather2 => " + resultFather2[0])
        selectedName. push(names[resultFather1])
        console.log("The selected names is: " + selectedName);
    }else if (resultFather1 < resultFather2){
        console.log("resultFather2 => " + resultFather2[0] + ", is bigger than resultFather1 => " + resultFather1[0])
        selectedName. push(names[resultFather2])
        console.log("The selected names is: " + selectedName);
    }else{
        console.log("resultFather1 => " + resultFather1[0] + ", is equal than resultFather2 => " + resultFather2[0] + ", try again")
    }   
}
father();


