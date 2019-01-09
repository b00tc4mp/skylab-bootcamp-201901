OBjects

/*a) Escribe una función que liste los nombres de propiedad del objeto (Puedes usar el objeto creado más arriba)
console.log(something, somethingMore, somethingMoreAndMore) //name, class, id*/

function listProperties(obj){
    for(prop in obj){
        console.log(prop)
    }
}

var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

listProperties(avenger);

name
class
id

/*b) Ahora, crea una función que liste solo los valores de las propiedades.
console.log(somethingThatShowsThings) //Tony, VII, 01*/

function listValues(obj){
    for(prop in obj){
        console.log(obj[prop])
    }
}

var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

listValues(avenger);

Tony
VII
1

/*c) Cambia el valor de la propiedad class por "XI" y asegurate de que los cambios se han efectuado.
console.log(property.ThisProperty) //new class = XI*/

var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

avenger.class = "XI";
console.log(avenger);  //{name: "Tony", class: "XI", id: 1}

/*d) Ahora, elimina la propiedad ID y asegura los cambios.
//console.log(property.ThisProperty) //Not exist :( */

var avenger = { 
    name : "Tony", 
    class : "XI", 
    id : 1 
};

delete avenger.id;
console.log(avenger.id);  //undefined

//e) Añade una nueva propiedad, por ejemplo city y dale un valor.
//http://www.w3schools.com/js/js_properties.asp City => New York City


var avenger = { 
    name : "Tony", 
    class : "XI", 
};

avenger.city = "New York City";
for (prop in avenger){
    console.log("City => " + avenger.city);
}
console.log(avenger); //City => New York City


//f) Lista el numero de propiedades que contiene el objeto.
//console.log() // There are 4 info fields

var avenger = { 
    name : "Tony", 
    class : "XI", 
    city : "New York City"
};
let numberProp = 0;
for (prop in avenger){
	numberProp += 1
}
console.log("There are " + numberProp + " info fields")  //There are 3 info fields

/*g) Cambia la propiedad name por fullName.
g1) Asegura los cambios.
console.log(fullName) // Tony Stark*/

var avenger = { 
    name : "Tony", 
    class : "XI", 
    city : "New York City"
};

avenger.name = "fullName";
avenger.fullName = "Tony Stark"
console.log(avenger.fullName); //Tony Stark


/*h) Lista todas las propiedades del objeto a través de un console.log()
console.log(...) // "Hi there, I'm Tony Stark..."*/

var avenger = { 
    fullName : "Tony Stark", 
    class : "XI", 
    city : "New York City"
};

console.log("Hi there, I'm " + avenger.fullName + ", my class is " + avenger.class + " and I live in " + avenger.city)

//h1) Añade más propiedades al objeto, como... markAverage, country, job, studies...

var avenger = { 
    fullName : "Tony Stark", 
    class : "XI", 
    city : "New York City"
};
avenger.mark = "III";
avenger.country = "USA"
avenger.job = "develop weapons for S.H.I.E.L.D."
avenger.studies = "electrical engineering"
avenger.personalAssistant = "Happy"
avenger.personalSecretary = "Pepper Potts"


//h2) Asegura los cambios volviendo a listar los valores del objeto
//console.log(location) // NYC

var avenger = { 
    fullName : "Tony Stark", 
    class : "XI", 
    city : "New York City",
    mark: "III",
    country: "USA",
    job: "develop weapons for S.H.I.E.L.D.",
    studies: "electrical engineering",
    personalAssistant : "Happy",
    personalSecretary : "Pepper Potts"
};

for (prop in avenger){
    console.log(avenger[prop])
}

//i) Crea un constructor de objetos llamado "Avenger", al cual le pasarás ciertos parametros, 
//creando una instancia del objeto con las propiedades de nuestro objeto creado. (Échale un ojo a la referencia de abajo.)


