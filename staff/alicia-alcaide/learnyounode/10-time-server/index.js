const net = require('net')
const strftime = require('strftime')

const [,, port] = process.argv

function now () {
    let d = new Date();

    /* const dateFormat = d.getFullYear().toString() +"-"+ 
                     ((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0" +( d.getMonth()+1).toString())+ "-" +
                     (d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString()) +" "+ 
                     (d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString()) +":"+ 
                     ((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+
                     (parseInt(d.getMinutes()/5)*5).toString()); */

    const dateFormat = strftime('%F %R', d)

    return dateFormat
}

var server = net.createServer(function (socket) {
    socket.end(now() + '\n')
})
   
server.listen(Number(port))