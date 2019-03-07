const net = require ('net')

const {argv: [, , adress, from, message]} = process

const [host, port] = adress.split(':')

const conn = net.createConnection(port, host)

conn.write(`${from} : ${message}`)

conn.on('data', data => console.log(data.toString()))



/*
montem serividor q s'aixeca al port q li diem i quan rep conexio, s'executa callback i s'imprimeix missa a la consola
i diu OK.  
client q creei conexio

- client side

```sh
$ node client <ip>:<port> <from> <message>  //es el q el client envia. es capturen aquests arguments
```

quan el client rep conexio, el callback es crida i s'imprimeix a la consola  i envia missatge ok a la consola
el client esta escoltant, i quan el client respon, diem ok.

node server 8080 => per aixecar servidor (desde la carpeta de TPC-CHAT). 8080 es el port


obrim 2 consoles: 
1era, per ex la del server:

ipconfig    per saber la ip. ens copiem 192.168.0.39 (Dirección IPv4)
node server 8080 (li diem el port) [host, port]


consola 2a del client:

ipconfig 
node client 192.168.0.39:8080 clara 'hola'             (adress, from, message]})i ens torna OK. a la consola 1, veurem: clara:hola

*/