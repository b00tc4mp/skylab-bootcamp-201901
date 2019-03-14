/*For this lesson we need to write a program that preforms an HTTP GET request to a URL, and writes the 
response data to the console.  GET requests are one of the request methods allowed in Hypertext Transfer 
Protocol (HTTP).  GET request only retrieve data from the specified resource (determined by the URL the 
request is used on).  GET requests are considered safe operations that do not change the state of 
the server the request is sent to because it only retrieves information.*/

const http = require('http')

const { argv: [, , url] } = process

// http.get(url, res => res.on('data', chunk => console.log(chunk.toString())))

// http.get(url, res => {
//     res.setEncoding('utf-8')

//     res.on('data', chunk => console.log(chunk))
// })
let sum=0
http.get(url, res => res.setEncoding('utf-8').on('data', chunk => console.log(++sum,chunk)))

// sense setencodigin rebem:  <Buffer 3c 48 54 4d 4c 3e 3c 48 45 41 44 3e >
// amb set encoding rebem:  '<HTML><HEAD><meta http-equiv="content-type"
// i li hem posat un sum pq anem veient tots els chunk q ens arriben  i x testejar: