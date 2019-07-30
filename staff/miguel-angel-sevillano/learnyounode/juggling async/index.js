var http = require('http');
var bl = require('bl');

var urls = process.argv.slice(2)
var count = urls.length;

var results = [];

urls.forEach((url, index) => {
    http.get(url, (res) => {
        res.pipe(bl((err, data) => {
            if (err) throw err;

            results[index] = data.toString(); //coje el idex y el dato de las urls dentro de la var urls
            count--; //el contador para saber que ha finalizado el for each

            if (count == 0) { //una vez hemos recibido toda la respuestas del sever y estan  alamcenadas en la arr de results la mostramos una a una
                results.forEach((result) => {
                    console.log(result)
                });
            }
        }))
    })
})


/* urls.forEach((url, index) => {
    http.get(url, (res) => {
        res.pipe(bl((err, data) => {
            if (err) throw err;

            console.log(data.toString())
            
        }))
    })
})

 */
