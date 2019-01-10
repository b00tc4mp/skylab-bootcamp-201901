// a) Escribe una función que liste los nombres de propiedad del objeto

var avenger = { 
    name : "Tony", 
    clas : "VII", 
    id : 1 
};

for (var key in avenger) {
    console.log(key);
}

// b) Ahora, crea una función que liste solo los valores de las propiedades.

for(var key in avenger) {
    console.log(avenger[key]);
}

// c) Cambia el valor de la propiedad class por "XI" y asegurate de que los cambios se han efectuado.

avenger.class = "XI";

console.log(avenger.class);

// d) Ahora, elimina la propiedad ID y asegura los cambios.

delete avenger.id;

for (var key in avenger) {
    console.log(key);
}

// e) Añade una nueva propiedad, por ejemplo city y dale un valor, asegura los cambios solo imprimiendo esa nueva propiedad.

avenger.city = "Castelfornia";

console.log(avenger.city);


// f) Lista el numero de propiedades que contiene el objeto.

counter = 0;

for(var key in avenger) {
    counter++;
}

console.log(counter);

// g) Cambia la propiedad name por fullName.

avenger.fullName = avenger.name;

delete avenger.name;

for(var key in avenger) {
    console.log(key);
    console.log(avenger[key]);
}

console.log(avenger);

// h) Lista todas las propiedades del objeto a través de un console.log()
// h1) Añade más propiedades al objeto, como... markAverage, country, job, studies...

avenger.markAverage = 25;
avenger.country = "freedonia";
avenger.job = "kely";
avenger.studies = "ADE";

console.log(avenger);


// // i) Crea un constructor de objetos llamado "Avenger", al cual le pasarás ciertos parametros, creando una instancia del objeto con las propiedades de nuestro objeto creado. (Échale un ojo a la referencia de abajo.)

// function Avenger(city, clas, country, fullName, job, markAverage, studies) {
//     this.city = city;
//     this.clas = clas;
//     this.country = country;
//     this.fullName = fullName;
//     this.job = job;
//     this.markAverage = markAverage;
//     this.studies = studies;
// }

// var avenger1 = new Avenger("BCN","XXV","Bali","pepeluis","nini","666","vet");

// console.log(avenger1);


// // j) Crea otro objeto y imprime sus propiedades por pantalla.

// var avenger2 = new Avenger("MAD","XIV","Sabadel","ramon","abogadorrr","345","xxx");


// k) Crea una propiedad del objeto que liste automáticamente los valores de la instancia.
// l) Ahora, crea una función que solo liste los nombres de los objetos instanciados

function Avenger(city, clas, country, fullName, job, markAverage, studies) {
    this.city = city;
    this.clas = clas;
    this.country = country;
    this.fullName = fullName;
    this.job = job;
    this.markAverage = markAverage;
    this.studies = studies;
    this.listProperties = function() {
        console.log(this.city+ ", " +this.clas+ ", " +this.country+ ", " +this.fullName);
    };
    this.listInstances = function(){
        con
    }
}

var avenger1 = new Avenger("BCN","XXV","Bali","avenger1","nini",666,"vet");
var avenger2 = new Avenger("MAD","XXI","Peru","avenger2","developer",689,"doc");
var avenger3 = new Avenger("BCN","XIV","NL","avenger3","fruteiro",346,"rapper");
var avenger4 = new Avenger("BCN","XXV","Bali","avenger4","nini",666,"vet");
var avenger5 = new Avenger("MAD","XXI","Peru","avenger5","developer",689,"doc");
var avenger6 = new Avenger("BCN","XIV","NL","avenger6","fruteiro",689,"rapper");

var avengers = [avenger1,avenger2,avenger3,avenger4,avenger5,avenger6];

function printNames() {
    for(var i=0; i<avengers.length; i++) {
        console.log(avengers[i].fullName)
    }
}

printNames();

// m) Crea varios objetos con las mismas propiedades, como por ejemplo la ciudad, crea una función para que solo liste los nombres de los Avengers que sean de la misma ciudad y cuantos hay.


function checkCity(city,avengers) {
    var result = avengers.filter(function(e) {
        if(e.city === city) {
            return e;
        }
    });
    var names = [];
    result.forEach(function(e) {
        names.push(e.fullName);
    });
    console.log("There are " + result.length + " avengers living in " + city + ": " +names.join(", "));
}

checkCity("BCN",avengers);


// n) Para acabar, créate a ti mismo y crea una función que recoja todas las markAv y muestre la media.

function averageMark(avengers) {
    sumatorio = 0;
    avengers.forEach(function(e) {
        sumatorio = sumatorio + e.markAverage
    });
    console.log("The average mark is: " +(sumatorio / avengers.length));
}

averageMark(avengers);


// ñ) Ahora, crea una funcion que recoja los avengers en parejas (será necesario que tengan un id, por comodidad al aparejarlos), es decir, de dos en dos, compare sus markAv y que muestre el mayor de ambos.

