const http = require('http')
const bl = require('bl')
let sum = ""

// Form 1 añadiendo bl para atrapar los fatos
// http.get(process.argv[2], response => {
//     response.pipe(bl((err, data) => { //pipe va dejando pasar todo lo que llega/ bl lo acumula en un buffer

//         if (err) return console.error(err)

//         data = data.toString() // transformamos el buffer en string

//         console.log(data.length) // imprimos la cantidad de caracteres que tiene la string
//         console.log(data) // la imprimimos
//       }))
// })


//forma 2 sin bl atrapando los datos en otra variable minetras hay un response.on activo y cuando llegue al segundo devuelva lo acumulado
http.get(process.argv[2], response => {
  response.setEncoding("utf8")

  response.on("data", data => sum += data )

  response.on("end", () => {
    console.log(sum.length) // imprimos la cantidad de caracteres que tiene la string
    console.log(sum) // la imprimimos
  })
})

