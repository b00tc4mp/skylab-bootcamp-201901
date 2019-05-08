const http = require('http')
const bl = require('bl')
let [, , ...urls] = process.argv
let answer = [] // irémos acumulando aqui las respuestas en orden (dado por urlsChecked)
let urlsChecked = 0

function print(datas) { // se imprimen en orden los resultados
    for (let i in datas) console.log(datas[i])
}

function httpUrl(url, index) { // recive la url y el indice seria lo mismo recivir el urlsChecked
    http.get(url, response => {
        response.pipe(bl((err, data) => { //pipe va dejando pasar todo lo que llega/ bl lo acumula en un buffer

            if (err) return console.error(err)

            answer[index] = data.toString() // metemos la respuesta stringizada en answer
            urlsChecked++ //aumentamos el urlsChecked
            
            if (urlsChecked === urls.length) print(answer) // si el urls checked coincide con la length de urls llamamos a print
            
        }))
    })
}

for (let i in urls) {
    httpUrl(urls[i], i)
}