function pairCompare() {
    for(var i = 0; i<avengers.length; i= i + 2) {
        if(avengers[i].markAverage > avengers[i+1].markAverage) {
            console.log(avengers[i].fullName + " vs. " + avengers[i+1].fullName + ": " + avengers[i+1].fullName + " is better!");
        } else if(avengers[i].markAverage === avengers[i+1].markAverage) {
            console.log(avengers[i].fullName + " vs. " + avengers[i+1].fullName + ": The two avengers are the same!");
        } else {
            console.log(avengers[i].fullName + " vs. " + avengers[i+1].fullName + ": " + avengers[i+1].fullName + " is better!");
        }
    }
}

pairCompare();

// // ñ1) Intenta crear las parejas de forma aleatoria

// var sequence = [];

// function randomCouples() {
//     while( sequence.length < 6 )  {
//         var number = Math.floor((Math.random() * 6));
//         if (sequence.indexOf(number) == -1) {
//             sequence.push(number);
//         }
//     }
//     for(var i = 0; i<avengers.length; i= i + 2) {
//         if(avengers[sequence[i]].markAverage > avengers[sequence[i+1]].markAverage) {
//             console.log(avengers[sequence[i]].fullName + " vs. " + avengers[sequence[i+1]].fullName + ": " + avengers[sequence[i+1]].fullName + " is better!");
//         } else if(avengers[sequence[i]].markAverage === avengers[sequence[i+1]].markAverage) {
//             console.log(avengers[sequence[i]].fullName + " vs. " + avengers[sequence[i+1]].fullName + ": The two avengers are the same!");
//         } else {
//             console.log(avengers[sequence[i]].fullName + " vs. " + avengers[sequence[i+1]].fullName + ": " + avengers[sequence[i+1]].fullName + " is better!");
//         }
//     }
// }

// randomCouples();


// // a) Vamos a complicarlo un poco... El número random debería generarse en otra función separada del padre. Retorna a la funcion padre y concaténalo en el return padre.

// var sequence = [];

// function randomCouples() {
//     while( sequence.length < 6 )  {
//         var number = Math.floor((Math.random() * 6));
//         if (sequence.indexOf(number) == -1) {
//             sequence.push(number);
//         }
//     }
// }

// function compareAvengers() {
//     for(var i = 0; i<avengers.length; i= i + 2) {
//         if(avengers[sequence[i]].markAverage > avengers[sequence[i+1]].markAverage) {
//             console.log(avengers[sequence[i]].fullName + " vs. " + avengers[sequence[i+1]].fullName + ": " + avengers[sequence[i+1]].fullName + " is better!");
//         } else if(avengers[sequence[i]].markAverage === avengers[sequence[i+1]].markAverage) {
//             console.log(avengers[sequence[i]].fullName + " vs. " + avengers[sequence[i+1]].fullName + ": The two avengers are the same!");
//         } else {
//             console.log(avengers[sequence[i]].fullName + " vs. " + avengers[sequence[i+1]].fullName + ": " + avengers[sequence[i+1]].fullName + " is better!");
//         }
//     }
// }



// // b) Refactorizemos nuestro código dejando todas las funciones separadas del padre, éste último se encargará de llamarlas todas y mostrar sus resultados.

// function controller() {
//     randomCouples();
//     compareAvengers();
// }

// controller();


// c) Intenta hacer push de todos los resultados de las funciones a una array declarada en el padre, muestra los resultados de esta array como siempre.


function randomCouples(sequence) {
    while( sequence.length < 6 )  {
        var number = Math.floor((Math.random() * 6));
        if (sequence.indexOf(number) == -1) {
            sequence.push(number);
        }
    }
}

function compareAvengers(sequence,results) {
    for(var i = 0; i<avengers.length; i= i + 2) {
        if(avengers[sequence[i]].markAverage > avengers[sequence[i+1]].markAverage) {
            results.push(avengers[sequence[i]].fullName + " vs. " + avengers[sequence[i+1]].fullName + ": " + avengers[sequence[i+1]].fullName + " is better!");
        } else if(avengers[sequence[i]].markAverage === avengers[sequence[i+1]].markAverage) {
            results.push(avengers[sequence[i]].fullName + " vs. " + avengers[sequence[i+1]].fullName + ": The two avengers are the same!");
        } else {
            results.push(avengers[sequence[i]].fullName + " vs. " + avengers[sequence[i+1]].fullName + ": " + avengers[sequence[i+1]].fullName + " is better!");
        }
    }
    console.log(results.join());
}

function controller() {
    var sequence = [];
    randomCouples(sequence);
    var results = [];
    compareAvengers(sequence,results);
}



// d) Crea una funcion que llame a nuestra funcion father(), ésta, a parte de llamarla, deberá hacer otro push "hello from the dark side..." a la array que crea father(). Muestra toda la array completa.

function principal(){
    controller();
    results.push("Hello from the dark side...");
    console.log(results.join());
}

principal();




