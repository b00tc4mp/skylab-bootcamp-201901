## server side

running server

```sh
$ node server <port>
```

example:

```sh
$ node server 8080
```

example of outputs when messages are receives from clients:

```
Manuel Barzi: hola tete!
Nico Martin: pssa tio!
```

testing the server from terminal:

```sh
$ echo -n 'hola mundo' | nc localhost 8080
```

## client side

```sh
$ node client <ip:port> <from> <message>
```

examples:

```sh
$ node client 192.168.0.109:8080 "Manuel Barzi" "hola tete!"
OK
```

```sh
$ node client 192.168.0.109:8080 "Nico Martin" "psssa tio!"
OK
```