function avenger(fullName, classRoom, mark, city, country, studies, job, personalAssistant, personalSecretary ) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.mark = mark;
    this.city = city;
    this.country = country;
    this.studies= studies;
    this.job= job;
    this.personalAssistant = personalAssistant;
    this.personalSecretary = personalSecretary;
}
var tonyStark = new avenger ("Tony Stark", "XI", "III", "New York City", "USA", "Electrical engineering", "Develop weapons for S.H.I.E.L.D.", "Happy", 
"Pepper Potts");
console.log(tonyStark) //avenger {fullName: "Tony Stark", classRoom: "XI", mark: "III", city: "New York City", country: "USA", …}

//j) Crea otro objeto y imprime sus propiedades por pantalla.
//var otherAvenger = new Avenger...
//console.log(otherAvenger) // Hulk...

function avenger(fullName, classRoom, mark, city, country, studies, job, personalAssistant, personalSecretary ) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.mark = mark;
    this.city = city;
    this.country = country;
    this.studies= studies;
    this.job= job;
    this.personalAssistant = personalAssistant;
    this.personalSecretary = personalSecretary;
}

var hulk = new avenger ("Bruce Banner (Hulk)", "X", "I", "New York City","USA", "Doctorate in biochemistry", "Scientific at Bioscience Department at Culver", "Is not known", "Is not known");
console.log(hulk);  //avenger {fullName: "Bruce Banner (Hulk)", classRoom: "X", mark: "I", city: "New York City", country: "USA", …}


//k) Crea una propiedad del objeto que liste automáticamente los valores de la instancia. . Example of property:

function avenger(fullName, classRoom, mark, city, country, studies, job, personalAssistant, personalSecretary) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.mark = mark;
    this.city = city;
    this.country = country;
    this.studies= studies;
    this.job= job;
    this.personalAssistant = personalAssistant;
    this.personalSecretary = personalSecretary;
    this.description = function(){
        console.log(this.fullName + ", " + this.classRoom + "," + this.mark + "," + this.city + "," + this.country + "," 
        + this.studies + "," + this.job + "," + this.personalAssistant + "," + personalSecretary)
    }
}
var tonyStark = new avenger ("Tony Stark", "XI", "III", "New York City", "USA", "Electrical engineering", "Develop weapons for S.H.I.E.L.D.", "Happy", "Pepper Potts")
tonyStark.description() //Tony Stark, XI,III,New York City,USA,Electrical engineering,Develop weapons for S.H.I.E.L.D.,Happy,Pepper Potts

//l) Ahora, crea una función que solo liste los nombres de los objetos instanciados
//console.log(someFunction) // Tony Stark, Hulk, Thor...

function avenger(fullName, classRoom, mark, city, country, studies, job, personalAssistant, personalSecretary ) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.mark = mark;
    this.city = city;
    this.country = country;
    this.studies= studies;
    this.job= job;
    this.personalAssistant = personalAssistant;
    this.personalSecretary = personalSecretary;
    this.nameAvengers = function(){
        console.log(this.fullName)
    }
}
var tonyStark = new avenger ("Tony Stark", "XI", "III", "New York City", "USA", "Electrical engineering", "Develop weapons for S.H.I.E.L.D.", "Happy", "Pepper Potts");
var hulk = new avenger ("Bruce Banner (Hulk)", "X", "I", "New York City","USA", "Doctorate in biochemistry", "Scientific at Bioscience Department at Culver", "Is not known", "Is not known");
tonyStark.nameAvengers() + hulk.nameAvengers()
console.log(name);


//m) Crea varios objetos con las mismas propiedades, como por ejemplo la ciudad, crea una función para que solo liste los nombres de los Avengers que sean de la misma ciudad y cuantos hay.
//console.log(myFunction) // Are 3 avengers living in NYC: Tony, Hulk, Hawkeye

function avenger(fullName, classRoom, city ) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;    
}

var tonyStark = new avenger ("Tony Stark", "XI", "New York City");
var hulk = new avenger ("Bruce Banner (Hulk)", "X", "New York City");
var spiderman = new avenger ("Peter Benjamin Parker", "XVI", "New York City");
var thor = new avenger ("Thor","XX",  "Asgard");
var viudanegra = new avenger ("Viuda Negra", "III", "Moscú");
var blackpanther = new avenger ("Black Panther", "XV", "Wakanda");

var avengers = [tonyStark, hulk, spiderman, thor, viudanegra, blackpanther]
//console.log(avengers[1]) //Tota la info de hulk


function filterAvengerByCity (avengers, city){
    avengerNY = []
    avengers.forEach(function(avengersItem){
     if (avengersItem.city === city){
        avengerNY.push(avengersItem.fullName)
     }
});
console.log(avengerNY);
return "There are " + avengerNY.length + " avengers living in NYC: " + avengerNY.join(", ");
}

console.log(filterAvengerByCity(avengers, "New York City")); 
//There are 3 avengers living in NYC: Tony Stark, Bruce Banner (Hulk), Peter Benjamin Parker


//n) Para acabar, créate a ti mismo y crea una función que recoja todas las markAv y muestre la media.

function avenger(fullName, city, markAv) {
    this.fullName = fullName;
    this.city = city; 
    this.markAv = markAv;   
}

var tonyStark = new avenger ("Tony Stark", "New York City", 10);
var hulk = new avenger ("Bruce Banner (Hulk)", "New York City", 22);
var spiderman = new avenger ("Peter Benjamin Parker","New York City", 13);
var thor = new avenger ("Thor", "Asgard", 5);
var viudanegra = new avenger ("Viuda Negra", "Moscú", 3);
var blackpanther = new avenger ("Black Panther", "Wakanda", 17);
var clara = new avenger ("Clara", "Barcelona", 15)

var avengers = [tonyStark, hulk, spiderman, thor, viudanegra, blackpanther, clara]

function mark(markAv){
    finalResult = 0
    resultMarks = 0
    allMarks = []
    avengers.forEach(function(markItem){
       return allMarks.push(markItem.markAv)
    })
    for (var i=0; i<allMarks.length; i++ ){
        resultMarks += allMarks[i]
    }
    console.log("resultat marks: " + resultMarks); //resultat marks: 85
    finalResult = Math.round((resultMarks/avengers.length)*100)/100

}
mark()
console.log("All marks:" + allMarks); //All marks:10,22,13,5,3,17,15
console.log("Final Result: " + finalResult); //Final Result: 12.14



/*ñ) Ahora, crea una funcion que recoja los avengers en parejas (será necesario que tengan un id, 
por comodidad al aparejarlos), 
es decir, de dos en dos, compare sus markAv y que muestre el mayor de ambos.
HawkEye vs Tony => Tony is better! \n Thor vs Hulk => Hulk is better! \n Vision vs Captain America => Vision is better*/


function avenger(id, fullName, city, markAv) {
    this.id = id;
    this.fullName = fullName;
    this.city = city; 
    this.markAv = markAv;   
}

var tonyStark = new avenger (1,"Tony Stark", "New York City", 10);
var hulk = new avenger (2, "Bruce Banner(Hulk)", "New York City", 22);
var spiderman = new avenger (3, "Peter Benjamin Parker","New York City", 13);
var thor = new avenger (4, "Thor", "Asgard", 5);
var viudanegra = new avenger (5, "Viuda Negra", "Moscú", 3);
var blackpanther = new avenger (6, "Black Panther", "Wakanda", 17);
var clara = new avenger (7, "Clara", "Barcelona", 15)

var avengers = [tonyStark, hulk, spiderman, thor, viudanegra, blackpanther, clara]

