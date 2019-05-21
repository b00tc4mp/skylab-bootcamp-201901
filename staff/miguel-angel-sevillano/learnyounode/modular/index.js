var mymodule = require('./modular') //llamamos la funcion desde otro archivo 




var callback = function(error,data){
    if(error) console.log(error)
    data.forEach(element => { //procesamos la array recibida y mnostramos cada elemento por consola
        console.log(element)
    });
}

mymodule(process.argv[2],process.argv[3],callback) //usamos la funcion para procesar los datos obtenidos 

