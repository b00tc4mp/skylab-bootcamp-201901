var net = require('net')
const port = process.argv[2]

function normalize (dat) {
    return dat < 10 ? `0${dat}` : dat
}

var server = net.createServer(function (socket) {  
    const date = new Date()

    const year = date.getFullYear(), 
    month = date.getMonth() + 1,     // empieza en 0  
    day = date.getDate(),    // devuelve día del mes, empieza en 1  
    hour = date.getHours(),
    min = date.getMinutes()

    data = `${year}-${normalize(month)}-${normalize(day)} ${normalize(hour)}:${normalize(min)}\n`

    socket.write(data)
    socket.end()
})  
server.listen(port)

// // Experimento: visto en el navegador colocando http://127.0.0.1:3030 donde 3030 es el puerto  pasado como parámetro a la ejecución de node. Es equivalente a localhost:3030
// // el new Date llamado date0 almacena la fecha y hora del momento en que se activa el servidor que estamos creando
// // mientras que el new Date llamado date muestra la fecha y hora del momento de realizar la recarga de la página, pues se hace un llamado a la función server.listen que llama a la función cada vez
// var net = require('net')
// const port = process.argv[2]

// const date0 = new Date()

// var server = net.createServer(function (socket) {  
//     const date = new Date()

//     const year = date.getFullYear(), 
//     month = date.getMonth() + 1,     // empieza en 0  
//     day = date.getDate(),    // devuelve día del mes, empieza en 1  
//     hour = date.getHours(),
//     min = date.getMinutes()

//     data = `${year}-${month}-${day} ${hour}:${min}\n`

//     socket.write(`Test of handle date ${date0} \n this port is ${port}\n` + 'Hello it\'s ')
//     socket.end(data)
// })  
// server.listen(port) 