function comparation(avengers){
    if (avengers[0].markAv > avengers[1].markAv){
        console.log(avengers[0].fullName + " vs " + avengers[1].fullName + " => " + avengers[0].fullName + " is better! ")
    }else{
        console.log(avengers[0].fullName + " vs " + avengers[1].fullName + " => " + avengers[1].fullName + " is better! ")
    }
    if (avengers[2].markAv > avengers[3].markAv){
        console.log(avengers[2].fullName + " vs " + avengers[3].fullName + " => " + avengers[2].fullName + " is better! ")
    }else{
        console.log(avengers[2].fullName + " vs " + avengers[3].fullName + " => " + avengers[3].fullName + " is better! ")
    }
    
    if (avengers[4].markAv > avengers[5].markAv){
        console.log(avengers[4].fullName + " vs " + avengers[5].fullName + " => " + avengers[4].fullName + " is better! ")
    }else{
        console.log(avengers[4].fullName + " vs " + avengers[5].fullName + " => " + avengers[5].fullName + " is better! ") 
    }

    if (avengers[6].markAv > avengers[0].markAv){
        console.log(avengers[6].fullName + " vs " + avengers[0].fullName + " => " + avengers[6].fullName + " is better! ") 
    }else{
        console.log(avengers[6].fullName + " vs " + avengers[0].fullName + " => " + avengers[0].fullName + " is better! ")
    }
}

console.log(comparation(avengers))

//Tony Stark vs Bruce Banner (Hulk) => Bruce Banner (Hulk) is better! 
//VM433:8 Peter Benjamin Parker vs Thor => Peter Benjamin Parker is better! 
//VM433:16 Viuda Negra vs Black Panther => Black Panther is better! 
//VM433:20 Clara vs Tony Stark => Clara is better! 




//ñ1) Intenta crear las parejas de forma aleatoria.

function avenger(id, fullName, city, markAv) {
    this.id = id;
    this.fullName = fullName;
    this.city = city; 
    this.markAv = markAv;   
}

var tonyStark = new avenger (1,"Tony Stark", "New York City", 10);
var hulk = new avenger (2, "Bruce Banner (Hulk)", "New York City", 22);
var spiderman = new avenger (3, "Peter Benjamin Parker","New York City", 13);
var thor = new avenger (4, "Thor", "Asgard", 5);
var viudanegra = new avenger (5, "Viuda Negra", "Moscú", 3);
var blackpanther = new avenger (6, "Black Panther", "Wakanda", 17);
var clara = new avenger (7, "Clara", "Barcelona", 15)

var avengers = [tonyStark, hulk, spiderman, thor, viudanegra, blackpanther, clara]

function avengerComparation(avengers){
		var numAvengers = avengers.length;
        randomUser1 = Math.floor(Math.random()*numAvengers);
        randomUser2 = Math.floor(Math.random()*numAvengers);
        if (avengers[randomUser1].markAv > avengers[randomUser2].markAv){
            console.log (avengers[randomUser1].fullName + " vs " + avengers[randomUser2].fullName + " => " 
            + avengers[randomUser1].fullName + "is better" )
        }else if (avengers[randomUser2].markAv > avengers[randomUser1].markAv){
                console.log (avengers[randomUser2].fullName + " vs " + avengers[randomUser1].fullName + " => " 
                + avengers[randomUser2].fullName + "is better" )
        }

}

console.log(avengerComparation(avengers)); 
//Bruce Banner (Hulk) vs Peter Benjamin Parker => Bruce Banner (Hulk)is better


//_______________________________________________


/*a) Vamos a complicarlo un poco... El número random debería generarse en otra función separada del padre. 
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

/*b) Refactorizemos nuestro código dejando todas las funciones separadas del padre, 
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

/*c) Intenta hacer push de todos los resultados de las funciones a una array declarada en el padre,
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

/*d) Crea una funcion que llame a nuestra funcion father(), ésta, a parte de llamarla, 
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


____ o bé


let resultFather = []
function superFather(){
      
	let resF = ["hello from the dark side..."]
	resultFather.push(resF);

    function fatherInformation(){
        
        
        
	
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
        

    }
    
    fatherInformation()
}

superFather();
console.log(resultFather);
VM565:36 (4) [Array(1), "Tony Stark...aka IRONMAN, ", "9900693, ", 40]

/*e) Llama a ésta nueva función dos veces, muestra sus resultados por pantalla y compara sus randomNums, mostrando un mensaje 
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


































/*g) Intenta sumarle al resultado de tu segunda funcion, un numero random del 0-10 y conviertelo todo a un solo string.
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


/*h) Ahora, limita el random de 0 a 50, Muestra un mensaje si el output age es < 20 y otro si es de 21 - 50

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