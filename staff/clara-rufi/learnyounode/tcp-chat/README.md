- client side

```sh
$ node client <ip>:<port> <from> <message>  //es el q el client envia. es capturen aquests arguments
```

example:

```sh
$ node client 192.168.0.109:8080 "Manuel Barzi" "hola tete!"
OK
```

```sh
$ node client 192.168.0.109:8080 "Nico Martin" "psssa tio!"
OK
```

- server side

```
Manuel Barzi: hola tete!
Nico Martin: pssa tio!
```